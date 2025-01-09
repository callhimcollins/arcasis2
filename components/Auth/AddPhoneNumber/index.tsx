import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import PhoneInput from 'react-native-phone-number-input'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { clearNotification, setNotification } from '@/state/features/notificationSlice'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'

const AddPhoneNumber = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const user = useSelector((state:RootState) => state.user)
    const styles = getStyles(appearanceMode)
    const [phoneNumber, setPhoneNumber] = useState<string>()
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>()
    const dispatch = useDispatch()

    const handlePhoneNumberValidation = (text:string) => {
        setFormattedPhoneNumber(text);
        if (text && !isValidPhoneNumber(text)) {
            dispatch(setNotification({ message: 'Invalid phone number', messageType: 'error', notificationType: 'system', showNotification: true, stay: true }))
        } else {
            dispatch(clearNotification())
        }
    };

    const handleNext = async () => {
        if(!formattedPhoneNumber) {
            dispatch(setNotification({
                message: 'Please Enter A Phone Number',
                messageType: 'error',
                notificationType: 'system',
                showNotification: true,
                stay: false
            }))
            return;
        }
        const { error } = await supabase
        .from('Users')
        .update({ phoneNumber: phoneNumber })
        .eq('userId', user.userId)
        
        if(!error) {
            router.replace('/(home)')
        } else {
            console.log("An error occurred", error.message)
            dispatch(setNotification({ message: 'An error occurred', messageType: 'error', notificationType: 'system', showNotification: true, stay: true }))
            return;
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Add Phone Number</Text>
            <PhoneInput
                defaultValue={phoneNumber}
                placeholder="Enter Phone Number"
                textInputStyle={styles.phoneInput}
                defaultCode="US" // Lock the default code to US
                onChangeText={(text) => setPhoneNumber(text)}
                autoFocus
                onChangeFormattedText={handlePhoneNumberValidation}
                countryPickerButtonStyle={{
                    display: 'none'
                }}
                containerStyle={styles.phoneInputContainer}
            />

            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddPhoneNumber
