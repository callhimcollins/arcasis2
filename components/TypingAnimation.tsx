import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  FadeOut,
  FadeIn,
  Easing,
} from 'react-native-reanimated';

interface TypingIndicatorProps {
  isVisible: boolean;
  dotSize?: number;
  dotColor?: string;
  spacing?: number;
  animationDuration?: number;
  bounceHeight?: number;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  isVisible,
  dotSize = 5.5,
  dotColor = '#6D6D6D',
  spacing = 4,
  animationDuration = 1200,
  bounceHeight = 6,
}) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    if (!isVisible) {
      cancelAnimation(progress);
      return;
    }

    progress.value = 0;
    progress.value = withRepeat(
      withTiming(1, {
        duration: animationDuration,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    return () => {
      cancelAnimation(progress);
    };
  }, [isVisible, animationDuration]);

  const createDotStyle = (dotIndex: number) => {
    return useAnimatedStyle(() => {
      // Create distinct phases for each dot
      const cyclePerDot = 1 / 3;
      const dotPhase = (progress.value + (1 - dotIndex * cyclePerDot)) % 1;
      
      // Create a smooth bell curve for the bounce
      let translateY = 0;
      if (dotPhase < cyclePerDot) {
        // Only animate during this dot's phase
        const normalizedPhase = dotPhase / cyclePerDot;
        // Use sine function for smooth animation
        translateY = -Math.sin(normalizedPhase * Math.PI) * bounceHeight;
      }

      return {
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2,
        backgroundColor: dotColor,
        marginHorizontal: spacing,
        transform: [{ translateY }],
      };
    });
  };

  const dot1Style = createDotStyle(0);
  const dot2Style = createDotStyle(1);
  const dot3Style = createDotStyle(2);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      style={styles.container}
    >
      <Animated.View style={[styles.dot, dot1Style]} />
      <Animated.View style={[styles.dot, dot2Style]} />
      <Animated.View style={[styles.dot, dot3Style]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 8,
  },
  dot: {
    backgroundColor: '#8E8E93',
  },
});

export default TypingIndicator;