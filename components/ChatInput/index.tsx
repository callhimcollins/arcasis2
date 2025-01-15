import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Keyboard } from 'react-native'
import React, { useEffect, useRef } from 'react'
import getStyles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { usePathname } from 'expo-router'
import IdeaBox from '../Home/IdeaBox'


const IDEAS = [
    "I want to gift my best friend",
    "My mom's birthday is tomorrow",
    "I deserve a gift right now😌",
    "I want to surprise my bf with a gift",
    "My colleague is getting married",
]

type ChatInputProps = {
    input: string,
    setInput: (value: string) => void;
    onSend: () => void;
    primaryButton?: () => void;
}

const DEVICE_HEIGHT = Dimensions.get('window').height
const ChatInput = ({ input, setInput, onSend, primaryButton }: ChatInputProps) => {
    const chats = useSelector((state:RootState) => state.chat.chats)
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode)
    const order = useSelector((state:RootState) => state.order)
    const actionButtonContainerPosition = useSharedValue(DEVICE_HEIGHT)
    const pathName = usePathname();
    const inputRef = useRef<TextInput>(null);


    const animatedButtonContainer = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: actionButtonContainerPosition.value }]
        }
    })

    const handlePickIdea = (idea:string) => {
        setInput(idea)
        inputRef.current?.focus();
    }


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            { pathName === '/' && !chats && <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ideasContainer}>
                {IDEAS.map((idea, index) => 
                <TouchableOpacity onPress={() => handlePickIdea(idea)} key={index}>
                    <IdeaBox idea={idea}/>
                </TouchableOpacity>
                )}
            </ScrollView>}
            <View style={styles.inputContainer}>
                <TextInput ref={inputRef} multiline value={input} onChangeText={setInput} style={styles.input} placeholder="Message Arca" placeholderTextColor={appearanceMode.secondaryTextColor}/>
                <TouchableOpacity onPress={onSend} style={styles.sendButton}>
                    <FontAwesome6 name='arrow-up' size={20} color='white'/>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ChatInput
