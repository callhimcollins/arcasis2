import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Address from '@/components/Address'
import NotificationPopup from '@/components/NotificationPopup'

const AddressScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <Address/>
    </View>
  )
}

export default AddressScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})