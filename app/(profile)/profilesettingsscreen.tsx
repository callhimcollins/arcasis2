import { StyleSheet, View } from 'react-native'
import React from 'react'
import ProfileSettings from '@/components/ProfileSettings'
import NotificationPopup from '@/components/NotificationPopup'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
			<NotificationPopup/>
		</View>
        <ProfileSettings/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})