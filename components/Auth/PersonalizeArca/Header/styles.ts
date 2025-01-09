import { AppearanceStateType } from "@/types";
import { StyleSheet } from "react-native";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
           position: 'absolute',
           width: '100%',
           paddingTop: 50,
           paddingHorizontal: 20,
           paddingBottom: 10,
           flexDirection: 'row',
           justifyContent: 'space-between',
           zIndex: 100,
           backgroundColor: appearanceMode.backgroundColor
        },
        left: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            width: '100%',
            gap: 15
        },
        logo: {
            width: 25,
            height: 25,
            resizeMode: 'contain'
        },
        logoText: {
            fontFamily: 'soraextrabold',
            fontSize: 20,
            color: appearanceMode.primaryColor
        },
    });
};


export default getStyles
