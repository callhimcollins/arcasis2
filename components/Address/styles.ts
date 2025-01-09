import { Platform, StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: appearanceMode.backgroundColor
        },
        headerText: {
            color: appearanceMode.textColor,
            fontFamily: 'soraextrabold',
            fontSize: 20,
            paddingTop: 60,
            paddingBottom: 20,
            paddingHorizontal: 20,
        },
        addAddressButtonContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 20
        },
        addAddressButton: {
            backgroundColor: 'black',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 15
        },
        addAddressText: {
            color: 'white',
            fontFamily: 'sorabold',
            fontSize: Platform.OS === 'ios' ? 14 : 13
        },
        noAddressSavedContainer: {
            backgroundColor: appearanceMode.faintColor,
            marginHorizontal: 20,
            padding: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15
        },
        noAddressSavedText: {
            color: appearanceMode.textColor,
            fontFamily: 'soraextrabold',
            fontSize: Platform.OS === 'ios' ? 16 : 14,
            paddingHorizontal: 20,
        },
        addressesSavedContainer: {
            paddingVertical: 10,
            marginHorizontal: 12,
            borderRadius: 15,
        },
        addressesSavedHeaderText: {
            color: appearanceMode.textColor,
            fontFamily: 'soraextrabold',
            fontSize: 16,
            paddingHorizontal: 15,
        },
        addAddressContainer: {
            marginTop: 10,
            paddingHorizontal: 20,
            gap: 15,
        },
        addAddressSubHeading: {
            color: appearanceMode.textColor,
            fontFamily: 'soraextrabold',
            fontSize: 16,
            paddingHorizontal: 10,
        },
        dropdownContainer: {
            width: '50%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        dropDown: {
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            borderRadius: 15,
            width: '90%'
        },
        dropdownText: {
            fontFamily: 'sorabold',
            color: appearanceMode.textColor,
            fontSize: 15
        },
        searchInput: {
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            paddingVertical: 10
        },
        wideInput: {
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            padding: Platform.OS === 'ios' ? 18 : 15,
            borderRadius: 15,
            fontFamily: 'sorabold',
        },
        minInput: {
            width: '100%',
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            padding: 18,
            borderRadius: 15,
            fontFamily: 'sorabold',
        },
        phoneInputContainer: {
            width: '100%',
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            borderRadius: 15,
            overflow: 'hidden',
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
            backgroundColor: 'white',
            borderRadius: 15,
            elevation: 3
        },
        backButtonText: {
            fontFamily: 'sorabold',
            fontSize: Platform.OS === 'ios' ? 16 : 14,
            color: '#7A7A7A'
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
            backgroundColor: appearanceMode.primaryColor,
            borderRadius: 15,
            elevation: 3
        },
        continueButtonText: {
            fontFamily: 'sorabold',
            fontSize: Platform.OS === 'ios' ? 16 : 14,
            color: 'white'
        }
    })
}

export default getStyles;