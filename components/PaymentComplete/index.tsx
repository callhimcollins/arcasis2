import { Image, Platform, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Keyboard } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as SMS from 'expo-sms'
import { supabase } from '@/lib/supabase'
import { clearChats, clearChatsContainerId, setChatsContainerId, setChatTopic, setShouldCreateChatsContainer } from '@/state/features/chatSlice'
import { clearOrderDetails } from '@/state/features/orderSlice'
import { clearProductsFoundInRecommendations } from '@/state/features/recommendationSlice'


const PaymentComplete = () => {
    const appearanceMode = useSelector((state: RootState) => state.appearance.currentMode)
    const order = useSelector((state: RootState) => state.order)
    const user = useSelector((state:RootState) => state.user)
    const styles = getStyles(appearanceMode)
    const [showPersonalMessageInput, setShowPersonalMessageInput] = useState<boolean>(false)
    const showInputHeight = useSharedValue(0)
    const showInputOpacity = useSharedValue(0)
    const textInputRef = useRef<TextInput>(null) // Ref for TextInput
    const [smsIsAvailable, setSmsIsAvailable] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getOrCreateChatsContainerId = async () => {
        try {
            const { data, error } = await supabase
            .from('ChatsContainers')
            .insert({ userId: user.userId })
            .select()
            .single()
            if(data) {
                dispatch(setChatsContainerId(data.chatsContainerId))
                console.log("Chats Container Id Set")
            }
            if(error) {
                console.log('An error occurred setting chats container id', error.message)
            }
        } catch (error) {
            console.log('An error occurred in getOrCreateChatsContainer', error)
        }
    }

const startNew = async () => {
    dispatch(clearChats());
    dispatch(setChatTopic(''))
    dispatch(clearChatsContainerId())
    dispatch(clearOrderDetails())
    dispatch(setShouldCreateChatsContainer(true))
    dispatch(clearProductsFoundInRecommendations())
    await getOrCreateChatsContainerId()
    await router.replace('/')
}

    const animatedInputContainer = useAnimatedStyle(() => {
        return {
            height: showInputHeight.value,
            opacity: showInputOpacity.value,
        }
    })

    const handleCloseInput = () => {
        setShowPersonalMessageInput(false)
        Keyboard.dismiss()
    }

    const handleOpenInput = () => {
        setShowPersonalMessageInput(true)
        setTimeout(() => {
            textInputRef.current?.focus() // Focus the TextInput after rendering
        }, 500) // Delay to ensure animation completes
    }

    useEffect(() => {
        if (showPersonalMessageInput) {
            showInputHeight.value = withTiming(200, { duration: 500 })
            showInputOpacity.value = withTiming(1, { duration: 500 })
        } else {
            showInputHeight.value = withTiming(0, { duration: 500 })
            showInputOpacity.value = withTiming(0, { duration: 500 })
        }
    }, [showPersonalMessageInput])

    const sendSMSToRecipient = async () => {
        const { result } = await SMS.sendSMSAsync(
            ['985-215-2633'],
            'Hey! Arcasis!',
        )
        console.log(result)
    }

    useEffect(() => {
        (async() => {
            const smsIsAvailable = await SMS.isAvailableAsync();
            setSmsIsAvailable(smsIsAvailable)
        })()
    }, [])

    return (
        <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 0 : 200, flexGrow: 1 }} style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="checkmark-circle-outline" size={30} color="#39A13D" />
                <Text style={styles.headerText}>Payment Successful</Text>
            </View>
            <Text style={styles.arcasisInfo}>
                Thank you! Arcasis Will Continue Improving For You And Your Loved Ones
            </Text>

            {/* {!showPersonalMessageInput && (
                <Animated.View style={styles.addPersonalizedMessageContainer}>
                    <Text style={styles.personalizedMessageHeaderText}>
                        Add A Personal Message for {order.shippingAddress?.name}
                    </Text>

                    <Animated.View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleOpenInput} style={styles.messageButton}>
                            <Ionicons name="chatbubble-ellipses-outline" size={30} color="white" />
                            <Text style={styles.buttonText}>Send A Personal Text</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/(order)/personalizedvideoscreen')} style={styles.videoButton}>
                            <FontAwesome name="video-camera" size={30} color="white" />
                            <Text style={styles.buttonText}>Send Video</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            )} */}

            {/* <Animated.View style={[styles.addPersonalizedMessageContainer, animatedInputContainer]}>
                <View style={styles.sendTextOptionHeader}>
                    <Text style={styles.sendTextOptionHeaderText}>
                        To {order.shippingAddress?.name}
                    </Text>

                    <TouchableOpacity style={{ width: 30 }} onPress={handleCloseInput}>
                        <AntDesign name="close" size={30} color={appearanceMode.textColor} />
                    </TouchableOpacity>
                </View>

                <TextInput
                    ref={textInputRef} // Attach the ref to TextInput
                    multiline
                    style={styles.textInput}
                    placeholder="Enter Personal Message"
                    placeholderTextColor="#7A7A7A"
                />
                <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </Animated.View> */}

            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={startNew}
                    style={[styles.continueButton]}
                >
                    <Text style={styles.continueButtonText}>Go Home</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default PaymentComplete
