import { Dimensions, StyleSheet, Text, View, Platform } from 'react-native';
import React, { useEffect } from 'react';
import getStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/state/store';
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import {
    GestureHandlerRootView,
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { clearNotification, removeNotification } from '@/state/features/notificationSlice';
import useNotificationHandler from './useNotificationHandler';

type ContextType = {
    translateY: number;
};

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
const INITIAL_POSITION = Platform.OS === 'android' ? -100 : -50;
const NOTIFICATION_WIDTH = DEVICE_WIDTH * 0.95;

const NotificationPopup = () => {
    const appearanceMode = useSelector((state: RootState) => state.appearance.currentMode);
    const notification = useSelector((state: RootState) => state.notification);
    const styles = getStyles(appearanceMode);
    const dispatch = useDispatch();
    const translateY = useSharedValue(INITIAL_POSITION);

    const animatedNotification = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        position: 'absolute',
        top: 0,
        left: (DEVICE_WIDTH - NOTIFICATION_WIDTH) / 2,
        width: NOTIFICATION_WIDTH,
        zIndex: 9999,
        elevation: 5,
    }));

    useNotificationHandler(notification, translateY);

    const handleDismiss = () => {
        dispatch(removeNotification());
        dispatch(clearNotification());
    };

    const panGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        ContextType
    >({
        onStart: (_event, context) => {
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            const newTranslateY = event.translationY + context.translateY;
            
            // Limit downward movement
            if (newTranslateY <= 50) {
                translateY.value = newTranslateY;
            } else {
                // Add resistance when pulling down
                translateY.value = 50 + (newTranslateY - 50) * 0.2;
            }
        },
        onEnd: (event) => {
            const velocityThreshold = -500;
            const positionThreshold = -25;
            
            if (event.velocityY < velocityThreshold || translateY.value < positionThreshold) {
                // Dismiss notification
                translateY.value = withTiming(-(DEVICE_HEIGHT / 2), {
                    duration: 200
                }, () => {
                    runOnJS(handleDismiss)();
                });
            } else {
                // Return to default position
                translateY.value = withSpring(0, {
                    damping: 15,
                    stiffness: 150,
                    mass: 1,
                    overshootClamping: false,
                });
            }
        },
    });

    const renderCategoryBasedNotification = () => {
        if (notification.notificationType === 'system') {
            return (
                <View style={[styles.systemNotificationCard, { elevation: 5 }]}>
                    <Text
                        style={[
                            styles.systemNotificationText,
                            {
                                color:
                                    notification.messageType === 'success'
                                        ? '#39A13D'
                                        : notification.messageType === 'error'
                                        ? '#EB001B'
                                        : appearanceMode.textColor,
                            },
                        ]}
                    >
                        {notification.message}
                    </Text>
                </View>
            );
        } else if (notification.notificationType === 'user') {
            return <View>{/* Render user-specific notification */}</View>;
        }
        return null;
    };

    return (
        <View style={StyleSheet.absoluteFill}>
            <GestureHandlerRootView style={[StyleSheet.absoluteFill, { zIndex: 9999 }]}>
                <PanGestureHandler
                    onGestureEvent={panGestureEvent}
                    minDist={5}
                    enabled={true}
                >
                    <Animated.View style={[styles.container, animatedNotification]}>
                        {renderCategoryBasedNotification()}
                    </Animated.View>
                </PanGestureHandler>
            </GestureHandlerRootView>
        </View>
    );
};

export default NotificationPopup;