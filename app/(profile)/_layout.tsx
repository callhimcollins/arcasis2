import 'react-native-gesture-handler'; 
import React from 'react'
import { Stack } from 'expo-router'

const ProfileLayout = () => {
  return <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="profilesettingsscreen" options={{ presentation: 'modal' }} />
          <Stack.Screen name="historypopupscreen" options={{ presentation: 'modal' }} />
          <Stack.Screen name='memorypopup' options={{ presentation: 'modal' }}/>
          <Stack.Screen name='logoutscreen' options={{ presentation: 'modal' }}/>
          <Stack.Screen name='editprofilescreen'/>
          <Stack.Screen name="user"/>
        </Stack>
}

export default ProfileLayout
