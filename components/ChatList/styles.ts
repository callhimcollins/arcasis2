import { Dimensions, Platform, StyleSheet } from 'react-native';
import { AppearanceStateType } from '@/types';


const DEVICE_WIDTH = Dimensions.get('window').width;
const getStyles = (appearanceMode: AppearanceStateType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FFFFFF',
            // position: 'relative',
        },
        scrollContent: {
            paddingTop: 210,
            paddingBottom: Platform.OS === 'ios' ? 200 : 300,
            gap: 25
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
            height: 150, // Significantly increased height for more prominent fade
        },
        topGradient: {
            top: 90, // Positioned below the header
            left: 0,
            right: 0,
        },
        bottomGradient: {
            bottom: 60,
            left: 0,
            right: 0,
        },
        recommendationsContainer: {
            paddingVertical: 30, 
            width: DEVICE_WIDTH, 
            backgroundColor: appearanceMode.primaryColor, 
            borderRadius: 20,
        },
        recommendationsHeader : {
            flexDirection: 'row',
            marginHorizontal: 15,
            marginVertical: 10,
            justifyContent: 'space-between',
        },
        retryButton: {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
            gap: 5
        },
        retryButtonText: {
            color: 'white',
            fontFamily: 'sorabold',
            fontSize: 15
        }, 
        androidSwipeText: {
            color: 'white',
            fontFamily: 'sorabold',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 10
        },
        searchButton: {
            alignSelf: 'center',
            // marginVertical: 15,
            paddingVertical: 12,
            backgroundColor: 'white',
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 15,
            borderRadius: 12
        },
        searchButtonText: {
            color: appearanceMode.primaryColor,
            fontFamily: 'sorabold',
            fontSize: 14
        },
        searchInput: {
            alignSelf: 'center',
            marginVertical: 15,
            paddingVertical: 12,
            backgroundColor: 'white',
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            fontFamily: 'sorabold',
            paddingHorizontal: 10
        }
    });
};

export default getStyles;
