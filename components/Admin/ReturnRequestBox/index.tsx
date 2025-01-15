import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootState } from '@/state/store'
import { useDispatch, useSelector } from 'react-redux'
import getStyles from './styles'
import { ProductType, ReturnRequestType } from '@/types'
import { supabase } from '@/lib/supabase'
import { setNotification } from '@/state/features/notificationSlice'
import { sendPushNotification } from '@/utils/registerPushNotificationsAsync'

type ReturnRequestBoxProps = {
    returnRequest: ReturnRequestType,
    filterRequestsData: () => void;
    key: number
}

const ReturnRequestBox = ({ returnRequest, filterRequestsData, key }: ReturnRequestBoxProps) => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode);
    const [products, setProducts] = useState<ProductType[] | null>()
    const [approved, setApproved] = useState<boolean>()
    const dispatch = useDispatch()

    const getProductsFromReturnRequests = async () => {
        try {
            const { data, error } = await supabase
            .from('CartItems')
            .select('*, Products(*)')
            .eq('cartItemId', returnRequest.cartItemId)
    
            if(data) {
                setProducts(data.map(item => item.Products))
            } 
            if(error) {
                console.log(error)
                dispatch(setNotification({
                    message: `An error occurred geting products from return requests: ${error.message}`,
                    messageType: 'error',
                    notificationType: 'system', 
                    showNotification: true, 
                    stay: true 
                }))
            }  
        } catch (error) {
            console.log("An error in getProductsFromReturnRequests", error)
            dispatch(setNotification({
                message: `An error in getProductsFromReturnRequests: ${error}`,
                messageType: 'error',
                notificationType: 'system', 
                showNotification: true, 
                stay: false 
            }))
        }
    }

    const handleApproveReturn = async () => {

        try {
            const { error } = await supabase
            .from('Returns')
            .update({ status: 'approved' })
            .eq('returnId', returnRequest.returnId)
            .select()
            .single()

            if(!error) {
                console.log('Return Request Approved')
                await sendPushNotification(returnRequest.Users.userId, returnRequest.Users.pushToken, 'Return Request Approved!', `We'll Email You Updates`, {})
                setApproved(true)
            } else {
                console.log("An error occurred approving return", error)
                dispatch(setNotification({
                    message: `An error occurred approving return: ${error.message}`,
                    messageType: 'error',
                    notificationType: 'system', 
                    showNotification: true, 
                    stay: true 
                }))
            }
        } catch (error) {
            console.log("An error in handleApproveReturn", error)
            dispatch(setNotification({
                message: `An error in handleApproveReturn: ${error}`,
                messageType: 'error',
                notificationType: 'system', 
                showNotification: true, 
                stay: false 
            }))
        }
    }

    const checkIfApproved = async () => {
        if(returnRequest.status === 'approved') {
            setApproved(true)
        }
    }
 
    useEffect(() => {
        getProductsFromReturnRequests()
        checkIfApproved()
    }, [])

    
    return (
        <View key={key} style={styles.container}>
            <ScrollView>
                {
                    products?.map(product => (
                        <View style={styles.productContainer}>
                            <Image style={styles.productImage} source={{ uri: product.imageUrl }}/>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}>${product.price}</Text>
                        </View>
                    ))
                }
            </ScrollView>

            <Text style={styles.reasonForReturnText}>{returnRequest.reasonForReturn}</Text>
            <Text style={styles.userDetailText}>{returnRequest.Users.fullName}, {returnRequest.Users.email}</Text>
            <TouchableOpacity disabled={approved} onPress={handleApproveReturn} style={approved ? styles.approvedButton : styles.approveButton}>
                <Text style={styles.approveText}>{ approved ? 'Approved' : 'Approve'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ReturnRequestBox

