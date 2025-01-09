import { StyleSheet, View } from 'react-native'
import React from 'react'
import NotificationPopup from '@/components/NotificationPopup'
import PaymentComplete from '@/components/PaymentComplete'

const PaymentCompleteScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <PaymentComplete/>
    </View>
  )
}

export default PaymentCompleteScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})