import React, { useEffect, useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    FlatList,
    Keyboard,
    View,
    ListRenderItem,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import getStyles from './styles';
import { RootState } from '@/state/store';
import { ChatBoxType } from '@/types';
import ChatBox from '../ChatBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RecommendationsFlatList from '../RecommendationsFlatList';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import TypingAnimation from '../TypingAnimation';
import { Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { addCartProductToState, setOrAddToCart, updateOrderStatus } from '@/state/features/orderSlice';
import { supabase } from '@/lib/supabase';
import { setNotification } from '@/state/features/notificationSlice';
import { addToProductsFound } from '@/state/features/recommendationSlice';

type ChatListProps = {
    data: ChatBoxType[];
    retryRecommendations?: () => void;
};


const DEVICE_WIDTH = Dimensions.get('window').width
const ChatList = ({ data, retryRecommendations }: ChatListProps) => {
    const appearanceMode = useSelector((state: RootState) => state.appearance.currentMode);
    const botReplying = useSelector((state: RootState) => state.chat.botReplying);
    const flatListRef = useRef<FlatList<ChatBoxType>>(null);
    const productsFound = useSelector((state:RootState) => state.recommendations.productsFound)
    const chats = useSelector((state:RootState) => state.chat.chats)
    const order = useSelector((state:RootState) => state.order)
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const dispatch = useDispatch()
    const styles = getStyles(appearanceMode);
   
    const navigateToSearch = () => {
        router.push('/(home)/searchscreen')
    }

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
            scrollToEnd();
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const addCartItem = async (productId: string) => {
        try {
            if (!order.orderDetails?.orderId) return;
    
            const { error } = await supabase
                .from('CartItems')
                .insert({ 
                    productId, 
                    orderId: order.orderDetails.orderId, 
                    quantity: 1 
                })
                .single();
                
            if (error) {
                console.error('Error in handleAddCartItem:', error);
            }
        } catch (error) {
            console.error('Error in handleAddCartItem:', error);
        }
    }
    
    const updateOrder = async () => {
        if (!productsFound?.length) return;
    
        try {
            // Execute all cart item additions concurrently
            await Promise.all(productsFound.map(async (product) => {
                await addCartItem(product.productId);
                dispatch(setOrAddToCart({ 
                    productId: product.productId, 
                    orderId: String(order.orderDetails?.orderId), 
                    quantity: 1 
                }));
                dispatch(addCartProductToState(product));
            }));
    
            const { error } = await supabase
                .from('Orders')
                .update({ status: 'pending' })
                .eq('orderId', order.orderDetails?.orderId);
    
            if (!error) {
                await dispatch(updateOrderStatus('pending'));
                await router.push('/(order)/previewscreen');
            } else {
                console.error('Error in initiateOrder:', error.message);
                dispatch(setNotification({ 
                    message: `Couldn't Begin Order`, 
                    messageType: 'error', 
                    notificationType: 'system', 
                    showNotification: true, 
                    stay: false 
                }));
            }
        } catch (error) {
            console.error('Error in updateOrder:', error);
            dispatch(setNotification({ 
                message: `Couldn't Begin Order`, 
                messageType: 'error', 
                notificationType: 'system', 
                showNotification: true, 
                stay: false 
            }));
        }
    }

    const goToRequestReturnPage = () => {
        router.push('/(order)/requestreturnscreen')
    }


    const scrollToEnd = () => {
        if (flatListRef.current && data.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    };



    useEffect(() => {
        if (botReplying) {
            scrollToEnd();
        }
    }, [botReplying]);


    useEffect(() => {
        scrollToEnd();
    }, [data]);

    



    const renderItem: ListRenderItem<ChatBoxType> = ({ item }) => (
        <ChatBox {...item} />
    );

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 200 }
            >
                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${item.userId}-${index.toString()}`}
                    contentContainerStyle={[
                        styles.scrollContent,
                        { flexGrow: 1, justifyContent: 'flex-end' }
                    ]}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() => {
                        if (botReplying || data.length > 0) {
                            scrollToEnd();
                        }
                    }}
                    onLayout={() => {
                        if (botReplying || data.length > 0) {
                            scrollToEnd();
                        }
                    }}
                    maintainVisibleContentPosition={{
                        minIndexForVisible: 0,
                        autoscrollToTopThreshold: 20,
                    }}
                    ListHeaderComponent={() =>  chats && chats.length > 0 && <Text style={{ textAlign: 'center', color: '#7A7A7A', fontFamily: 'sorabold', fontSize: Platform.OS === 'ios' ? 14 : 13 }}>Start Of Conversation</Text>}
                    ListFooterComponent={() => (
                        <>
                        { !productsFound && botReplying && <View style={{ paddingVertical: 50 }}>
                            <TypingAnimation isVisible={botReplying}/>
                        </View>}
                        { productsFound && productsFound.length > 0 && <View style={[styles.recommendationsContainer, (order.orderDetails?.status === 'fulfilled' || order.orderDetails?.status === 'to be fulfilled') && { backgroundColor: '#39A13D' }]}>
                            { order.orderDetails?.status === 'created' && <View style={styles.recommendationsHeader}>
                                {<TouchableOpacity onPress={updateOrder} style={styles.retryButton}>
                                    <Ionicons name="gift" size={24} color="white"/>
                                    <Text style={styles.retryButtonText}>Begin Order</Text>
                                </TouchableOpacity>}
                                <TouchableOpacity onPress={retryRecommendations} style={styles.retryButton}>
                                    <MaterialCommunityIcons name="reload" size={24} color="white"/>
                                    <Text style={styles.retryButtonText}>Retry Curation</Text>
                                </TouchableOpacity>
                            </View> }
                            {
                                order.orderDetails?.status === 'fulfilled' &&                                 
                                <TouchableOpacity onPress={goToRequestReturnPage} style={[styles.retryButton, { marginRight: 15, marginBottom: 10 }]}>
                                <MaterialCommunityIcons name="reload" size={24} color="white"/>
                                <Text style={styles.retryButtonText}>Request A Return</Text>
                            </TouchableOpacity>
                            }
                            { Platform.OS === 'android' && <Text style={styles.androidSwipeText}> Swipe To See Items </Text>}
                            <RecommendationsFlatList data={productsFound}/>
                            { order.orderDetails?.status === 'created' && <TouchableOpacity onPress={navigateToSearch} style={styles.searchButton}>
                                <Octicons name='search' size={24} color={appearanceMode.primaryColor}/>
                                <Text style={styles.searchButtonText}>Search For A Specific Product</Text>
                            </TouchableOpacity>}
                        </View>}
                        </>
                    )}
                />
            </KeyboardAvoidingView>
        </View>
    );
};

export default ChatList;