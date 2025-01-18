import { Platform, StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            bottom: 0,
            width: "100%",
            zIndex: 1000,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: appearanceMode.backgroundColor
        },
        inputContainer: {
            flexDirection: 'row',
            paddingHorizontal: 5,
            paddingTop: 10,
            paddingBottom: 10,
            gap: 12,
        },
        input: {
            flex: 1,
            backgroundColor: appearanceMode.backgroundColor,
            borderRadius: 15,
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            padding: 15,
            fontFamily: 'sorabold',
            color: appearanceMode.textColor,
            maxHeight: 150
        },
        sendButton: {
            width: Platform.OS === 'ios' ? 50 : 40,
            height: Platform.OS === 'ios' ? 50 : 50,
            backgroundColor: appearanceMode.primaryColor,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15
        },
        actionButtonContainer: {
            position: 'absolute',
            width: '100%',
        },
        primaryButton: {
            backgroundColor: appearanceMode.primaryColor,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            marginHorizontal: 10,
            borderRadius: 15
        },
        primaryButtonText: {
            color: 'white',
            fontFamily: 'sorabold',
            fontSize: 15
        },
        ideasContainer: {
            alignItems: 'center', 
            paddingVertical: 10, 
            paddingHorizontal: 10, 
            gap: 15
        }
    })
}

export default getStyles;