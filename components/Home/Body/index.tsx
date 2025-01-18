import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import getStyles from './styles';
import { RootState } from '@/state/store';
import ChatList from '@/components/ChatList';
import { supabase } from '@/lib/supabase';
import { CartItemType } from '@/types';
import { Image } from 'react-native';
import { setChatHistory, setChatsContainerId, setChatTopic } from '@/state/features/chatSlice';
import { addToProductsFound } from '@/state/features/recommendationSlice';
import { setOrderDetails } from '@/state/features/orderSlice';


type BodyProps = {
    retryRecommendations: () => void
}
const Body = ({ retryRecommendations }: BodyProps) => {
    const appearanceMode = useSelector((state: RootState) => state.appearance.currentMode);
    const styles = getStyles(appearanceMode);
    const chats = useSelector((state:RootState) => state.chat.chats)
    const user = useSelector((state:RootState) => state.user)
    const [processingOrders, setProcessingOrders] = useState<any[]>([])
    const dispatch = useDispatch()


    const getProcessingOrders = async () => {
        try {
            // Get all processing orders
            const { data: orderData, error: orderError } = await supabase
                .from('Orders')
                .select('*')
                .eq('userId', user.userId)
                .eq('status', 'to be fulfilled')
            if (orderError) throw orderError;
            if (!orderData?.length) return;
    
            // Get all cart items for these orders in parallel
            const cartItemsPromises = orderData.map(({ orderId, chatsContainerId, status }) => 
                supabase
                    .from('CartItems')
                    .select('*, Products(*)')
                    .eq('orderId', orderId)
                    .then(result => ({
                        ...result,
                        chatsContainerId,
                        status
                    }))
            );
    
            const cartItemsResults = await Promise.all(cartItemsPromises);

            // Combine all cart items, now including chatsContainerId
            const allCartItems: CartItemType[] = cartItemsResults.reduce((acc, { data, error, chatsContainerId, status }) => {
                if (error) throw error;
                return [...acc, ...(data?.map(item => ({
                    ...item,
                    chatsContainerId,
                    status
                })) || [])];
            }, [] as CartItemType[]);
    
            setProcessingOrders(allCartItems);
    
        } catch (error) {
            // Handle errors appropriately
            console.log("Error fetching processing orders:", error);
            // Consider adding error state or user notification
        }
    }



    const getChats = async (order: any) => {
        try {
            const { data:chatsData, error:chatsError } = await supabase
            .from('Chats')
            .select()
            .eq('chatsContainerId', order.chatsContainerId)
            .order('createdAt', { ascending: true })
            if(chatsData) {
                const { data:chatsContainersData, error:chatsContainersError } = await supabase
                .from('ChatsContainers')
                .select('chatTopic')
                .eq('chatsContainerId', order.chatsContainerId)
                .single()
                if(chatsContainersData) {
                    await dispatch(setChatTopic(chatsContainersData.chatTopic))
                    await dispatch(setChatsContainerId(order.chatsContainerId))
                    await dispatch(setChatHistory(chatsData))
                    const { data, error } = await supabase
                    .from('CartItems')
                    .select('*, Products(*)')
                    .eq('orderId', order.orderId)
                    if(data) {
                        data.forEach(item => {
                            dispatch(addToProductsFound(item.Products))
                            dispatch(setOrderDetails({ orderId: order.orderId, status: order.items[0].status, chatsContainerId: order.chatsContainerId, userId: user.userId,  }))
                        })
                    }

                    if(error) {
                        console.log("An error occurred in getCartItems", error);
                    }
                }

                if(chatsContainersError) {
                    console.log("An error occured trying to get chat topic", chatsContainersError.message)
                }
            }
            if(chatsError){
                console.log("An error occured trying to get chats", chatsError.message)
            }
        } catch (error) {
            console.log("An error occured in getChats", error);
        }
    }



    const groupedProcessingOrders = processingOrders.reduce((groups, order) => {
        if (!groups[order.orderId]) {
            groups[order.orderId] = {
                items: [],
                chatsContainerId: order.chatsContainerId
            };
        }
        groups[order.orderId].items.push(order);
        return groups;
    }, {} as { [key: string]: { items: typeof processingOrders, chatsContainerId: string } });
    
    const ordersList = Object.entries(groupedProcessingOrders).map(([orderId, data]) => ({
        orderId,
        items: data.items,
        chatsContainerId: data.chatsContainerId
    }));


    useEffect(() => {
        getProcessingOrders()
    }, [user.userId])


    const conditionalRenderForChats = () => {
        if(!chats) {
            return (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    { processingOrders.length === 0 && <View>
                        <Text style={styles.welcomeText}>Hey, Let's Gift Someone! Type Something...</Text>
                    </View>}

                    { processingOrders.length > 0 && 
                    <View style={styles.processingOrdersContainer}>
                        <Text style={styles.processingOrdersText}>Processing Gift Boxes</Text>
                        <ScrollView contentContainerStyle={{ padding: 10 }} showsHorizontalScrollIndicator={false} horizontal>
                            { ordersList.map((order:any, index) => (
                                <TouchableOpacity onPress={() => getChats(order)} key={index} style={styles.orderContainer}>
                                    { 
                                        order.items.slice(0, 2).map((item:any, index:number) => (
                                            <View key={index} style={styles.productContainer}>
                                                <Image style={styles.productImage} source={{uri: item.Products.imageUrl}}/>
                                                <Text style={styles.productName}>{item.Products.name}</Text>
                                            </View>
                                        ))
                                    }
                                        {order.items.length > 2 && (
                                            <Text style={styles.moreProducts}>{`+${order.items.length - 2} more`}</Text>
                                        )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    }
                </ScrollView>
            )
        } else {
            return <ChatList retryRecommendations={retryRecommendations} data={chats}/>
        }
    }
    
    return (
        <>
            { conditionalRenderForChats() }
        </>
    );
};

export default Body