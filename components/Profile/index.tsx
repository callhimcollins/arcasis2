import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { router, useLocalSearchParams } from 'expo-router'
import { Octicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { setNotification } from '@/state/features/notificationSlice'
import { supabase } from '@/lib/supabase'
import { removeFromBotMemory, removeUser, setUser } from '@/state/features/userSlice'
import BotMemoryBox from '../BotMemoryBox'

type GiftDetailsType = {
    numberOfPeopleGifted: number,
    giftingNetWorth: number
}
const Profile = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const user = useSelector((state:RootState) => state.user)
    const dispatch = useDispatch()
    const styles = getStyles(appearanceMode)
    const { userId } = useLocalSearchParams();
    const [userGiftDetails, setUserGiftDetails] = useState<GiftDetailsType>({ numberOfPeopleGifted: 0, giftingNetWorth: 0 })

    const fetchUserDetails = async () => {
        try {
           if(userId !== user.userId) {
            // Fetch guest user details
           } 
        } catch (error) {
            console.log("An error occurred in fetchUserDetails", error);
            dispatch(setNotification({ message: `Couldn't fetch user`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
        }
    }

    const getGiftingDetails = async () => {
        const { data, error } = await supabase
        .from('Orders')
        .select('orderTotal')
        .eq('userId', user.userId)
        
        if(data) {
            setUserGiftDetails({ numberOfPeopleGifted: data.length, giftingNetWorth: data.reduce((acc, curr) => acc + curr.orderTotal, 0) })
        }

        if(error){
            console.log("An error occurred getting gift details", error)
        }
    }



    const navigateToSignOut = () => {
        router.push('/(profile)/logoutscreen')
    }

    const deleteBotMemory = async (botMemoryId: string) => {
        try {
            const { error } = await supabase
            .from('BotMemories')
            .delete()
            .eq('userId', user.userId)
            .eq('botMemoryId', botMemoryId)

            if(!error) {
                dispatch(setNotification({ message: 'Bot Memory Deleted', messageType: 'success', notificationType: 'system', showNotification: true, stay: false }))
                dispatch(removeFromBotMemory(botMemoryId))
            } else {
                dispatch(setNotification({ message: 'An error occurred deleting bot memory', messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
                return;
            }
        } catch (error) {
            console.log('An error occurred in deleteBotMemory', error);
        }
    }

    const showMemoryInFull = (memory: string) => {
        router.push({
            pathname: '/(profile)/memorypopup',
            params: {
                memory: memory
            }
        })
    }

    useEffect(() => {
        getGiftingDetails()
    }, [])

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.headerText}>{ user.fullName ? `Hey, ${user.fullName.split(' ')[0]}` : 'Profile'}</Text>
                <View style={styles.right}>
                    <TouchableOpacity onPress={() => router.push('/(profile)/historypopupscreen')}>
                        <Octicons name='history' size={24} color={'black'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateToSignOut}>
                        {/* <Feather name='settings' size={24} color={'black'}/> */}
                        <Image style={styles.profileImage} source={require('@/assets/images/signout.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
            
            <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                <View style={styles.giftInfoContainer}>
                    <View style={styles.giftInfoItem}>
                        <Text style={styles.giftInfoItemText}>Number Of People You Have Gifted</Text>
                        <Text style={styles.mainGiftInfo}>{userGiftDetails.numberOfPeopleGifted}</Text>
                    </View>

                    <View style={styles.giftInfoItem}>
                        <Text style={styles.giftInfoItemText}>Gifting Net Worth</Text>
                        <Text style={styles.mainGiftInfo}>${ userGiftDetails.giftingNetWorth.toFixed(2) }</Text>
                    </View>
                </View>

                <View style={styles.memoryContainer}>
                    <Text style={styles.memoryHeaderText}>Memory</Text>
                    {
                        user.botMemories?.length === 0 || !user.botMemories ? 
                        <View style={styles.noBotMemoriesContainer}>
                            <Text style={styles.noBotMemoriesText}>Memories Will Appear Here</Text>
                        </View> : 
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {user.botMemories?.map((memory, index) => (
                                <BotMemoryBox showMemoryInFull={() => showMemoryInFull(memory.summary)} key={index} botMemoryBox={memory} onDelete={() => deleteBotMemory(memory.botMemoryId)}/>
                            ))}
                        </ScrollView>
                    }
                </View>
            </ScrollView>
 

            {/* Top Gradient */}
            <LinearGradient
                colors={['#FFFFFF', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.gradient, styles.topGradient]}
            />

            {/* Bottom Gradient */}
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.9)', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.gradient, styles.bottomGradient]}
            />
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => router.push('/(profile)/editprofilescreen')} style={styles.continueButton}>
                    <Ionicons name='pencil' size={24} color={'white'}/>
                    <Text style={styles.continueButtonText}>Edit Profile</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default Profile
