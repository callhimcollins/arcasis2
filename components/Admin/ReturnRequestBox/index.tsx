import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootState } from '@/state/store'
import { useSelector } from 'react-redux'
import getStyles from './styles'
import { ProductType, ReturnRequestType } from '@/types'
import { supabase } from '@/lib/supabase'

type ReturnRequestBoxProps = {
    returnRequest: ReturnRequestType,
    filterRequestsData: () => void;
    key: number
}

const ReturnRequestBox = ({ returnRequest, filterRequestsData, key }: ReturnRequestBoxProps) => {
    const appearanceMode = useSelector((state:RootState) => state.appearance.currentMode)
    const styles = getStyles(appearanceMode);
    const [products, setProducts] = useState<ProductType[] | null>()
    
    const getProductsFromReturnRequests = async () => {
        const { data, error } = await supabase
        .from('CartItems')
        .select('*, Products(*)')
        .eq('cartItemId', returnRequest.cartItemId)

        if(data) {
            setProducts(data.map(item => item.Products))
        } 
        if(error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getProductsFromReturnRequests()
    }, [])

    
    return (
        <View key={key} style={styles.container}>
            <ScrollView>
                {
                    products?.map(product => (
                        <View style={styles.productContainer}>
                            <Image style={styles.productImage} source={{ uri: product.imageUrl }}/>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}>${product.price}</Text>
                        </View>
                    ))
                }
            </ScrollView>

            <Text style={styles.reasonForReturnText}>{returnRequest.reasonForReturn}</Text>
            <TouchableOpacity style={styles.approveButton}>
                <Text style={styles.approveText}>Approve</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ReturnRequestBox

