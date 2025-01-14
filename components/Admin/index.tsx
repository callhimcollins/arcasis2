import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { ScrollView } from 'react-native'
import { OrderType } from '@/types'
import { supabase } from '@/lib/supabase'
import { setNotification } from '@/state/features/notificationSlice'
import PendingOrderBox from './PendingOrderBox'

const Admin = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const [selectedFor, setSelectedFor] = useState('Pending Orders')
    const [pendingOrders, setPendingOrders] = useState<OrderType[] | null>()
    const styles = getStyles(appearanceMode)
    const dispatch = useDispatch()


    const fetchPendingOrders = async () => {
        try {
            const { data, error } = await supabase
            .from('Orders')
            .select('*, Users(userId, pushToken)')
            .eq('status', 'to be fulfilled')
            .order('createdAt', { ascending: false })
            if(data) {
                setPendingOrders(data)
            } 
    
            if(error) {
                console.log("An error occurred fetching pending orders", error)
                dispatch(setNotification({ 
                    message: `An error occurred in fetch pending orders, ${error.message}`, 
                    messageType: 'error', 
                    notificationType: 'system', 
                    showNotification: true, 
                    stay: false 
                }))
            }
        } catch (error) {
            console.log("An error occurred in fetch pending orders", error)
            dispatch(setNotification({ 
                message: `An error occurred in fetch pending orders, ${error}`, 
                messageType: 'error', 
                notificationType: 'system', 
                showNotification: true, 
                stay: false 
            }))
        }
    }

    const fetchReturnRequests = async () => {

    }

    const fileterOrderData = async (orderId: string) => {
        setPendingOrders(pendingOrders?.filter(pendingOrder => pendingOrder.orderId !== orderId))
    }

    const selectedForRender = () => {
        if(selectedFor === 'Pending Orders') {
            return (
                <View style={{ margin: 15 }}>
                    {pendingOrders?.map((order) => (
                        <PendingOrderBox filterOrderData={() => fileterOrderData(String(order.orderId))} key={order.orderId} order={order} />
                    ))}
                </View>
            )
        } else if(selectedFor === 'Return Requests') {
            return (
                <View>
                    <Text>This is a test text for return requests</Text>
                </View>
            )
        }
    }

    useEffect(() => {
        fetchPendingOrders()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Admin</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name='close' color={'black'} size={28}/>
                </TouchableOpacity>
            </View>

            <View style={styles.selectModeContainer}>
                <TouchableOpacity onPress={() => setSelectedFor('Pending Orders')} style={ selectedFor === 'Pending Orders' ? styles.selectedMode : styles.unSelectedMode }>
                    <Text style={ selectedFor === 'Pending Orders' ? styles.selectedModeText : styles.unSelectedModeText }>Pending Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedFor('Return Requests')} style={ selectedFor === 'Return Requests' ? styles.selectedMode : styles.unSelectedMode }>
                    <Text style={ selectedFor === 'Return Requests' ? styles.selectedModeText : styles.unSelectedModeText }>Return Requests</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingTop: 40, paddingBottom: 80 }}>
                { selectedForRender() }
            </ScrollView>
        </View>
    )
}

export default Admin;