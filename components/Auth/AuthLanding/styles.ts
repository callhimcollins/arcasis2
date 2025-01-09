import { Platform, StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            backgroundColor: appearanceMode.backgroundColor,
            flex: 1,
            paddingTop: 50,
            paddingHorizontal: 20
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15
        },
        logoImage: {
            width: 45,
            height: 45,
            resizeMode: 'contain'
        },
        logoText: {
            fontFamily: 'soraextrabold',
            fontSize: 18,
            color: appearanceMode.primaryColor
        },
        tagLine: {
            textAlign: 'center',
            marginTop: 70,
            color: appearanceMode.textColor,
            fontFamily: 'soraextrabold',
            fontSize: Platform.OS === 'ios' ? 18 : 15
        },
        thirdPartyContainer: {
            flexDirection: 'row',
            marginVertical: 40,
            width: '100%',
            justifyContent: 'space-between'
        },
        appleButton: {
            backgroundColor: 'black',
            width: '100%',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            flexDirection: 'row',
            gap: 10
        },
        appleButtonText: {
            color: 'white',
            fontFamily: 'sorabold'
        },
        googleButton: {
            width: '100%',
            flexDirection: 'row',
            gap: 10,
            backgroundColor: 'white',
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            elevation: 3
        },
        googleImage: {
            width: 20,
            height: 20,
            resizeMode: 'contain'
        },
        googleButtonText: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold'
        },
        emailContainer: {
            gap: 15,
            flexDirection: 'column',
            marginTop: 50
        },
        input: {
            backgroundColor: '#F5F5F5',
            padding: Platform.OS === 'ios' ? 20 : 16,
            borderRadius: 15,
            fontFamily: 'sorabold',
            borderWidth: 1,
            borderColor: '#E3E3E3',
            color: appearanceMode.textColor
        },
        emailButton: {
            backgroundColor: appearanceMode.primaryColor,
            padding: Platform.OS === 'ios' ? 15 : 12,
            borderRadius: 15,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        },
        emailButtonText: {
            color: 'white',
            fontFamily: 'sorabold',
        },
        loginContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5
        },
        loginText: {
            fontFamily: 'sorabold',
            fontSize: Platform.OS === 'ios' ? 14 : 12
        },
        loginButtonText: {
            color: appearanceMode.primaryColor,
            fontFamily: 'sorabold',
            fontSize: Platform.OS === 'ios' ? 14 : 12
        }
    })
}

export default getStyles
