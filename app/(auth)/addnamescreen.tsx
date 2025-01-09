import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AuthLanding from '@/components/Auth/AuthLanding'
import PersonalizeArca from '@/components/Auth/PersonalizeArca'
import NotificationPopup from '@/components/NotificationPopup'
import AddName from '@/components/Auth/AddName'

const AddNameScreen = () => {
  return (
    <View style={styles.container}>
      	<View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <AddName/>
    </View>
  )
}

export default AddNameScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})