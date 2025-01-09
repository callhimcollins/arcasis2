import { StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            padding: 12,
            margin: 10,
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            backgroundColor: 'white',
            borderRadius: 15,
            elevation: 3
        },
        card: {

        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 30

        },
        nameText: {
            color: appearanceMode.secondaryTextColor,
            fontFamily: 'sorabold',
            fontSize: 19,
        },
        addressContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        leftAddressInfoText: {
            textAlign: 'left',
            fontFamily: 'sorabold',
            fontSize: 15,
            lineHeight: 24
        },
        rightAddressInfoText: {
            textAlign: 'right',
            fontFamily: 'sorabold',
            fontSize: 15,
            lineHeight: 24
        },
        deleteButton: {
            alignSelf: 'flex-end',
            marginTop: 20,
            right: 5
        }
    })
}

export default getStyles