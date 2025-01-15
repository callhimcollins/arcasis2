import { Image, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication';
import React, { useEffect, useState } from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { supabase } from '@/lib/supabase'
import { setUser } from '@/state/features/userSlice'
import { router } from 'expo-router'
import { setNotification } from '@/state/features/notificationSlice'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession()

const AuthLanding = () => {
  const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
  const styles = getStyles(appearanceMode)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [userInfo, setUserInfo] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  console.log(AuthSession.makeRedirectUri({ scheme: "arcasis" }));

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "502638950148-1gm0o9hrm1kopis4fo8eoalmgj2mrgel.apps.googleusercontent.com",
    iosClientId: "502638950148-rja60aqveqht9gmk4nn6p4kmsls71rud.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({
      scheme: 'com.arcasisco.arcasis',
    }),
  })

  const authenticateUser = async () => {
    if(!email.trim() || !password.trim()) {
        console.log('Please enter email and password')
        dispatch(setNotification({ message: `Please Enter Email And Password`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
        return;
    }
    try {
        const { data:signInData, error:signInError } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if(signInError) {
          console.log(signInError)
            if(signInError.message.includes('Invalid login credentials')) {
                console.log('User not found. Attempting to sign up')
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password
                })
                if(signUpError) {
                    console.log('Sign Up Error', signUpError.message)
                    dispatch(setNotification({ message: `${signUpError.message}`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
                    return;
                } else {
                    // Logic for inserting user data into database after signing user up
                    const { data: signUpInsertData, error: signUpInsertError } = await supabase
                    .from('Users')
                    .insert({ email })
                    .select()
                    .single()

                    if(signUpInsertData) {
                        dispatch(setUser(signUpInsertData))
                        router.replace('/(auth)/addnamescreen')
                    }

                    if(signUpInsertError) {
                        console.log('Sign Up Insert Error', signUpInsertError.message)
                        dispatch(setNotification({ message: `Couldn't Sign You Up`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
                        return;
                    }
                }
            } else {
                console.log(signInError.message)
                dispatch(setNotification({ message: `${signInError.message}`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
                return;
            }
        } else {
            console.log('Sign in successful')
            const { data, error } = await supabase
            .from('Users')
            .select('*')
            .eq('userId', signInData.user.id)
            .single()

            if(data) {
                dispatch(setUser(data))
                router.replace('/(home)')
            }
            if(error) {
                console.log('An error occurred when getting user', error.message)
                dispatch(setNotification({ message: `Couldn't Get User. Try Again`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
                return;
            }
        }
    } catch (error) {
        console.log('Unexpected Error', error)
        dispatch(setNotification({ message: `An Error occurred`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
    }
  }


  const authenticateWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if(credential.identityToken) {
        const { data: { user }, error } = await supabase
        .auth
        .signInWithIdToken({
          provider: 'apple',
          token: credential.identityToken
        })

        console.log(JSON.stringify({ error, user }, null, 2))

        if(!error) {
          const { data: getUserData, error: getUserError } = await supabase
          .from('Users')
          .select()
          .eq('userId', user?.id)
          .single()
          if(getUserData) {
            console.log('User Data:', getUserData)
            dispatch(setUser(getUserData))
            router.replace('/')
          }

          if(!getUserData || getUserError) {
            const { data: insertUserData, error: insertUserError } = await supabase
            .from('Users')
            .insert({ userId: user?.id, email: user?.email })
            .select()
            .single()

            if(!insertUserError) {
              dispatch(setUser(insertUserData))
              router.replace('/(auth)/addnamescreen')
            }

            if(insertUserError) {
              console.log('An error occurred', insertUserError)
              dispatch(setNotification({ message: 'An Error Occured. Try Again', messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
            }
          }
        }
      }
    } catch (e:any) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  }



  const handleSignInWithGoogle = async () => {
    if (response?.type === 'success') {
      const { id_token } = response.params
      
      try {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: id_token, 
        })
  
        if (error) throw error
        console.log(data.user.user_metadata.avatar_url)
        // If successful, get or create user in database
        const { data: userData, error: userError } = await supabase
          .from('Users')
          .select()
          .eq('email', data.user?.email)
          .single()
  
        if (userData) {
          dispatch(setUser(userData))
          router.replace('/(home)')
        } else {
          // Create new user if doesn't exist
          const { data: newUser, error: createError } = await supabase
            .from('Users')
            .insert({ 
              userId: data.user?.id,
              email: data.user?.email,
              fullName: data.user.user_metadata.full_name,
              profileImageUrl: String(data.user.user_metadata.avatar_url)
            })
            .select()
            .single()
  
          if (!createError) {
            dispatch(setUser(newUser))
            router.replace('/(auth)/addphonenumberscreen')
          }
        }
      } catch (error) {
        console.error('Error signing in with Google:', error)
        dispatch(setNotification({ 
          message: 'Failed to sign in with Google', 
          messageType: 'error', 
          notificationType: 'system', 
          showNotification: true, 
          stay: false 
        }))
      }
    }
  }
  

  useEffect(() => {
    if (response?.type === 'success') {
      handleSignInWithGoogle()
    }
  }, [response])
  
  return (
    <KeyboardAwareScrollView  style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logoImage} source={require('@/assets/images/arcasislogo.png')}/>
        <Text style={styles.logoText}>Arcasis</Text>
      </View>

      <Text style={styles.tagLine}>Sign Up and Gift That Special Someone—We'll Do the Thinking for You!</Text>


      <View style={styles.emailContainer}>
        <TextInput value={email} onChangeText={(text) => setEmail(text.trim())} style={styles.input} placeholder='Email Address' placeholderTextColor={'#7C7C7C'}/>

          <View style={styles.passwordInputContainer}>
              <TextInput secureTextEntry={!showPassword} value={password} onChangeText={(text) => setPassword(text.trim())} style={[styles.input, { flex: 1, borderWidth: 0 }]} placeholder='Password' placeholderTextColor={'#7C7C7C'}/>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ marginRight: 10 }}>
                <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={26} color='#7C7C7C'/>
              </TouchableOpacity>
          </View>

        <TouchableOpacity onPress={authenticateUser} activeOpacity={0.5} style={styles.emailButton}>
          <Ionicons name='mail' size={26} color='white'/>
          <Text style={styles.emailButtonText}>Continue With Email</Text>
        </TouchableOpacity>

          { Platform.OS === 'ios' && <TouchableOpacity onPress={authenticateWithApple} activeOpacity={0.5} style={styles.appleButton}>
            <FontAwesome name='apple' size={20} color='white'/>
            <Text style={styles.appleButtonText}>Continue With Apple</Text>
          </TouchableOpacity> }

          {/* { Platform.OS === 'android' &&  */}
            <TouchableOpacity onPress={() => promptAsync()} style={styles.googleButton}>
              <Image style={styles.googleImage} source={require('@/assets/images/googleimage.png')}/>
              <Text style={styles.googleButtonText}>Continue With Google</Text>
            </TouchableOpacity>
           {/* } */}

        <View style={[styles.loginContainer, { marginTop: 40 }]}>
          <Text style={styles.loginText}>Forgotten Password?</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.loginButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>By Signing Up, You Agree To Our</Text>
          <TouchableOpacity onPress={() => router.push('/(home)/eulascreen')} activeOpacity={0.5}>
            <Text style={styles.loginButtonText}>Terms And Conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default AuthLanding
