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
        phoneInputContainer: {
            width: '90%',
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            borderRadius: 15,
            overflow: 'hidden',
            marginHorizontal: 20,
            alignSelf: 'center',
        },
        phoneInput: {
            fontFamily: 'sorabold'
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