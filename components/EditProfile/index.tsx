import { Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { router } from 'expo-router'
import PhoneInput from 'react-native-phone-number-input'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { clearNotification, setNotification } from '@/state/features/notificationSlice'

const EditProfile = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const user = useSelector((state:RootState) => state.user)
    const styles = getStyles(appearanceMode)
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>('')
    const dispatch = useDispatch()

    const handlePhoneNumberValidation = (text:string) => {
        setFormattedPhoneNumber(text);
        if (text && !isValidPhoneNumber(text)) {
            dispatch(setNotification({ message: 'Invalid phone number', messageType: 'error', notificationType: 'system', showNotification: true, stay: true }))
        } else {
            dispatch(clearNotification())
        }
      };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Edit Profile</Text>
            </View>


            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder={String(user.fullName)} placeholderTextColor={'#7A7A7A'}/>
                <TextInput style={styles.input} placeholder={String(user.email)} placeholderTextColor={'#7A7A7A'}/>
                <PhoneInput
                    defaultValue={phoneNumber}
                    placeholder={`Enter Recipient's Phone Number`}
                    defaultCode="US"
                    onChangeText={(text) => setPhoneNumber(text)}
                    onChangeFormattedText={handlePhoneNumberValidation}
                    containerStyle={styles.phoneInputContainer}
                    disableArrowIcon
                    countryPickerProps={{
                        disabled: true
                    }}
                />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.continueButton]}>
                    <Text style={styles.continueButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default EditProfile