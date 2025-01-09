import { StyleSheet } from "react-native";
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
            paddingTop: 20,
            paddingBottom: 20,
            paddingHorizontal: 20,
        },
        gradient: {
            position: 'absolute',
            width: '100%',
            height: 60, // Significantly increased height for more prominent fade
        },
        topGradient: {
            top: 60, // Positioned below the header
            left: 0,
            right: 0,
        },
        bottomGradient: {
            bottom: 0,
            left: 0,
            right: 0,
        },
    })
}

export default getStyles;