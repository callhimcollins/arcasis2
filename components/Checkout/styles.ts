import { Dimensions, Platform, StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            backgroundColor: appearanceMode.backgroundColor,
            flex: 1,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        validateContainer: {
            backgroundColor: '#FF9800',
            marginHorizontal: 10,
            borderRadius: 10,
            padding: 10
        },
        validateText: {
            textAlign: 'center',
            fontFamily: 'sorabold',
            fontSize: 13
        },
        headerText: {
            color: appearanceMode.textColor,
            fontFamily: 'soraextrabold',
            fontSize: 20,
            paddingTop: 60,
            paddingBottom: 20,
            paddingHorizontal: 20,
        },
        scrollContent: {
            paddingHorizontal: 10
        },
        productsContainer: {
            gap: 15,
            marginBottom: 60,
            padding: 10,
            flexGrow: 1
        },
        priceContainer: {
            backgroundColor: appearanceMode.backgroundColor,
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            paddingVertical: 25,
            paddingHorizontal: 20,
            borderRadius: 15,
            marginTop: 25,
            marginBottom: Platform.OS === 'ios' ? 0 : 150
        },
        priceHeaderText: {
            color: appearanceMode.primaryColor,
            fontFamily: 'soraextrabold',
            fontSize: 22,
            marginBottom: 30
        },
        priceItemContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        priceItemText: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 16,
            marginBottom: 10
        },
        orderTotalText: {
            color: appearanceMode.primaryColor,
            fontFamily: 'sorabold',
            fontSize: 17
        },
        addressContainer: {
            backgroundColor: appearanceMode.backgroundColor,
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            paddingVertical: 25,
            paddingHorizontal: 15,
            borderRadius: 15,
            marginTop: 20
        },
        addressText: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 16
        },
        addAddressButton: {
            backgroundColor: 'black',
            marginTop: 20,
            padding: 10,
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        addAddressButtonText: {
            color: 'white',
            fontFamily: 'sorabold',
            fontSize: 16
        },
        addressInfo: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginTop: 10
        },
        nameText: {
            fontFamily: 'sorabold',
            fontSize: 18,
            color: appearanceMode.secondaryTextColor
        },
        leftAddressInfoText: {
            textAlign: 'left',
            fontFamily: 'sorabold',
            fontSize: 15,
            lineHeight: 24
        },
        rightAddressInfoText: {
            textAlign: 'right',
            fontFamily: 'sorabold',
            fontSize: 15,
            lineHeight: 24
        },
        footer: {
            position: 'absolute',
            bottom: 20,
            zIndex: 200,
            width: '90%',
            alignSelf: 'center',
        },
        footerButtonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        backButton: {
            width: '47%',
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000', 
            elevation: 3,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            backgroundColor: 'white',
            borderRadius: 15
        },
        backButtonText: {
            fontFamily: 'sorabold',
            fontSize: 16,
            color: '#7A7A7A'
        },
        continueButton: {
            width: '47%',
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000', 
            elevation: 3,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            backgroundColor: '#39A13D',
            borderRadius: 15
        },
        continueButtonText: {
            fontFamily: 'sorabold',
            fontSize: 16,
            color: 'white'
        },
        footerText: {
            textAlign: 'center',
            fontFamily: 'sorabold',
            color: '#4D4D4D',
            marginTop: 5,
            fontSize: 13
        }
    })
}

export default getStyles;