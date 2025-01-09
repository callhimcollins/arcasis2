import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import getStyles from './styles'

const Events = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode)
    return (
        <View style={styles.container}>
            <Text>Events</Text>
        </View>
    )
}

export default Events

