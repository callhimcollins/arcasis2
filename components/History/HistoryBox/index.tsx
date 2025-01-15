import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { HistoryType } from '@/types'
import moment from 'moment'
import { clearChats, setChatHistory, setChatsContainerId, setChatTopic, setOrAddChat } from '@/state/features/chatSlice'
import { router } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { addToProductsFound, clearProductsFoundInRecommendations } from '@/state/features/recommendationSlice'
import { clearOrderDetails, setOrderDetails } from '@/state/features/orderSlice'
import { SimpleLineIcons } from '@expo/vector-icons'


type HistoryBoxProps = {
    historyBox: HistoryType,
    onDelete: (id: string) => void;
}
const HistoryBox = ({ historyBox, onDelete }: HistoryBoxProps) => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const dispatch = useDispatch()
    const styles = getStyles(appearanceMode);
    const productsFound = useSelector((state:RootState) => state.recommendations.productsFound)
    const order = useSelector((state:RootState) => state.order)

    const formatTime = () => {
        const now = moment();
        const givenDate = moment(historyBox.createdAt);
        const minutesDiff = now.diff(givenDate, 'minutes');
        const hoursDiff = now.diff(givenDate, 'hours');
        const daysDiff = now.diff(givenDate, 'days');
      
        if (hoursDiff < 24) {
          if (minutesDiff < 1) {
            return 'Just now';
          }
          if (minutesDiff < 60) {
            return `${minutesDiff} ${minutesDiff === 1 ? 'minute' : 'minutes'} ago`;
          }
          return `${hoursDiff} ${hoursDiff === 1 ? 'hour' : 'hours'} ago`;
        } else if (daysDiff === 1) {
          return 'Yesterday';
        } else if (daysDiff <= 7) {
          return `${daysDiff} days ago`;
        } else {
          return givenDate.format('Do MMMM YYYY');
        }
      };


    const getCartItems = async (orderId: string) => {
        await dispatch(clearProductsFoundInRecommendations())
        const { data, error } = await supabase
        .from('CartItems')
        .select('*, Products(*)')
        .eq('orderId', orderId)
        if(data) {
            data.forEach(item => {
                dispatch(addToProductsFound(item.Products))
            })
        }

        if(error) {
            console.log("An error occurred in getCartItems", error);
        }
    }

    const getOrder = async () => {
        const { data, error } = await supabase
        .from('Orders')
        .select()
        .eq('chatsContainerId', historyBox.chatsContainerId)
        .single()
        if(error) {
            console.log("Couldn't get order", error);
            if(productsFound &&productsFound?.length > 0) {
                dispatch(clearProductsFoundInRecommendations())
            }
            if(order.orderDetails) {
                dispatch(clearOrderDetails())
            }
        }

        if(data) {
            await getCartItems(data.orderId);
            dispatch(setOrderDetails(data));
        }
    }

    const getChats = async () => {
        const { data, error } = await supabase
        .from('Chats')
        .select()
        .eq('chatsContainerId', historyBox.chatsContainerId)
        .order('createdAt', { ascending: true })
        if(data) {
            await getOrder();
            await dispatch(setChatHistory(data))
        }

        if(error){
            console.log(error)
        }
    }

    const handleNavigateToChat = async () => {
        await dispatch(clearChats());
        await dispatch(setChatsContainerId(historyBox?.chatsContainerId))
        await getChats();
        await dispatch(setChatTopic(historyBox?.chatTopic))
        await router.replace('/')
    }

    const cleanChatTopic = () => {
        return historyBox?.chatTopic.replace(/["]/g, '').replace(/\**\**/g, '');
    }

    return (
        <TouchableOpacity onPress={handleNavigateToChat} style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.chatTopic}>{historyBox?.chatTopic ? cleanChatTopic() : '[Not Enough Conversation]'}</Text>
                <Text style={styles.timeText}>{ formatTime() }</Text>
            </View>

            <TouchableOpacity style={styles.right}>
                <SimpleLineIcons 
                    name='minus' 
                    size={24} 
                    color={'#EB001B'} 
                    onPress={() => onDelete(historyBox.chatsContainerId)}
                />    
          </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default HistoryBox

