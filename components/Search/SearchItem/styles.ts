import { StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            paddingVertical: 20,
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            margin: 10,
            borderRadius: 20,
            gap: 30
        },
        image: {
            width: 150,
            height: 150,
            resizeMode: 'contain',
            borderRadius: 10,
            overflow: 'hidden'
        },
        price: {
            position: 'absolute',
            top: 10,
            right: 20,
            backgroundColor: appearanceMode.primaryColor,
            padding: 10,
            borderRadius: 10,
            color: 'white',
            fontFamily: 'sorabold'
        },
        name: {
            fontFamily: 'sorabold',
            marginTop: 25,
        },
        description: {
            alignSelf: 'flex-start',
            fontFamily: 'sorasemibold',
            fontSize: 13
        },
        addToCartButton: {
            width: '100%',
            backgroundColor: appearanceMode.primaryColor,
            padding: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        addToCartButtonText: {
            color: 'white',
            fontFamily: 'sorabold'
        },
        removeFromCartButtonText: {
            fontFamily: 'sorabold',
            color: appearanceMode.primaryColor,
            padding: 10,
            textAlign: 'center',
        }
    })
}

export default getStyles;