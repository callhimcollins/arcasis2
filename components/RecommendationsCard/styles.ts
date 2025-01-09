import { Dimensions, StyleSheet } from "react-native";
import { AppearanceStateType } from "@/types";

const WIDTH = Dimensions.get('window').width 
const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            height: 500,
            width: WIDTH,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20
        },
        card: {
            height: 480,
            width: 340,
            borderRadius: 40,
            backgroundColor: appearanceMode.backgroundColor,
            padding: 15,
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            borderWidth: 1,
            borderColor: appearanceMode.faintColor
        },
        header: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
        },
        image: {
            width: 180,
            height: 180,
            borderRadius: 30,
            resizeMode: 'contain'
        },
        price: {
            backgroundColor: 'black',
            padding: 10,
            borderRadius: 30,
            color: 'white',
            fontFamily: 'sorabold',
            fontSize: 15
        },
        name: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 16,
            marginVertical: 15
        },
        description: {
            color: appearanceMode.secondaryTextColor,
            fontFamily: 'sorasemibold',
            fontSize: 14,
            lineHeight: 22
        },
        removeButton: {
            position: 'absolute',
            bottom: 10,
            alignSelf: 'center',
            paddingHorizontal: 30,
            paddingVertical: 5
        },
        removeButtonText: {
            color: '#7A7A7A',
            fontFamily: 'sorabold',
            fontSize: 15
        }
    })
}

export default getStyles;