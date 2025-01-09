import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Preview from '@/components/Preview'
import NotificationPopup from '@/components/NotificationPopup'

const PreviewScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <Preview/>
    </View>
  )
}

export default PreviewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})