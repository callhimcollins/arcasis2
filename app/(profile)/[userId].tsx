import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Profile from '@/components/Profile'
import NotificationPopup from '@/components/NotificationPopup'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <Profile/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})