import 'react-native-gesture-handler'; 
import React from 'react'
import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
  <Stack initialRouteName='index' screenOptions={{ headerShown: false }}>
    <Stack.Screen name='index'/>
    <Stack.Screen name='searchscreen'/>
    <Stack.Screen name='eulascreen' options={{ presentation: 'modal' }}/>
  </Stack>
  )
}

export default HomeLayout
