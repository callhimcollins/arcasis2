import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import getStyles from './styles'
import { OrderType, ProductType } from '@/types'
import { supabase } from '@/lib/supabase'
import { setNotification } from '@/state/features/notificationSlice'
import { sendPushNotification } from '@/utils/registerPushNotificationsAsync'

type PendingOrderBoxProps = {
    order: OrderType,
    filterOrderData: (orderId: string) => void;
}

const PendingOrderBox = ({ order, filterOrderData }: PendingOrderBoxProps) => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode)
    const dispatch = useDispatch()
    const [cartItems, setCartItems] = useState<ProductType[] | null>()

    const fulfillOrder = async () => {
        try {
            const { data, error } = await supabase
            .from('Orders')
            .update({ status: 'fulfilled' })
            .eq('orderId', order.orderId)
            .select('orderId')
            .single()
            if(data) {
                await filterOrderData(String(data.orderId))
                sendPushNotification(order.Users.userId, order.Users.pushToken, 'Order Processed! Delivery In 2 Days.', 'View Details In Chat History', {})
            }
    
            if(error) {
                console.log('An error occurred in fulfillOrder', error)
                dispatch(setNotification({
                    message: `An error occurred in fulfillOrder, ${error}`, 
                    messageType: 'error', 
                    notificationType: 'system', 
                    showNotification: true, 
                    stay: false 
                }))
            }
        } catch (error) {
            console.log('An error occurred in fulfillOrder', error)
        }
    }

    const fetchOrderItems = async () => {
        try {
            const { data, error } = await supabase
            .from('CartItems')
            .select('*, Products(*)')
            .eq('orderId', order.orderId)
    
            if(data) {
                setCartItems(data.map(item => item.Products))
            }
    
            if(error) {
                console.log("An error occurred fetching order items", error.message)
                dispatch(setNotification({
                    message: `An error occurred in fetching order items, ${error}`, 
                    messageType: 'error', 
                    notificationType: 'system', 
                    showNotification: true, 
                    stay: false 
                }))
            }
        } catch (error) {
            console.log("An error occurred in fetchOrderItems", error)
            dispatch(setNotification({
                message: `An error occurred in fetchOrderItems, ${error}`, 
                messageType: 'error', 
                notificationType: 'system', 
                showNotification: true, 
                stay: false 
            }))
        }
    }
    
    useEffect(() => {
        fetchOrderItems()
    }, [])
    
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                { cartItems?.map((item, index) => (
                    <View key={index} style={styles.productContainer}>
                        <Image style={styles.productImage} source={{uri: item.imageUrl}}/>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>${item.price}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.addressContainer}>
                <Text style={[styles.addressText, { fontSize: 20 }]}>{ order.shippingAddress?.name }</Text>
                <Text style={styles.addressText}>{ order.shippingAddress?.streetAddress }</Text>
                <Text style={styles.addressText}>{ order.shippingAddress?.extraInfo }</Text>
                <Text style={styles.addressText}>{ order.shippingAddress?.city }, { order.shippingAddress?.state }, { order.shippingAddress?.zipCode }</Text>
                <Text style={styles.addressText}>Total Paid For This Order: { order.orderTotal }</Text>
            </View>

            <TouchableOpacity onPress={fulfillOrder} style={styles.fulfillButton}>
                <Text style={styles.fulfillButtonText}>Fulfill</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PendingOrderBox
