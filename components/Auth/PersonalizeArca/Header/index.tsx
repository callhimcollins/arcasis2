import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import getStyles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'

const Header = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode)
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.logoText}>Meet Arca, Your Personalized Gifting Assistant</Text>
            </View>

        </View>
    )
}

export default Header

