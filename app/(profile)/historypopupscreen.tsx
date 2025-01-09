import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationPopup from '@/components/NotificationPopup'
import History from '@/components/History'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
			<NotificationPopup/>
		</View>
        <History/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})