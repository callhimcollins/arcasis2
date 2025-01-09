import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PersonalizeArca from '@/components/Auth/PersonalizeArca'
import NotificationPopup from '@/components/NotificationPopup'

const PersonalizeArcaScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <PersonalizeArca/>
    </View>
  )
}

export default PersonalizeArcaScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})