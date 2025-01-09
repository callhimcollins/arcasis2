import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'
import { setNotification } from '@/state/features/notificationSlice'

const AddName = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode)
    const user = useSelector((state:RootState) => state.user)
    const [name, setName] = useState<string>('')
    const dispatch = useDispatch()

    const handleNext = async () => {
        if(!name.trim()) {
            dispatch(setNotification({
                message: 'Please Enter A Name',
                messageType: 'error',
                notificationType: 'system',
                showNotification: true,
                stay: false
            }))
            return;
        }
        const { error } = await supabase
        .from('Users')
        .update({ fullName: name })
        .eq('userId', user.userId)
        
        if(!error) {
            router.push('/(auth)/addphonenumberscreen')
        } else {
            console.log("An error occurred in handleNext", error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Add Name</Text>

            <TextInput value={name} onChangeText={(text) => setName(text)} style={styles.input} placeholder='John Doe'/>
            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddName
