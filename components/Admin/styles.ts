import { AppearanceStateType } from "@/types";
import { StyleSheet } from "react-native";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: appearanceMode.backgroundColor
        }
    });
}

export default getStyles;