import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { router } from 'expo-router'
import { AntDesign, Octicons } from '@expo/vector-icons'
import { clearChats, clearChatsContainerId, setChatsContainerId, setChatTopic, setShouldCreateChatsContainer } from '@/state/features/chatSlice'
import { clearProductsFoundInRecommendations } from '@/state/features/recommendationSlice'
import { clearOrderDetails } from '@/state/features/orderSlice'
import { supabase } from '@/lib/supabase'

const Header = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const user = useSelector((state:RootState) => state.user)
    const chatTopic = useSelector((state:RootState) => state.chat.chatTopic)
    const styles = getStyles(appearanceMode)
    const dispatch = useDispatch()

    const navigateToProfile = () => {
        if (user?.userId) {
            router.push({
                pathname: '/(profile)/[userId]',
                params: { userId: user.userId },
            });
        }
    };

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
    }

    
    const cleanChatTopic = () => {
        return chatTopic.replace(/["]/g, '').replace(/\**\**/g, '');
    }
    
    
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.left}>
                    <Image style={styles.logo} source={require('../../../assets/images/arcasislogo.png')}/>
                    <Text style={styles.logoText}>Arcasis</Text>
                </View>

                <View style={styles.right}>
                    <TouchableOpacity onPress={startNew} style={styles.createButton}>
                        <AntDesign name='pluscircle' size={Platform.OS === 'ios' ? 24 : 20} color={`white`}/>
                        <Text style={styles.createButtonText}>New</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateToProfile}>
                        { !user.profileImageUrl && <Image style={styles.profileImage} source={require('../../../assets/images/blankprofile.webp')}/>}
                        { user.profileImageUrl && <Image style={styles.profileImage} source={{ uri: user.profileImageUrl }}/>}
                    </TouchableOpacity>
                </View>
            </View>
            { chatTopic && <View style={styles.bottom}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.chatTopic}>{cleanChatTopic()}</Text>
            </View> }
            {
                user.email === 'arcasisco@gmail.com' && 
                <TouchableOpacity onPress={() => router.push('/(admin)/landingadminscreen')} style={styles.adminButton}>
                    <Text style={styles.adminButtonText}>Go To Admin</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default Header

