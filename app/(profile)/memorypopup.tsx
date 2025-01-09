import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NotificationPopup from '@/components/NotificationPopup'
import History from '@/components/History'
import { router, useLocalSearchParams } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { AppearanceStateType } from '@/types'
import { AntDesign } from '@expo/vector-icons'

const MemoryPopUp = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode)
    const { memory } = useLocalSearchParams();


    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', width: '100%' }}>
                <NotificationPopup/>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.memory}>{memory}</Text>
        </View>
    )
}

export default MemoryPopUp

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: appearanceMode.backgroundColor,
            padding: 10
        },
        closeButton: {
            alignSelf: 'flex-end',
            marginTop: 20,
            marginBottom: 20,
            marginRight: 10
        },
        memory: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 16,
            lineHeight: 26,
        }
    })
}