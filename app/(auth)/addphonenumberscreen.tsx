import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AuthLanding from '@/components/Auth/AuthLanding'
import PersonalizeArca from '@/components/Auth/PersonalizeArca'
import NotificationPopup from '@/components/NotificationPopup'
import AddName from '@/components/Auth/AddName'
import AddPhoneNumber from '@/components/Auth/AddPhoneNumber'

const AddPhoneNumberScreen = () => {
  return (
    <View style={styles.container}>
      	<View style={{ position: 'absolute', width: '100%' }}>
				  <NotificationPopup/>
			  </View>
        <AddPhoneNumber/>
    </View>
  )
}

export default AddPhoneNumberScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})