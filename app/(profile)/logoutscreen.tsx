import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import NotificationPopup from '@/components/NotificationPopup'
import { router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { AppearanceStateType } from '@/types'
import { AntDesign } from '@expo/vector-icons'
import {  } from 'react-native'
import { removeUser } from '@/state/features/userSlice'
import { supabase } from '@/lib/supabase'
import { setNotification } from '@/state/features/notificationSlice'
import Constants from 'expo-constants'
import { createClient } from '@supabase/supabase-js'

const LogoutScreen = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode)
    const dispatch = useDispatch()
    const supabaseServiceRoleKey = Constants.expoConfig?.extra?.supabaseServiceRoleKey
    const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)
    const user = useSelector((state:RootState) => state.user)

    const handleSignOut = async () => {
        try {
            dispatch(removeUser())
            await supabase.auth.signOut();
            dispatch(setNotification({ message: 'User Signed Out. Restart App', messageType: 'success', notificationType: 'system', showNotification: true, stay: true }))
            router.replace('/(auth)/authscreen');
        } catch (error) {
            console.log("An error occurred in handleSignOut", error);
        }
    }

    const confirmDeleteAccount = async () => {
        Alert.alert(
            `Are you sure you want to delete your account?`,
            `You Will Lose All Your Data. This Action Is Irreversible`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: () => handleDeleteAccount()
                }
            ]
        );
    };

    const handleDeleteAccount = async () => {
        try {
            const { error: deleteAccountFromDBError } = await supabase
            .from('Users')
            .delete()
            .eq('userId', user.userId)

            if(!deleteAccountFromDBError) {
                const { error: signOutError } = await supabase.auth.signOut();
                if(!signOutError) {
                    const { error: deleteAccountError } = await supabaseAdmin.auth.admin.deleteUser(String(user.userId));
                    if(!deleteAccountError) {
                        dispatch(removeUser());
                        dispatch(setNotification({
                            message: 'Account Deleted Successfully. Restart App To Use.',
                            messageType: 'success',
                            notificationType: 'system',
                            showNotification: true,
                            stay: true
                        }));
                        router.replace('/(auth)/authscreen');
                    } else {
                        dispatch(setNotification({
                            message: 'An Error Occurred In The Account Deletion Process. Please Try Again',
                            messageType: 'error',
                            notificationType: 'system',
                            showNotification: true,
                            stay: true
                        })); 
                        return;
                    }
                } else {
                    dispatch(setNotification({
                        message: 'An Error Occurred In The Sign Out Process. Please Try Again',
                        messageType: 'error',
                        notificationType: 'system',
                        showNotification: true,
                        stay: true
                    }));
                    return;
                }
            } else {
                dispatch(setNotification({
                    message: 'An Error Occurred In The Account Deletion Process. Please Try Again',
                    messageType: 'error',
                    notificationType: 'system',
                    showNotification: true,
                    stay: true
                }))
                return;
            }
        } catch (error) {
            console.log('Error occurred in handleDeleteAccount')
        }
    }
    

    const confirmSignOut = async () => {
        Alert.alert(
            `Are you sure you want to sign out?`, '',
            [
                {text: 'Cancel', style: 'cancel'}, 
                {text: 'Sign Out', onPress: () => handleSignOut()}
            ]
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', width: '100%' }}>
                <NotificationPopup/>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={confirmSignOut} style={styles.button}>
                    <AntDesign name='logout' size={30} color='#EB001B'/>
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={confirmDeleteAccount} style={styles.button}>
                    <AntDesign name='deleteuser' size={30} color='#EB001B'/>
                    <Text style={styles.buttonText}>Delete Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LogoutScreen

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
        buttonContainer: {
            gap: 40,
            padding: 10
        },
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20
        },
        buttonText: {
            color: '#EB001B',
            fontFamily: 'sorabold',
            fontSize: 16
        }
    })
}