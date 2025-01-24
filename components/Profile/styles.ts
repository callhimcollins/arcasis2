import { Dimensions, Platform, StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const DEVICE_WIDTH = Dimensions.get('window').width;
const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: appearanceMode.backgroundColor,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 100,
            paddingTop: 60,
            paddingHorizontal: 20
        },
        headerText: {
            color: appearanceMode.textColor,
            fontFamily: 'soraextrabold',
            fontSize: 20,
        },
        right: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20
        },
        profileImage: {
            width: 40,
            height: 40,
            resizeMode: 'contain'
        },
        testMode: {
            zIndex: 300,
            backgroundColor: '#FF9800',
            flexDirection: 'row',
            textAlign: 'center',
            fontFamily: 'sorabold'
        },
        scrollContentContainer: {
            paddingTop: 70
        },
        pastContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding:10,
            marginBottom: 30
        },
        pastButton: {
            backgroundColor: 'black',
            width: '49%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10,
            paddingVertical: 10,
            borderRadius: 15
        },
        pastButtonText: {
            color: 'white',
            fontFamily: 'sorabold',
            fontSize: 16,
        },
        userSummaryContainer: {
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            marginHorizontal: 20,
            padding: 18,
            borderRadius: 15,
            marginBottom: 35
        },
        userSummaryText: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 15
        },
        giftInfoContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingHorizontal: 12
        },
        giftInfoItem: {
            width: '49%',
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            padding: 10,
            borderRadius: 15,
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            backgroundColor: 'white',
            height: 100
        },
        giftInfoItemText: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: Platform.OS === 'ios' ? 15 : 14
        },
        mainGiftInfo: {
            color: appearanceMode.primaryColor,
            fontFamily: 'sorabold',
            fontSize: Platform.OS === 'ios' ? 26 : 23,
            marginLeft: 5,
            position: 'absolute',
            bottom: 10,
            left: 8
        },
        memoryContainer: {
            zIndex: 100,
            paddingTop: 60,
            paddingHorizontal: 20
        },
        memoryHeaderText: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 20
        },
        noBotMemoriesContainer: {
            backgroundColor: appearanceMode.faintColor,
            padding: 30,
            borderRadius: 15,
            marginTop: 15
        },
        noBotMemoriesText: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 16,
            textAlign: 'center'
        },
        gradient: {
            position: 'absolute',
            width: '100%',
            height: 110, // Significantly increased height for more prominent fade
        },
        topGradient: {
            top: 70, // Positioned below the header
            left: 0,
            right: 0,
        },
        bottomGradient: {
            bottom: 60,
            left: 0,
            right: 0,
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
            width: '100%',
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
            color: appearanceMode.textColor
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
            backgroundColor: 'black',
            borderRadius: 15,
            flexDirection: 'row',
            gap: 15
        },
        continueButtonText: {
            fontFamily: 'sorabold',
            fontSize: 16,
            color: 'white'
        }
    })
}

export default getStyles;