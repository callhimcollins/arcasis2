import { StyleSheet, View } from 'react-native'
import React from 'react'
import NotificationPopup from '@/components/NotificationPopup'
import PersonalizedVideo from '@/components/PaymentComplete/PersonalizedVideo'

const PersonalizedVideoScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <PersonalizedVideo/>
    </View>
  )
}

export default PersonalizedVideoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})