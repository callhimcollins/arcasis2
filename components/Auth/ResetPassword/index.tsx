import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { setNotification } from '@/state/features/notificationSlice'
import { makeRedirectUri } from "expo-auth-session";


const redirectTo = makeRedirectUri({
    path: 'updatepasswordscreen'
});

const ResetPassword = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode)
    const [emailAddresses, setEmailAddresses] = useState<string[]>([])
    const [email, setEmail] = useState<string>('')
    const [emailExists, setEmailExists] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    console.log(redirectTo)
    const getAllUserEmails = async () => {
        try {
            const { data, error } = await supabase
            .from('Users')
            .select('email')
            
            if(data) {
                setEmailAddresses(data.map(item => String(item.email)))
            }
            
            if(error) {
                console.log('An error occurred getting all users emails', error)
            }
        } catch (error) {
            console.log('An error occured in getAllUserEmails', error)
        }
    }

    const handleCheckEmail = (email: string) => {
        if(!emailAddresses.includes(email)) {
            setEmailExists(false)
            console.log("Email doesn't exist")
        } else {
            setEmailExists(true)
            console.log("Email exists!")
        }
    }

    const handleResetPassword = async () => {
        if (!email || !emailExists) return

        setIsLoading(true)
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo
              })

            if (error) {
                console.log('Error sending reset password email:', error)
                dispatch(setNotification({
                    message: 'Error Sending Reset Password Email',
                    messageType: 'error',
                    notificationType: 'system',
                    showNotification: true,
                    stay: true
                }))
                return
            }

            dispatch(setNotification({
                message: 'Password Reset Email Sent! Please Check Your Inbox',
                messageType: 'success',
                notificationType: 'system',
                showNotification: true,
                stay: true
            }))
            router.back()

        } catch (error) {
            console.log('An error occurred in handleResetPassword:', error)
            dispatch(setNotification({
                message: 'An Error Occurred',
                messageType: 'success',
                notificationType: 'system',
                showNotification: true,
                stay: true
            }))
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllUserEmails()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Reset Password</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name='close' size={28}/>
                </TouchableOpacity>
            </View>

            <View style={styles.resetPasswordContainer}>
                <TextInput 
                    value={email} 
                    onChangeText={(email:string) => {
                        setEmail(email.trim())
                        handleCheckEmail(email)
                    }} 
                    placeholder='Enter Email' 
                    placeholderTextColor={'#7A7A7A'} 
                    style={styles.resetPasswordInput}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!isLoading}
                />
                <TouchableOpacity 
                    disabled={!emailExists || isLoading} 
                    style={emailExists ? styles.resetButton : styles.cantResetButton}
                    onPress={handleResetPassword}
                >
                    <Text style={styles.resetText}>
                        {isLoading ? 'Sending...' : 'Reset'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ResetPassword