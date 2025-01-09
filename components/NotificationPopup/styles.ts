import { StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        rootContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'box-none',
        },
        gestureRoot: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
        },
        container: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 50,
            backgroundColor: 'transparent'
        },
        systemNotificationCard: {
            width: '100%',
            padding: 25,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            borderWidth: 2,
            borderColor: appearanceMode.faintColor
        },
        systemNotificationText: {
            fontSize: 15,
            fontFamily: 'sorabold'
        }
    })
}

export default getStyles