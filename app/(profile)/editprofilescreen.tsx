import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationPopup from '@/components/NotificationPopup'
import History from '@/components/History'
import EditProfile from '@/components/EditProfile'

const EditProfileScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
			<NotificationPopup/>
		</View>
        
        <EditProfile/>
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})