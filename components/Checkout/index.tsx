import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { router } from 'expo-router'
import CheckoutProductCard from './CheckoutProductCard'
import { useStripe } from '@stripe/stripe-react-native'
import * as Linking from 'expo-linking'
import { supabase } from '@/lib/supabase'
import { setStripeCustomerID } from '@/state/features/userSlice'
import { setNotification } from '@/state/features/notificationSlice'
import { sendPushNotification } from '@/utils/registerPushNotificationsAsync'
import { setOrderTotal } from '@/state/features/orderSlice'


const Checkout = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const [loading, setLoading] = useState<boolean>(false);
    const order = useSelector((state:RootState) => state.order)
    const user = useSelector((state:RootState) => state.user)
    const address = useSelector((state:RootState) => state.order.shippingAddress)
    const [paymentSheetReady, setPaymentSheetReady] = useState<boolean>(false);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const styles = getStyles(appearanceMode)
    const dispatch = useDispatch()

    async function fetchPaymentSheetParams(amount: number): Promise<{
        paymentIntent: string,
        ephemeralKey: string,
        customer: string
    }> {
        return fetch(`/api/payment-sheet`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount, user, address }),
        }).then((response) => response.json())
    }


    const initializePaymentSheet = async () => {
        try {
            setLoading(true);
            await dispatch(setOrderTotal(0))
            const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams(order.orderTotal)

            if(!user.stripe_customer_id) {
                const { error } = await supabase
                .from('Users')
                .update({ stripe_customer_id: customer })
                .eq('userId', String(user.userId))
                .single()

                if(!error) {
                    console.log("User stripe_customer_id added!")
                    dispatch(setStripeCustomerID(customer))
                } else {
                    console.log("An error occured adding stripe customer id", error.message)
                }
            }

            const { error } = await initPaymentSheet({
                merchantDisplayName: "Arcasis, Inc.",
                customerId: user.stripe_customer_id ? user.stripe_customer_id : customer,
                paymentIntentClientSecret: paymentIntent,
                customerEphemeralKeySecret: ephemeralKey,
                allowsDelayedPaymentMethods: true,
                defaultBillingDetails: {
                    name: String(user.fullName),
                    email: String(user.email),
                    phone: String(user.phoneNumber),
                },
                returnURL: Linking.createURL("stripe-redirect"),
                applePay: {
                    merchantCountryCode: "US",
                },
                style: 'automatic',
                removeSavedPaymentMethodMessage: "Remove this card?",
            });

            if (error) {
                Alert.alert('Error', 'Unable to initialize payment sheet');
                console.error('Payment sheet initialization error:', error);
            } else {
                setPaymentSheetReady(true);
            }
        } catch (error) {
            console.error('Payment sheet initialization error:', error);
            Alert.alert('Error', 'Unable to initialize payment sheet');
        } finally {
            setLoading(false);
        }
    }

    const sendPushNotificationToArcasis = async () => {
        try {
            const { data, error } = await supabase
            .from('Users')
            .select('userId, pushToken')
            .eq('email', 'arcasisco@gmail.com')
            .single()
            if(data) {
                console.log(data)
                await sendPushNotification(data.userId, data.pushToken, 'Someone Placed An Order!', `${user.fullName} placed an order, which costs ${order.orderTotal}!`, { order })
            } 
            if(error) {
                console.log("An error occurred getting user", error.message)
            }
        } catch (error) {
            console.log("An error occurred in sendPushNotificationToArcasis", error)
        }
    }

    const updateOrder = async () => {
        try {
            const { error } = await supabase
            .from('Orders')
            .update({ status: 'to be fulfilled', orderTotal: order.orderTotal, shippingAddress: order.shippingAddress, shippingAddressId: order.shippingAddress?.shippingAddressId })
            .eq('orderId', order.orderDetails?.orderId)
            .single()

            if(!error){
                console.log('Order Status Updated')
                await sendPushNotificationToArcasis()
            } else {
                console.log(error.message)
            }
        } catch (error) {
            console.log("an error occured in updateOrder", error)
        } 
    }

    const openPaymentSheet = async () => {
        if (!paymentSheetReady) {
            dispatch(setNotification({ message: 'Please wait. Payment is being initialized...', messageType: 'info', notificationType: 'system', showNotification: true, stay: false }));
            return;
        }

        try {
            const { error } = await presentPaymentSheet();

            if(error) {
                Alert.alert(`Error code: ${error.code}`, error.message);
            } else {
                await updateOrder()
                await router.replace('/(order)/paymentcompletescreen')
            }
        } catch (error) {
            console.error('Payment presentation error:', error);
            Alert.alert('Error', 'Unable to process payment');
        }
    }

    useEffect(() => {
        initializePaymentSheet();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Checkout</Text>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.addressContainer}>
                { !order.shippingAddress && <Text style={styles.addressText}>No Address Present</Text>}
                { order.shippingAddress && 
                    <View>
                        <View style={styles.header}>
                            <Text style={styles.nameText}>{order.shippingAddress.name}</Text>
                            <Text style={styles.nameText}>{order.shippingAddress.phoneNumber}</Text>
                        </View>

                        <View style={styles.addressInfo}>
                            <Text style={styles.leftAddressInfoText}>{ order.shippingAddress.streetAddress } {'\n'}{ order.shippingAddress.extraInfo }</Text>
                            <Text style={styles.rightAddressInfoText}>{ order.shippingAddress.city } {'\n'}{ order.shippingAddress.state } { order.shippingAddress.zipCode }</Text>
                        </View>
                    </View>
                    }
            </View>
            <View style={styles.priceContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productsContainer}>
                    { order.cartProducts.map((product) => {
                        return (
                            <CheckoutProductCard key={product.productId} {...product}/>
                        )
                    }) }
                </ScrollView>
                <View style={styles.priceItemContainer}>
                    <Text style={styles.priceItemText}>Gift Box Worth</Text>
                    <Text style={styles.priceItemText}>${order.subtotal}</Text>
                </View>

                <View style={styles.priceItemContainer}>
                    <Text style={styles.priceItemText}>Tax</Text>
                    <Text style={styles.priceItemText}>${ (order.subtotal * 0.08).toFixed(2) }</Text>
                </View>

                <View style={styles.priceItemContainer}>
                    <Text style={styles.priceItemText}>Delivery Fee</Text>
                    <Text style={styles.priceItemText}>$4</Text>
                </View>

                <View style={styles.priceItemContainer}>
                    <Text style={styles.orderTotalText}>Order Total</Text>
                    <Text style={styles.orderTotalText}>${ order.orderTotal }</Text>
                </View>
            </View>
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={openPaymentSheet} style={styles.continueButton}>
                        <Text style={styles.continueButtonText}>Pay</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.footerText}>Your payment is securely processed by Stripe.</Text>
            </View>
        </View>
    )
}

export default Checkout

