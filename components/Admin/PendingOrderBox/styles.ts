import { StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            backgroundColor: appearanceMode.backgroundColor,
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            padding: 15,
            borderRadius: 15,
            marginBottom: 15
        },
        productContainer: {
            width: 250,
            marginLeft: 10
        },
        productImage: {
            width: 140,
            height: 140,
            resizeMode: 'contain'
        },
        productName: {
            fontFamily: 'sorabold',
            marginTop: 10
        },
        productPrice: {
            fontFamily: 'sorabold',
            marginTop: 8,
            color: appearanceMode.primaryColor
        },
        addressContainer: {
            marginTop: 15,
            gap: 4
        },
        addressText: {
            fontFamily: 'sorabold'
        },
        fulfillButton: {
            backgroundColor: appearanceMode.primaryColor,
            paddingVertical: 10,
            marginTop: 15,
            borderRadius: 15
        },
        fulfillButtonText: {
            textAlign: 'center',
            color: 'white',
            fontFamily: 'sorabold'
        }
    })
}

export default getStyles;