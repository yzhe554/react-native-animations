import React, { memo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const styles = StyleSheet.create({
  dotStyle: {
    backgroundColor: 'black',
    opacity: 1,
  },
});

const dotSize = 10;

type Props = {
  selected: boolean;
};

const DotBase = ({ selected }: Props) => {
  const progress = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    };
  });

  useEffect(() => {
    if (selected) {
      progress.value = withTiming(1, { duration: 500 });
    } else {
      progress.value = withTiming(0.1, { duration: 500 });
    }
  }, [progress, selected]);
  return (
    <Animated.View
      style={[
        {
          width: dotSize,
          height: dotSize,
          marginHorizontal: 4,
          borderRadius: dotSize / 2,
        },
        styles.dotStyle,
        reanimatedStyle,
      ]}
    />
  );
};

export const Dot = memo(DotBase);
