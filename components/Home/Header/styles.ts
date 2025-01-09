import { AppearanceStateType } from "@/types";
import { current } from "@reduxjs/toolkit";
import { Platform, StyleSheet } from "react-native";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
           position: 'absolute',
           width: '100%',
           paddingTop: 50,
           paddingHorizontal: 20,
           paddingBottom: 10,
           justifyContent: 'space-between',
           zIndex: 100,
           backgroundColor: appearanceMode.backgroundColor,
           borderBottomLeftRadius: 15,
           borderBottomRightRadius: 15,
           gap: 30,
        },
        top: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
        },
        left: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        },
        logo: {
            width: Platform.OS === 'ios' ? 40 : 35,
            height: Platform.OS === 'ios' ? 40 : 35,
            resizeMode: 'contain'
        },
        logoText: {
            fontFamily: 'soraextrabold',
            fontSize: Platform.OS === 'ios' ? 18 : 15,
            color: appearanceMode.primaryColor
        },
        right: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: Platform.OS === 'ios' ? 20 : 15
        },
        createButton: {
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: 'black',
            paddingHorizontal: 15,
            paddingVertical: 8,
            gap: Platform.OS === 'ios' ? 15 : 13,
            borderRadius: 50
        },
        createButtonText: {
            color: 'white',
            fontFamily: 'sorabold',
            fontSize: Platform.OS === 'ios' ? 16 : 14
        },
        currentOrderButton: {
            borderColor: appearanceMode.faintColor,
            borderWidth: 1,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 12
        },
        currentOrderButtonText: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
        },
        profileImage: {
            width: 45,
            height: 45,
            resizeMode: 'contain',
            borderRadius: 15
        },
        bottom: {
            width: '100%',
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            padding: 5,
            borderRadius: 15
        }, 
        chatTopic: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 14
        }
    });
};


export default getStyles
