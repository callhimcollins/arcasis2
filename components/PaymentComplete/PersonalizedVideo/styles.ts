import { Dimensions, StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const DEVICE_HEIGHT = Dimensions.get('window').height
const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: appearanceMode.backgroundColor,
        },
        header: {
            paddingTop: 60,
            paddingBottom: 10,
            paddingHorizontal: 20,
            zIndex: 100,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        headerText: {
            color: appearanceMode.textColor,
            fontFamily: 'soraextrabold',
            fontSize: 20,

        },
        closeButton: {
            backgroundColor: '#F01717',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 30
        },
        closeButtonText: {
            color: 'white',
            fontFamily: 'soraextrabold',  
        },
        camera: {
            height: '85%',
            marginHorizontal: 5,
            borderRadius: 30,
            overflow: 'hidden',
        },
        cameraHeader: {
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 100,
            gap: 30       
        },
        cameraFooter: {
            position: 'absolute',
            bottom: 10,
            width: '100%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        video: {
            height: DEVICE_HEIGHT * .78,
            marginHorizontal: 5,
            borderRadius: 30,
            overflow: 'hidden',
            resizeMode: 'cover'
        },
        videoHeader: {
            // position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 400,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20
        },
        sendButton: {
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 10
        },
        sendButtonText: {
            color: 'white',
            fontFamily: 'soraextrabold',
            fontSize: 15
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
            elevation: 3,
            shadowRadius: 8,
            backgroundColor: 'black',
            borderRadius: 15,
            flexDirection: 'row',
            gap: 10
        },
        backButtonText: {
            fontFamily: 'sorabold',
            fontSize: 16,
            color:'#7A7A7A',
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
            backgroundColor: '#39A13D',
            borderRadius: 15,
            flexDirection: 'row',
            gap: 10
        },
        continueButtonText: {
            fontFamily: 'sorabold',
            fontSize: 16,
            color: 'white'
        }
    })
}

export default getStyles