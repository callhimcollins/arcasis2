import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Checkout from '@/components/Checkout'
import NotificationPopup from '@/components/NotificationPopup'

const CheckoutScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <Checkout/>
    </View>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})