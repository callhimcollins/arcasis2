import { Platform, StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            width: Platform.OS === 'ios' ? 300 : 265,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            backgroundColor: 'white',
            borderRadius: 15,
            gap: 15
        },
        image: {
            width: 100,
            height: 100,
            resizeMode: 'contain'
        },
        nameText: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 14
        }
    })
}

export default getStyles;