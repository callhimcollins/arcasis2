import { Platform, StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            backgroundColor: appearanceMode.backgroundColor,
            flex: 1,
        },
        inputContainer: {
            position: 'absolute',
            backgroundColor: appearanceMode.backgroundColor,
            marginTop: 60,
            marginHorizontal: 20,
            padding: Platform.OS === 'ios' ? 12 : 7,
            borderRadius: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            zIndex: 100
        },
        input: {
            fontFamily: 'sorabold',
            flex: 1,
        },
        gradient: {
            position: 'absolute',
            width: '100%',
            height: 200, // Significantly increased height for more prominent fade
        },
        topGradient: {
            top: 0, // Positioned below the header
            left: 0,
            right: 0,
        },
        bottomGradient: {
            bottom: 0,
            left: 0,
            right: 0,
        },
        noResultsContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        noResultsText: {
            fontFamily: 'sorabold',
            fontSize: 16,
            color: appearanceMode.textColor
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
            paddingVertical: Platform.OS === 'ios' ? 20 : 14,
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
            fontSize: Platform.OS === 'ios' ? 16 : 14,
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
            fontSize: Platform.OS === 'ios' ? 16 : 14,
            color: 'white'
        }
    })
}

export default getStyles;