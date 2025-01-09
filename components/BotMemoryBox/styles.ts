import { Dimensions, StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const DEVICE_WIDTH = Dimensions.get('window').width;
const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            width: DEVICE_WIDTH * .75,
            borderWidth: 1,
            borderColor: appearanceMode.faintColor,
            padding: 20,
            borderRadius: 15,
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            backgroundColor: 'white',
            marginVertical: 16,
            marginHorizontal: 10
        },
        summary: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 15,
            lineHeight: 26
        },
        deleteButton: {
            marginBottom: 10,
            alignSelf: 'flex-end',
            marginRight: 10
        }
    })
}

export default getStyles;