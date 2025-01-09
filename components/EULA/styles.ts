import { StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

export const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: appearanceMode.backgroundColor
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 60,
            paddingBottom: 20,
            paddingHorizontal: 20,
            zIndex: 100
        },
        headerText:{
            color: appearanceMode.textColor,
            fontFamily: 'soraextrabold',
            fontSize: 18
        },
        contentContainer: {
            padding: 10,
            gap: 10
        },
        title: {
            color: appearanceMode.textColor,
            fontFamily: 'soraextrabold',
            fontSize: 15
        },
        content: {
            color: appearanceMode.textColor,
            fontFamily: 'sorasemibold',
        }
    })
}

export default getStyles;