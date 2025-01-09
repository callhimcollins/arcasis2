import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Search from '@/components/Search'
import NotificationPopup from '@/components/NotificationPopup'

const SearchScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <Search/>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})