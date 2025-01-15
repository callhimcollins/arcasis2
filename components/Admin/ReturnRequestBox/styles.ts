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
            width: '100%',
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
            color: appearanceMode.primaryColor,
            fontFamily: 'sorabold',
            marginBottom: 10
        },
        reasonForReturnText: {
            fontFamily: 'sorabold',
            marginTop: 10,
            fontSize: 13
        },
        userDetailText: {
            marginBottom: 10,
            fontFamily: 'sorabold',
            fontSize: 13
        },
        approvedButton: {
            backgroundColor: '#39A13D',
            padding: 10,
            borderRadius: 15,
            alignItems: 'center'
        },
        approveButton: {
            backgroundColor: appearanceMode.primaryColor,
            padding: 10,
            borderRadius: 15,
            alignItems: 'center'
        },
        approveText: {
            color: 'white',
            fontFamily: 'sorabold'
        }
    })
}

export default getStyles;