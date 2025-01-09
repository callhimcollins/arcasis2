import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import getStyles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'

const EventCard = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode)
    return (
        <View>
        <Text>EventCard</Text>
        </View>
    )
}

export default EventCard
