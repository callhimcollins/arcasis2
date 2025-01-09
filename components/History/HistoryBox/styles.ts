import { StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

export const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            gap: 10,
            flexDirection: 'row',
            width: '95%',
            margin: 10,
            alignSelf: 'center',
            justifyContent: 'space-between',
        },
        left: {
            width: '85%',
            gap: 10
        },
        right: {
            paddingHorizontal: 10
        },
        chatTopic: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 14,
        },
        timeText: {
            color: '#7A7A7A',
            fontFamily: 'sorabold',
            fontSize: 12
        }
    });
};

export default getStyles;