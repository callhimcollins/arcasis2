import { Dimensions, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { router } from 'expo-router'
import DropDownPicker from 'react-native-dropdown-picker'
import { supabase } from '@/lib/supabase'
import { setOrderTotal, setShippingAddress } from '@/state/features/orderSlice'
import { ShippingAddressType } from '@/types'
import { CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AddressBox from './AddressBox'
import { clearNotification, setNotification } from '@/state/features/notificationSlice'
import PhoneInput from 'react-native-phone-number-input';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { Entypo } from '@expo/vector-icons'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'


const DEVICE_HEIGHT = Dimensions.get('window').height;
const Address = () => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const user = useSelector((state:RootState) => state.user)
    const styles = getStyles(appearanceMode)
    const dispatch = useDispatch()
    const [addresses, setAddresses] = useState<ShippingAddressType[]>()
    const [name, setName] = useState<string>('')
    const [streetAddress, setStreetAddress] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [zipCode, setZipCode] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>('')
    const [extraInfo, setExtraInfo] = useState<string>('')
    const [saveAddress, setSaveAddress] = useState<boolean>(false)
    const [showAddressForm, setShowAddressForm] = useState<boolean>(false)
    const addressHeight = useSharedValue<number>(0);
    const addressVisibility = useSharedValue<number>(0);
    const addressesSavedVisibility = useSharedValue<number>(1);
    const [open, setOpen] = useState(false); // Dropdown open/close state
    const [selectedState, setSelectedState] = useState(null); // Selected state value
    const [states, setStates] = useState([
      { label: 'Alabama', value: 'Alabama' },
      { label: 'Alaska', value: 'Alaska' },
      { label: 'Arizona', value: 'Arizona' },
      { label: 'Arkansas', value: 'Arkansas' },
      { label: 'California', value: 'California' },
      { label: 'Colorado', value: 'Colorado' },
      { label: 'Connecticut', value: 'Connecticut' },
      { label: 'Delaware', value: 'Delaware' },
      { label: 'Florida', value: 'Florida' },
      { label: 'Georgia', value: 'Georgia' },
      { label: 'Hawaii', value: 'Hawaii' },
      { label: 'Idaho', value: 'Idaho' },
      { label: 'Illinois', value: 'Illinois' },
      { label: 'Indiana', value: 'Indiana' },
      { label: 'Iowa', value: 'Iowa' },
      { label: 'Kansas', value: 'Kansas' },
      { label: 'Kentucky', value: 'Kentucky' },
      { label: 'Louisiana', value: 'Louisiana' },
      { label: 'Maine', value: 'Maine' },
      { label: 'Maryland', value: 'Maryland' },
      { label: 'Massachusetts', value: 'Massachusetts' },
      { label: 'Michigan', value: 'Michigan' },
      { label: 'Minnesota', value: 'Minnesota' },
      { label: 'Mississippi', value: 'Mississippi' },
      { label: 'Missouri', value: 'Missouri' },
      { label: 'Montana', value: 'Montana' },
      { label: 'Nebraska', value: 'Nebraska' },
      { label: 'Nevada', value: 'Nevada' },
      { label: 'New Hampshire', value: 'New Hampshire' },
      { label: 'New Jersey', value: 'New Jersey' },
      { label: 'New Mexico', value: 'New Mexico' },
      { label: 'New York', value: 'New York' },
      { label: 'North Carolina', value: 'North Carolina' },
      { label: 'North Dakota', value: 'North Dakota' },
      { label: 'Ohio', value: 'Ohio' },
      { label: 'Oklahoma', value: 'Oklahoma' },
      { label: 'Oregon', value: 'Oregon' },
      { label: 'Pennsylvania', value: 'Pennsylvania' },
      { label: 'Rhode Island', value: 'Rhode Island' },
      { label: 'South Carolina', value: 'South Carolina' },
      { label: 'South Dakota', value: 'South Dakota' },
      { label: 'Tennessee', value: 'Tennessee' },
      { label: 'Texas', value: 'Texas' },
      { label: 'Utah', value: 'Utah' },
      { label: 'Vermont', value: 'Vermont' },
      { label: 'Virginia', value: 'Virginia' },
      { label: 'Washington', value: 'Washington' },
      { label: 'West Virginia', value: 'West Virginia' },
      { label: 'Wisconsin', value: 'Wisconsin' },
      { label: 'Wyoming', value: 'Wyoming' },
      { label: 'District of Columbia', value: 'District of Columbia' },
    ]);

    const animatedAddressForm = useAnimatedStyle(() => {
        return {
            height: addressHeight.value,
            opacity: addressVisibility.value
        }
    })

    const animatedAddressesSavedStyles = useAnimatedStyle(() => {
        return {
            opacity: addressesSavedVisibility.value,
        }
    })

    const handleAddress = async () => {
        if(saveAddress) {
            saveNewAddress();
        } else {
            if(!name || !streetAddress || !city || !selectedState || !zipCode || !phoneNumber) {
                dispatch(setNotification({ message: `Fill In All Fields Or Pick A Saved Address`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
                return;
            } else {
                await dispatch(setShippingAddress({ name, streetAddress, city, state: selectedState, zipCode, userId: user.userId, extraInfo, phoneNumber }))
                await dispatch(setOrderTotal(0))
                await router.push('/(order)/checkoutscreen')
            }
        }
    }


    const saveNewAddress = async () => {
        if(!name || !streetAddress || !city || !selectedState || !zipCode) return;
        try {
            const { data, error } = await supabase
            .from('ShippingAddresses')
            .insert({
               name,
               streetAddress,
               city,
               state: selectedState,
               zipCode,
               extraInfo,
               userId: user.userId,
               phoneNumber
            })
            .select()
            .single();
            if(data) {
                dispatch(setShippingAddress(data))
                dispatch(setOrderTotal(0))
                router.push('/(order)/checkoutscreen')
            } else {
                console.log("An error occurred creating a new address", error?.message)
                dispatch(setNotification({ message: `Couldn't Save Address. Try Again`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
            }     
        } catch (error) {
          console.log("An error occurred in handleNewAddress", error)  
          dispatch(setNotification({ message: `An Error occurred`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
        }
    }


    const fetchAddresses = async () => {
        console.log("Fetching...")
        try {
            const { data, error } = await supabase
            .from('ShippingAddresses')
            .select('*')
            .eq('userId', user.userId)

            if(data) {
                console.log("Addresses found")
                setAddresses(data)
            }

            if(error) {
                console.log("An error occurred fetching addresses", error.message)
                dispatch(setNotification({ message: `Couldn't Fetch Addresses`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
            }
        } catch (error) {
            console.log("An error occurred in fetchAddresses", error)
            dispatch(setNotification({ message: `An error occurred`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
        }
    }

    const deleteAddress = async (shippingAddressId: string) => {
        try {
           const { error } = await supabase
           .from('ShippingAddresses')
           .delete() 
           .eq('shippingAddressId', shippingAddressId)
           .eq('userId', user.userId)
           if(error) {
               console.log("An error occurred deleting address", error.message)
               dispatch(setNotification({ message: `Couldn't Delete Address. Try Again`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
           } else {
            if(addresses) setAddresses(addresses.filter(address => address.shippingAddressId !== shippingAddressId))
           }
        } catch (error) {
            console.log("An error occurred in deleteAddress", error)
            dispatch(setNotification({ message: `An Error occurred`, messageType: 'error', notificationType: 'system', showNotification: true, stay: false }))
        }
    }

    const handlePhoneNumberValidation = (text:string) => {
        setFormattedPhoneNumber(text);
        if (text && !isValidPhoneNumber(text)) {
            dispatch(setNotification({ message: 'Invalid phone number', messageType: 'error', notificationType: 'system', showNotification: true, stay: true }))
        } else {
            dispatch(clearNotification())
        }
    };

    const handlePhoneNumberInput = (text: string) => {
        // Remove any non-numeric characters except +
        const cleaned = text.replace(/[^\d+]/g, '');
        
        if (cleaned.startsWith('+1')) {
            setPhoneNumber(cleaned.slice(2));
            setFormattedPhoneNumber(cleaned);
        } else if (cleaned.startsWith('1')) {
            setPhoneNumber(cleaned.slice(1));
            setFormattedPhoneNumber(`+${cleaned}`);
        } else {
            setPhoneNumber(cleaned);
            setFormattedPhoneNumber(`+1${cleaned}`);
        }
    };
    

    useEffect(() => {
        fetchAddresses();
    }, [])

    useEffect(() => {
        if(showAddressForm) {
            addressHeight.value = withTiming(Platform.OS === 'ios' ? DEVICE_HEIGHT * 0.55 : DEVICE_HEIGHT * 0.7, { duration: 500 })
            addressVisibility.value = withTiming(1, { duration: 100 })
            addressesSavedVisibility.value = withTiming(0, { duration: 500 })
        } else {
            addressHeight.value = withTiming(0, { duration: 500 })
            addressVisibility.value = withTiming(0, { duration: 100 })
            addressesSavedVisibility.value = withTiming(1, { duration: 500 })
        }
    }, [showAddressForm])

    return (
        <View style={styles.container}>

            <Text style={styles.headerText}>Addresses</Text>

            <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={styles.addAddressButtonContainer}>
                <TouchableOpacity onPress={() => setShowAddressForm(!showAddressForm)} style={styles.addAddressButton}>
                    <Text style={styles.addAddressText}>Add A Recipient's Address & Contact Info</Text>
                    { showAddressForm ? <Entypo name='chevron-up' size={20} color={'white'}/> : <Entypo name='chevron-down' size={20} color={'white'}/>}
                </TouchableOpacity>
            </View>

            <Animated.View style={[styles.addAddressContainer, animatedAddressForm]}>
                
                <TextInput value={name} onChangeText={(text) => setName(text)} placeholder='Name Of Recipient' style={styles.wideInput} placeholderTextColor={appearanceMode.secondaryTextColor}/>
                <TextInput value={streetAddress} onChangeText={(text) => setStreetAddress(text)} placeholder={`Recipient's Street Address`} style={styles.wideInput} placeholderTextColor={appearanceMode.secondaryTextColor}/>
                <TextInput value={extraInfo} onChangeText={(text) => setExtraInfo(text)} placeholder='Apartment Number, Suite, etc' style={styles.wideInput} placeholderTextColor={appearanceMode.secondaryTextColor}/>

                <View style={styles.dropdownContainer}>
                    <DropDownPicker
                        open={open}
                        value={selectedState}
                        items={states}
                        setOpen={setOpen}
                        setValue={setSelectedState}
                        setItems={setStates}
                        searchable={true}
                        placeholder="Choose a state"
                        placeholderStyle={{ color: appearanceMode.secondaryTextColor }}
                        searchPlaceholder="Type state"
                        style={styles.dropDown}
                        dropDownContainerStyle={styles.dropDown}
                        textStyle={styles.dropdownText}
                        searchTextInputStyle={styles.searchInput}
                    />
                    <TextInput value={city} onChangeText={(text) => setCity(text)} placeholder='City' style={styles.minInput} placeholderTextColor={appearanceMode.secondaryTextColor}/>
                </View>
                <TextInput value={zipCode} onChangeText={(text) => setZipCode(text)} placeholder='Zip Code' style={styles.wideInput} placeholderTextColor={appearanceMode.secondaryTextColor}/>
                    <PhoneInput
                        defaultValue={phoneNumber}
                        placeholder={`Recipient's Phone Number`}
                        defaultCode="US"
                        onChangeText={(text) => handlePhoneNumberInput(text)}
                        onChangeFormattedText={handlePhoneNumberValidation}
                        containerStyle={styles.phoneInputContainer}
                        // autoFocus
                        disableArrowIcon
                        countryPickerProps={{
                            disabled: true
                        }}
                        countryPickerButtonStyle={{ display: 'none' }}
                    />

                <CheckBox
                    checked={saveAddress}
                    title={'Save Address'}
                    onPress={() => setSaveAddress(!saveAddress)}
                    checkedColor={"#39A13D"} // Green when checked
                    uncheckedColor={appearanceMode.secondaryTextColor}
                />
            </Animated.View>

            { addresses?.length === 0 && <View style={styles.noAddressSavedContainer}>
                <Text style={styles.noAddressSavedText}>You have no address saved</Text>
            </View>}

            { addresses && addresses?.length > 0 && 
                <Animated.View style={[styles.addressesSavedContainer, animatedAddressesSavedStyles]}>
                    <Text style={styles.addressesSavedHeaderText}>Saved Recipient's Addresses</Text>
                    {
                        addresses.map((address, index) => (
                            <AddressBox deleteAddress={() => deleteAddress(String(address.shippingAddressId))} key={index} {...address}/>
                        )) 
                     }
                </Animated.View>
            }

            </KeyboardAwareScrollView>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleAddress} style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>Go To Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Address
