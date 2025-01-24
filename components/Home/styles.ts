import { AppearanceStateType } from "@/types";
import { StyleSheet } from "react-native";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: appearanceMode.backgroundColor
        },
        bodyContainer: {
            flex: 1,
        },
        keyboardAvoidingContainer: {
            flex: 1,
            justifyContent: 'space-between'
        }
    })
}

export default getStyles