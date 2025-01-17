import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationPopup from '@/components/NotificationPopup'
import ResetPassword from '@/components/Auth/ResetPassword'

const ResetPasswordScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <ResetPassword/>
    </View>
  )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})