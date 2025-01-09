import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import getStyles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import { ProductType } from '@/types'

const CheckoutProductCard = ({ name, imageUrl }: ProductType) => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode)
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: imageUrl}}/>
            <Text style={styles.nameText}>{name}</Text>
        </View>
    )
}

export default CheckoutProductCard
