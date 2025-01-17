import { StyleSheet, Platform } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            backgroundColor: appearanceMode.backgroundColor,
            flex: 1
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 60,
            paddingBottom: 20,
            paddingHorizontal: 20,
            zIndex: 100
        },
        headerText: {
            color: appearanceMode.textColor,
            fontFamily: 'soraextrabold',
            fontSize: 18
        },
        resetPasswordContainer: {
            marginHorizontal: 20,
            gap: 20,
            marginTop: 30
        },
        resetPasswordInput: {
            backgroundColor: '#F5F5F5',
            padding: Platform.OS === 'ios' ? 20 : 16,
            borderRadius: 15,
            fontFamily: 'sorabold',
            borderWidth: 1,
            borderColor: '#E3E3E3',
            color: appearanceMode.textColor
        },
        cantResetButton: {
            backgroundColor: 'rgba(238, 102, 66, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            borderRadius: 15
        },
        resetButton: {
            backgroundColor: appearanceMode.primaryColor,
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