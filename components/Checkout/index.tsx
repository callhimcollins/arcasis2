import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import getStyles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { FontAwesome6 } from '@expo/vector-icons'
import { router } from 'expo-router'
import CheckoutProductCard from './CheckoutProductCard'

const Checkout = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const order = useSelector((state:RootState) => state.order)
    const styles = getStyles(appearanceMode)
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
                    <Text style={styles.priceItemText}>$23.24</Text>
                </View>

                <View style={styles.priceItemContainer}>
                    <Text style={styles.priceItemText}>Delivery Fee</Text>
                    <Text style={styles.priceItemText}>$3</Text>
                </View>

                <View style={styles.priceItemContainer}>
                    <Text style={styles.orderTotalText}>Order Total</Text>
                    <Text style={styles.orderTotalText}>$1219.06</Text>
                </View>
            </View>
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/(order)/paymentcompletescreen')} style={styles.continueButton}>
                        <Text style={styles.continueButtonText}>Pay</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.footerText}>Your payment is securely processed by Stripe.</Text>
            </View>
        </View>
    )
}

export default Checkout

