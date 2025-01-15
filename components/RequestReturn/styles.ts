import { Platform, StyleSheet } from "react-native";
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
            justifyContent: 'space-between'
        },
        headerText: {
            color: appearanceMode.textColor,
            fontFamily: 'soraextrabold',
            fontSize: 20,
            paddingTop: 60,
            paddingBottom: 20,
            paddingHorizontal: 20,
        },
        productContainer: {
            shadowColor: '#000',  // Keep the shadow color dark
            shadowOffset: { width: 0, height: 4 },  // Moderate offset for subtle depth
            shadowOpacity: 0.15,  // Softer opacity for less intensity
            shadowRadius: 8,  // Slight blur for a natural look
            backgroundColor: 'white',
            elevation: 3,
            padding: 15,
            width: 300,
            borderRadius: 15,
            justifyContent: 'space-between'
        },
        productImage: {
            width: 80,
            height: 80,
            resizeMode: 'contain',
            marginBottom: 10
        },
        productName: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 15,
        },
        returnButton: {
            backgroundColor: appearanceMode.primaryColor,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 30,
            alignItems: 'center'
        },
        disabledButton: {
            backgroundColor: '#7A7A7A',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 30,
            alignItems: 'center'
        },
        itemInReturnButton: {
            backgroundColor: 'white',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 30,
            alignItems: 'center'
        },
        returnText: {
            color: 'white',
            fontFamily: 'soraextrabold',
            fontSize: 15
        },
        itemInReturnText: {
            color: appearanceMode.primaryColor,
            fontFamily: 'soraextrabold',
            fontSize: 15
        },
        emptyText: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 15,
            textAlign: 'center',
            backgroundColor: 'green'
        },
        reasonContainer: {
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            padding: 10,
            marginHorizontal: 10,
            borderRadius: 15
        },
        reasonHeader: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 15
        },
        reasonInput: {
            backgroundColor: '#F2F2F2',
            paddingBottom: 300,
            paddingTop: 15,
            paddingHorizontal: 15,
            width: '100%',
            marginVertical: 20,
            borderRadius: 10,
            fontFamily: 'sorabold',
        },
        footer: {
            position: 'absolute',
            bottom: 0,
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

export default getStyles