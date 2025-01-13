import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import getStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { ShippingAddressType } from '@/types'
import { SimpleLineIcons } from '@expo/vector-icons'
import { setOrderTotal, setShippingAddress } from '@/state/features/orderSlice'
import { router } from 'expo-router'

interface AddressBoxProps extends ShippingAddressType {
  deleteAddress: (shippingAddressId: string) => void;
}

const AddressBox: React.FC<AddressBoxProps> = ({ 
  shippingAddressId,
  name,
  streetAddress,
  city,
  state,
  zipCode,
  extraInfo,
  deleteAddress,
  phoneNumber
}) => {
  const appearanceMode = useSelector((state: RootState) => state.appearance.currentMode)
  const user = useSelector((state: RootState) => state.user)
  const styles = getStyles(appearanceMode)
  const dispatch = useDispatch()

  const pickAddress = () => {
    if (user) {
      dispatch(setShippingAddress({ 
        name, 
        streetAddress, 
        city, 
        state, 
        zipCode, 
        extraInfo, 
        userId: user.userId,
        phoneNumber
      }))
      dispatch(setOrderTotal(0))
      router.push('/(order)/checkoutscreen')
    }
  }

  return (
    <TouchableOpacity onPress={pickAddress} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.nameText}>{phoneNumber}</Text>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.leftAddressInfoText}>
          {streetAddress}
          {extraInfo && `\n${extraInfo}`}
        </Text>
        <Text style={styles.rightAddressInfoText}>
          {city}
          {'\n'}
          {state}, {zipCode}
        </Text>
      </View>

      <TouchableOpacity 
          onPress={() => deleteAddress(String(shippingAddressId))}
          accessibilityLabel={`Delete ${name}'s address`}
          style={styles.deleteButton}
        >
          <SimpleLineIcons 
            name='minus' 
            size={24} 
            color={'#EB001B'}
          />
        </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default AddressBox