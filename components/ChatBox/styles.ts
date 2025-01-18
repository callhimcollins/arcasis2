import { StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        userContainer: {
            backgroundColor: appearanceMode.secondaryBackgroundColor,
            alignSelf: 'flex-end',
            paddingHorizontal: 18,
            paddingVertical: 15,
            marginHorizontal: 15,
            marginVertical: 10,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            marginBottom: 15,
            elevation: 3
        },
        userText: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 15,
            lineHeight: 26
        },
        assistantContainer: {
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 20,
            marginHorizontal: 15,
        },
        assistantText: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 15,
            lineHeight: 24
        }
    })
}

export default getStyles;