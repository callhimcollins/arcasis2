import { StyleSheet, View } from 'react-native'
import React from 'react'
import Home from '@/components/Home'
import NotificationPopup from '@/components/NotificationPopup'
import Checkout from '@/components/Checkout'
import Address from '@/components/Address'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <Home/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})