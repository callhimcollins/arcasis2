import { Platform, StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            backgroundColor: appearanceMode.backgroundColor,
            flex: 1
        },
        gradient: {
            position: 'absolute',
            width: '100%',
            height: 200, // Significantly increased height for more prominent fade
        },
        topGradient: {
            top: 50, // Positioned below the header
            left: 0,
            right: 0,
        },
        bottomGradient: {
            bottom: 0,
            left: 0,
            right: 0,
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
        giftQuantityContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'black',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 15
        },
        giftQuantityText: {
            color: 'white',
            fontFamily: 'sorabold',
            fontSize: Platform.OS === 'ios' ? 14 : 12
        },
        previewContainer: {
            paddingTop: 60
        },
        giftWorthText: {
            marginLeft: 15,
            fontFamily: 'sorabold',
            fontSize:  Platform.OS === 'ios' ? 15 : 14,
            color: appearanceMode.textColor
        },
        subTotalText: {
            color: appearanceMode.primaryColor,
            fontSize: Platform.OS === 'ios' ? 20 : 18,
        },
        aiMessageContainer: {
            marginTop: 25,
            height: 300,
            alignItems: 'center',
            gap: 5
        },
        aiMessageText: {
            textAlign: 'center',
            color: '#7A7A7A',
            fontFamily: 'sorabold',
        },
        logo: {
            width: 30,
            height: 30,
            resizeMode: 'contain'
        },
        noItemsContainer: {
            marginTop: 80
        },
        noItemsText: {
            textAlign: 'center',
            color: '#7A7A7A',
            fontFamily: 'sorabold',
            fontSize: 16
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