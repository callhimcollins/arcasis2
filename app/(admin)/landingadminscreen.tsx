import { StyleSheet, View } from 'react-native'
import React from 'react'
import NotificationPopup from '@/components/NotificationPopup'
import Admin from '@/components/Admin'

const CheckoutScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <Admin/>
    </View>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})