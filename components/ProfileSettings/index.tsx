import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import getStyles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { LinearGradient } from 'expo-linear-gradient'

const ProfileSettings = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode);
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Settings</Text>

            <TouchableOpacity>
                <Text>Sign Out</Text>
            </TouchableOpacity>
            {/* Top Gradient */}
            {/* <LinearGradient
                colors={['#FFFFFF', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.gradient, styles.topGradient]}
            /> */}

            {/* Bottom Gradient */}
            {/* <LinearGradient
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.9)', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.gradient, styles.bottomGradient]}
            /> */}
        </View>
    )
}

export default ProfileSettings
