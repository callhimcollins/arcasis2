import { StyleSheet, View } from 'react-native'
import React from 'react'
import Home from '@/components/Home'
import Search from '@/components/Search'
import NotificationPopup from '@/components/NotificationPopup'
import PaymentComplete from '@/components/PaymentComplete'
import PersonalizedVideo from '@/components/PaymentComplete/PersonalizedVideo'
import AddName from '@/components/Auth/AddName'
import AddPhoneNumber from '@/components/Auth/AddPhoneNumber'

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