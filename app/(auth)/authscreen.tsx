import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AuthLanding from '@/components/Auth/AuthLanding'
import PersonalizeArca from '@/components/Auth/PersonalizeArca'
import NotificationPopup from '@/components/NotificationPopup'

const AuthScreen = () => {
  return (
    <View style={styles.container}>
      	<View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <AuthLanding/>
    </View>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})