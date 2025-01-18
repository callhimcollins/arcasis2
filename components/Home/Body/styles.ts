import { Dimensions, StyleSheet } from 'react-native';
import { AppearanceStateType } from '@/types';

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height
const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FFFFFF',
        },
        scrollContent: {
            paddingTop: 140,
            alignItems: 'center',
            flex: 1
        },
        welcomeText: {
            color: appearanceMode.textColor,
            marginTop: 20,
            textAlign: 'center',
            fontSize: 16,
            fontFamily: 'soraextrabold'
        },
        processingOrdersContainer: {
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            padding: 20
        },
        processingOrdersText: {
            color: appearanceMode.textColor,
            marginBottom: 20,
            fontSize: 16,
            fontFamily: 'soraextrabold'
        },
        orderContainer: {
            padding: 10,
            backgroundColor: 'white',
            marginRight: 20,
            borderRadius: 15,
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
            width: DEVICE_WIDTH * .8,
            height: DEVICE_HEIGHT * .46,

        },
        productContainer: {
            gap: 10,
            padding: 10
        },
        productImage: {
            width: 100,
            height: 100,
            resizeMode: 'contain'
        },
        productName: {
            color: appearanceMode.textColor,
            fontFamily: 'sorabold',
            fontSize: 14
        },
        moreProducts: {
            backgroundColor: 'black',
            alignSelf: 'flex-end',
            color: 'white',
            fontFamily: 'sorabold',
            fontSize: 15,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 30,
            marginVertical: 15
        },
        chatsContainer: {
            backgroundColor: appearanceMode.backgroundColor,
            // flex: 1
        },
        greeting: {
            color: appearanceMode.textColor,
            marginTop: 20,
            textAlign: 'center',
            fontSize: 16,
            fontFamily: 'soraextrabold'
        },
        text: {
            fontSize: 16,
            lineHeight: 24,
            color: '#333',
        },
        gradient: {
            position: 'absolute',
            width: '100%',
            height: 110, // Significantly increased height for more prominent fade
        },
        topGradient: {
            top: 65, // Positioned below the header
            left: 0,
            right: 0,
        },
        bottomGradient: {
            bottom: 60,
            left: 0,
            right: 0,
        },
        subHeaderText: {
            marginTop: 20,
            marginLeft: 20,
            marginBottom: 7,
            fontFamily: 'soraextrabold',
            fontSize: 16,
            color: appearanceMode.primaryColor
        }
    });
};

export default getStyles;
