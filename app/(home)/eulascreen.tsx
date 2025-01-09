import { StyleSheet, View } from 'react-native'
import React from 'react'
import NotificationPopup from '@/components/NotificationPopup'
import EULA from '@/components/EULA'

const EulaScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <EULA/>
    </View>
  )
}

export default EulaScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})