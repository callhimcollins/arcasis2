import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import RecommendationsFlatList from '../RecommendationsFlatList'
import { setNotification } from '@/state/features/notificationSlice'
import { clearCartProducts } from '@/state/features/orderSlice'

const Preview = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const order = useSelector((state:RootState) => state.order)
    const styles = getStyles(appearanceMode)
    const dispatch = useDispatch()

    const navigateToAddress = () => {
        if(order.cartProducts.length === 0) {
            dispatch(setNotification({ message: 'No Items In Gift Box', messageType: 'info', notificationType: 'system', showNotification: true, stay: false }))
            return;
        } else router.push('/(order)/addressscreen')
    }

    const handleGoBack = () => {
        dispatch(clearCartProducts())
        router.back()
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.headerText}>Preview</Text>
                <View style={styles.giftQuantityContainer}>
                    <Text style={styles.giftQuantityText}>{order.cartProducts.length} Items In Gift Box</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 80 : 200 }} style={styles.previewContainer}>
               { order.subtotal > 0 && <Text style={styles.giftWorthText}>This Gift Box Is Worth <Text style={styles.subTotalText}> ${order.subtotal}</Text></Text>}
                { order.cartProducts.length > 0 ? <RecommendationsFlatList data={order.cartProducts}/> : 
                    <View style={styles.noItemsContainer}>
                        <Text style={styles.noItemsText}>No Items In Gift Box</Text>
                    </View>
                    }

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToAddress} style={[styles.continueButton, order.cartProducts.length === 0 ? { opacity: 0.5 } : { opacity: 1 }]}>
                    <Text style={styles.continueButtonText}>Add Address</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Gradient */}
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.9)', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.gradient, styles.bottomGradient]}
                pointerEvents="none"
            />
        </View>
    )
}


export default Preview