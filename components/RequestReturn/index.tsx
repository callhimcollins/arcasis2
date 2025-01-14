import { Image, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { ProductType } from '@/types'
import { supabase } from '@/lib/supabase'
import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { router } from 'expo-router'
import { setNotification } from '@/state/features/notificationSlice'


type ProductFoundType = {
    cartItemId: string,
    Products: ProductType
}
const RequestReturn = () => {
    const appearanceMode = useSelector((state: RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode);
    const order = useSelector((state: RootState) => state.order)
    const [productsFound, setProductsFound] = useState<ProductFoundType[]>([])
    const [itemsToReturn, setItemsToReturn] = useState<string[]>([])
    const [reasonForReturn, setReasonForReturn] = useState<string>()
    const user = useSelector((state:RootState) => state.user)
    const dispatch = useDispatch()

    const getProducts = async () => {
        try {
            if(order.orderDetails?.status === 'fulfilled') {
                const { data, error } = await supabase
                .from('CartItems')
                .select('*, Products(*)')
                .eq('orderId', order.orderDetails?.orderId)
                
                if(data) {
                    setProductsFound(data)
                }
                
                if(error) {
                    console.log('Error:', error)
                }
            }
        } catch (error) {
            console.log('An error occurred in getProducts', error)
        }
    }

    const addToItemsToReturn = (cartItemId: string) => {
        if(itemsToReturn.includes(cartItemId)) {
            return setItemsToReturn((prev) => prev.filter((id) => id !== cartItemId))
        }
        setItemsToReturn((prev) => [...prev, cartItemId])
    }

    const sendReturnRequest = async () => {
        console.log("Return!")
        if(!reasonForReturn?.trim()) {
            dispatch(setNotification({
                message: itemsToReturn.length > 1 ? 'Enter Your Reasons For Return' : 'Enter Your Reason For Return',
                messageType: 'error',
                showNotification: true,
                notificationType: 'system',
                stay: false
            }))
            return;
        }
        if(itemsToReturn.length === 0) {
            dispatch(setNotification({
                message: 'Pick At Least One Item To Return',
                messageType: 'error',
                showNotification: true,
                notificationType: 'system',
                stay: false
            }))
            return;
        }
        try {
            for (const item of itemsToReturn) {
                const { error } = await supabase
                .from('Returns')
                .insert({
                    cartItemId: item,
                    userId: user.userId,
                    status: 'requested',
                    reasonForReturn,
                })

                if(error) {
                    console.log('An error occured adding', item, 'to return request', error)
                } else {
                    dispatch(setNotification({
                        message: 'Return Request Sent',
                        messageType: 'success',
                        showNotification: true,
                        notificationType: 'system',
                        stay: false
                    }))
                    router.back();
                }
            }
        } catch (error) {
            console.log('An error occurred in sendReturnRequest', error)
        }
    }

    useEffect(() => {
        getProducts();
    }, [])


    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Request Return</Text>
                </View>

                <View style={{ height: 250 }}>
                    { productsFound.length > 0 ? <ScrollView 
                        horizontal 
                        contentContainerStyle={{
                            gap: 20,
                            padding: 20,
                        }}
                        showsHorizontalScrollIndicator={false}
                    >
                        {productsFound.map((product, index) => (
                            <View style={styles.productContainer} key={index}>
                                <Image 
                                    style={styles.productImage} 
                                    source={{ uri: product.Products.imageUrl }}
                                />
                                <Text 
                                    numberOfLines={3} 
                                    style={styles.productName}
                                >
                                    {product.Products.name}
                                </Text>
                                <TouchableOpacity onPress={() => addToItemsToReturn(product.cartItemId)} style={ itemsToReturn.includes(product.cartItemId) ? styles.itemInReturnButton : styles.returnButton}>
                                    <Text style={ itemsToReturn.includes(product.cartItemId) ? styles.itemInReturnText : styles.returnText}>{ itemsToReturn.includes(product.cartItemId) ? 'Remove' : 'Return' }</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView> : <Text style={styles.emptyText}>No Items Eligible For Return</Text> }
                </View>

                <View style={styles.reasonContainer}>
                    <Text style={styles.reasonHeader}>
                        Why Are You Returning Items Picked?
                    </Text>
                    <TextInput 
                        onChangeText={(text) => setReasonForReturn(text)}
                        value={reasonForReturn}
                        multiline 
                        style={styles.reasonInput} 
                        placeholder='Enter Reason' 
                        placeholderTextColor={'#7A7A7A'}
                    />
                </View>

                <View style={[styles.footer, { marginTop: 20 }]}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={sendReturnRequest} style={styles.continueButton}>
                        <Text style={styles.continueButtonText}>Request Return</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default RequestReturn