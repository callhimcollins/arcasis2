import { StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: appearanceMode.backgroundColor
        },
        header: {
            zIndex: 100,
            paddingTop: 60,
            paddingBottom: 20,
            paddingHorizontal: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        headerText: {
            color: appearanceMode.textColor,
            fontFamily: 'soraextrabold',
            fontSize: 20
        },
        inputContainer: {
            gap: 20,
            marginTop: 20
        },
        input: {
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            padding: 15,
            borderRadius: 10,
            marginHorizontal: 20,
            fontFamily: 'soraextrabold',
        },
        phoneInputContainer: {
            width: '90%',
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            borderRadius: 15,
            overflow: 'hidden',
            alignSelf: 'center'
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
        backButton: {
            width: '47%',
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            backgroundColor: 'white',
            borderRadius: 15
        },
        backButtonText: {
            fontFamily: 'sorabold',
            fontSize: 16,
            color:'#7A7A7A'
        },
        continueButton: {
            width: '47%',
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            backgroundColor: appearanceMode.primaryColor,
            borderRadius: 15
        },
        continueButtonText: {
            fontFamily: 'sorabold',
            fontSize: 16,
            color: 'white'
        }
    })
}

export default getStyles