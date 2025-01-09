import { clearNotification, removeNotification } from '@/state/features/notificationSlice';
import { NotificationType } from '@/types';
import { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import { SharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const ANIMATION_DURATION = 500;
const NOTIFICATION_TIMEOUT = 3000;
const INITIAL_POSITION = -(DEVICE_HEIGHT / 2);

const useNotificationHandler = (
  notification: NotificationType,
  translateY: SharedValue<number>
) => {
  const dispatch = useDispatch();
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  // Cleanup function to clear any existing timeouts
  const cleanup = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  };

  // Handle animation and state cleanup
  const handleDismiss = () => {
    translateY.value = withTiming(INITIAL_POSITION, {
      duration: ANIMATION_DURATION
    });
    
    // Wait for animation to complete before clearing notification state
    timeoutRef.current = setTimeout(() => {
      dispatch(removeNotification());
      dispatch(clearNotification());
    }, ANIMATION_DURATION);
  };

  useEffect(() => {
    cleanup(); // Clear any existing timeouts

    if (notification.showNotification) {
      // Animate in
      translateY.value = withTiming(0, {
        duration: ANIMATION_DURATION
      });

      // For non-persistent notifications, set up auto-dismiss
      if (!notification.stay) {
        timeoutRef.current = setTimeout(() => {
          handleDismiss();
        }, NOTIFICATION_TIMEOUT + ANIMATION_DURATION); // Add animation duration to ensure full visibility
      }
    } else {
      handleDismiss();
    }

    // Cleanup on unmount or when notification changes
    return cleanup;
  }, [notification.showNotification, notification.stay]);
};

export default useNotificationHandler;