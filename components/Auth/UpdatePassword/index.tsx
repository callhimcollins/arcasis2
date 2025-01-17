import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { RootState } from '@/state/store'
import { useDispatch, useSelector } from 'react-redux'
import getStyles from './styles'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import * as Linking from 'expo-linking'
import { supabase } from '@/lib/supabase'
import { setNotification } from '@/state/features/notificationSlice'
import { useFinancialConnectionsSheet } from '@stripe/stripe-react-native'
import { setUser } from '@/state/features/userSlice'

const UpdatePassword = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode)
    const [password, setPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [showPassword, setShowPassword] = useState<boolean>()
    const [tokens, setTokens] = useState<{
        access_token?: string,
        refresh_token?: string
    }>({})
    const dispatch = useDispatch()


    const passwordMatch = useMemo(() => {
        if (!password || !confirmPassword) return null;
        return password.trim() === confirmPassword.trim();
    }, [password, confirmPassword]);
    

    useEffect(() => {
        const handleURL = (url: string) => {
            // Handle both # and ? parameters
            const hasHash = url.includes('#');
            const hasParams = url.includes('?');
            
            let paramsString = '';
            
            if (hasHash) {
                [, paramsString] = url.split('#');
            } else if (hasParams) {
                [, paramsString] = url.split('?');
            }

            if (paramsString) {
                const paramsObj = Object.fromEntries(
                    paramsString.split('&').map(param => {
                        const [key, value] = param.split('=');
                        return [key, decodeURIComponent(value)];
                    })
                );

                if (paramsObj.access_token || paramsObj.refresh_token) {
                    const newTokens = {
                        access_token: paramsObj.access_token,
                        refresh_token: paramsObj.refresh_token,
                    };
                    
                    setTokens(newTokens);
                    console.log('Parsed tokens:', newTokens);
                }
            }
        };

        // Handle initial URL when app is opened from a link
        Linking.getInitialURL().then((url) => {
            if (url) handleURL(url);
        });

        // Handle deep links while app is running
        const subscription = Linking.addEventListener('url', ({ url }) => {
            handleURL(url);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    

    const handleUpdatePassword = async () => {
        if(!password || !confirmPassword) {
            dispatch(setNotification({
                message: "Fill In All Fields",
                messageType: 'error',
                notificationType: 'system',
                showNotification: true,
                stay: false
            }))
            return;
        }

        if(!tokens.access_token) {
            dispatch(setNotification({
                message: "You Are Not Authorized To Update Password",
                messageType: 'error',
                notificationType: 'system',
                showNotification: true,
                stay: false
            }))
            return;
        }

        try {
            supabase.auth.setSession({
                access_token: String(tokens.access_token),
                refresh_token: String(tokens.refresh_token)
            }).then(async (session) => {
                console.log('Session updated:', session);
                const { data, error } = await supabase
                .from('Users')
                .select()
                .eq('userId', session.data.user?.id)
                .single()
                if(data){
                    console.log("User signed in from session update", data)
                    const { error:updateUserError } = await supabase.auth.updateUser({
                        password
                    })
                    if(updateUserError) {
                        dispatch(setNotification({
                            message: `${updateUserError.message}`,
                            messageType: 'error',
                            notificationType: 'system',
                            showNotification: true,
                            stay: false
                        }))
                        return;
                    } else {
                        dispatch(setUser(data))
                        dispatch(setNotification({
                            message: `Password Updated Successfully`,
                            messageType: 'success',
                            notificationType: 'system',
                            showNotification: true,
                            stay: false
                        }))
                        router.replace('/')
                    }
                }
                if(error) {
                    dispatch(setNotification({
                        message: `An error occurred.`,
                        messageType: 'error',
                        notificationType: 'system',
                        showNotification: true,
                        stay: false
                    }))
                    return;
                }
            })   
        } catch (error) {
            dispatch(setNotification({
                message: `${error}`,
                messageType: 'error',
                notificationType: 'system',
                showNotification: true,
                stay: false
            }))
            return;
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Update Password</Text>

            <View style={styles.resetPasswordContainer}>
                <View style={styles.passwordInputContainer}>
                    <TextInput 
                        secureTextEntry={!showPassword} 
                        value={password} 
                        onChangeText={(text) => setPassword(text.trim())} 
                        style={styles.input} 
                        placeholder='New Password' 
                        placeholderTextColor={'#7C7C7C'}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ marginRight: 10 }}>
                        <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={26} color='#7C7C7C'/>
                    </TouchableOpacity>
                </View>

                <View style={styles.passwordInputContainer}>
                    <TextInput 
                        secureTextEntry={!showPassword} 
                        value={confirmPassword} 
                        onChangeText={(text) => setConfirmPassword(text.trim())} 
                        style={styles.input} 
                        placeholder='Confirm New Password' 
                        placeholderTextColor={'#7C7C7C'}
                    />
                </View>
                { passwordMatch !== null && passwordMatch === false && <Text style={styles.noMatchText}>Passwords Don't Match</Text>}
                <TouchableOpacity disabled={passwordMatch !== true} onPress={handleUpdatePassword} style={passwordMatch ? styles.resetButton : styles.cantResetButton}>
                    <Text style={styles.resetText}>Update Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UpdatePassword

