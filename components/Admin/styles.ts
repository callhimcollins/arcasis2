import { AppearanceStateType } from "@/types";
import { StyleSheet } from "react-native";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: appearanceMode.backgroundColor
        },
        header: {
            marginTop: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15
        },
        headerText: {
            fontFamily: 'sorabold',
            fontSize: 18
        },
        selectModeContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginTop: 20
        },
        selectedMode: {
            backgroundColor: appearanceMode.primaryColor,
            padding: 10,
            borderRadius: 15
        },
        unSelectedMode: {
            padding: 10
        },
        selectedModeText: {
            color: 'white',
            fontFamily: 'sorabold',
            fontSize: 15
        },
        unSelectedModeText: {
            fontFamily: 'sorabold',
            fontSize: 15
        }
    });
}

export default getStyles;