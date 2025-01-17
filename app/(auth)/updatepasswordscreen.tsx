import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationPopup from '@/components/NotificationPopup'
import UpdatePassword from '@/components/Auth/UpdatePassword'

const ResetPasswordScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <UpdatePassword/>
    </View>
  )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})