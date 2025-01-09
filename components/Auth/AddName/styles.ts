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
            paddingTop: 60,
            paddingBottom: 20,
            paddingHorizontal: 20,
        },
        input: {
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            padding: 15,
            borderRadius: 10,
            marginHorizontal: 20,
            marginTop: 20,
            fontFamily: 'soraextrabold',
        },
        nextButton:{
            backgroundColor: appearanceMode.primaryColor,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            marginHorizontal: 20,
            marginTop: 30,
            borderRadius: 10
        },
        nextButtonText: {
            color: 'white',
            fontFamily: 'soraextrabold',
            fontSize: 15
        }
    })
}

export default getStyles;