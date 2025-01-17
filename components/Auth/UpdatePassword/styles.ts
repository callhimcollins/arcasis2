import { StyleSheet, Platform } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: appearanceMode.backgroundColor
        },
        headerText: {
            paddingTop: 60,
            paddingBottom: 20,
            paddingHorizontal: 20,
            zIndex: 100,
            color: appearanceMode.textColor,
            fontFamily: 'soraextrabold',
            fontSize: 18
        },
        resetPasswordContainer: {
            marginHorizontal: 20,
            gap: 10,
            marginTop: 30
        },
        input: {
            backgroundColor: '#F5F5F5',
            padding: Platform.OS === 'ios' ? 20 : 16,
            borderRadius: 15,
            fontFamily: 'sorabold',
            color: appearanceMode.textColor,
            flex: 1,
        },
        passwordInputContainer: {
            backgroundColor: '#F5F5F5',
            borderRadius: 15,
            borderColor: '#E3E3E3',
            borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: 5
        },
        noMatchText: {
            color: '#EB001B',
            fontFamily: 'sorabold',
            fontSize: 12,
            textAlign: 'center'
        },
        resetButton: {
            backgroundColor: appearanceMode.primaryColor,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            borderRadius: 15
        },
        cantResetButton: {
            backgroundColor: 'rgba(238, 102, 66, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            borderRadius: 15
        },
        resetText: {
            color: 'white',
            fontFamily: 'sorabold'
        }
    })
}

export default getStyles;