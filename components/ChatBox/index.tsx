import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import getStyles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { ChatBoxType } from '@/types'

const ChatBox = ({ userId, chatId, chatsContainerId, role, content }: ChatBoxType) => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode)

    const roleRender = () => {
        if(role === 'user') {
            return (
                <View style={styles.userContainer}>
                    <Text style={styles.userText}>{content}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.assistantContainer}>
                    <Text style={styles.assistantText}>{content}</Text>
                </View>
            )
        }
    }
    return (
        <>
            {roleRender()}
        </>
    )
}

export default ChatBox

