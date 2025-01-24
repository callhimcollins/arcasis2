import { Platform, StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: appearanceMode.backgroundColor
        },
        header: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 80,
            gap: 10
        },
        headerText: {
            color: '#39A13D',
            fontFamily: 'soraextrabold',
            fontSize: 20,
        },
        feedBackInputContainer: {
            marginTop: 40,
            marginHorizontal: 20,
        },
        feedBackInput: {
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            paddingTop: 15,
            paddingHorizontal: 20,
            paddingBottom: 100,
            borderRadius: 15,
            fontFamily: 'sorabold'
        },
        arcasisInfo: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 16,
            textAlign: 'center',
            marginTop: 15,
            marginHorizontal: 10
        },
        addPersonalizedMessageContainer: {
            marginTop: 100,
            marginHorizontal: 20,
            padding: 12,
            backgroundColor: 'white',
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            borderRadius: 15
        },
        personalizedMessageHeaderText: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 15
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 30,
            gap: 7
        },
        messageButton: {
            backgroundColor: 'black',
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            borderRadius: 15,
            padding: 15,
            flex: 1
        },
        videoButton: {
            backgroundColor: '#39A13D',
            padding: 15,
            borderRadius: 15,
            // width: '45%'
        },
        buttonText: {
            color: 'white',
            fontFamily: 'sorabold',
            marginTop: 10
        },
        sendTextOptionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        sendTextOptionHeaderText: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 15
        },
        textInput: {
          borderWidth: 1,
          borderColor: appearanceMode.faintColor,
          borderRadius: 15,
          maxHeight: Platform.OS === 'ios' ? 180 : 100,
          marginTop: 20,
          padding: 15,
          fontFamily: 'sorabold',
          color: appearanceMode.textColor
        },
        sendButton: {
            backgroundColor: '#39A13D',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            marginTop: 20
        },
        sendButtonText: {
            color: 'white',
            fontFamily: 'sorabold',
            fontSize: 15,
        },
        footer: {
            position: 'absolute',
            bottom: 20,
            zIndex: 200,
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        continueButton: {
            flex: 1,
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            backgroundColor: 'black',
            borderRadius: 15,
            gap: 10,
            flexDirection: 'row'
        },
        continueButtonText: {
            fontFamily: 'sorabold',
            fontSize: 16,
            color: 'white'
        }
    })
}

export default getStyles;