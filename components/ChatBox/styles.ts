import { StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        userContainer: {
            backgroundColor: appearanceMode.secondaryBackgroundColor,
            alignSelf: 'flex-end',
            paddingHorizontal: 18,
            marginHorizontal: 15,
            paddingVertical: 15,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',  // Keep the shadow color dark
            shadowOffset: { width: 0, height: 4 },  // Moderate offset for subtle depth
            shadowOpacity: 0.15,  // Softer opacity for less intensity
            shadowRadius: 8,  // Slight blur for a natural look
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