import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useAnimatedReaction,
  withSpring,
  scrollTo,
  withTiming,
  useSharedValue,
  runOnJS,
  AnimatedRef,
} from 'react-native-reanimated';

import {
  animationConfig,
  COL,
  getOrder,
  getPosition,
  HEIGHT,
  MARGIN,
  Positions,
  SIZE,
} from './Config';

interface ItemProps {
  children: ReactNode;
  positions: Animated.SharedValue<Positions>;
  id: string;
  editing: boolean;
  onDragEnd: (diffs: Positions) => void;
  scrollView: AnimatedRef<Animated.ScrollView>;
  scrollY: Animated.SharedValue<number>;
}

const Item = ({ children, positions, id, onDragEnd, scrollView, scrollY, editing }: ItemProps) => {
  const top = useHeaderHeight();
  const bottom = useBottomTabBarHeight();

  // - chrome padding * 2
  const containerHeight = Dimensions.get('window').height - top - bottom - MARGIN * 2;
  const contentHeight = (Object.keys(positions.value).length / COL) * HEIGHT;
  const isGestureActive = useSharedValue(false);

  const position = getPosition(positions.value[id]!);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  const ctxX = useSharedValue(0);
  const ctxY = useSharedValue(0);

  useAnimatedReaction(
    () => positions.value[id]!,
    (newOrder) => {
      if (!isGestureActive.value) {
        const pos = getPosition(newOrder);
        translateX.value = withTiming(pos.x, animationConfig);
        translateY.value = withTiming(pos.y, animationConfig);
      }
    },
  );

  const panGesture = Gesture.Pan()
    .onStart((event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
      // dont allow drag start if we're done editing
      if (editing) {
        console.log('ctx.value: ', ctxX.value);
        ctxX.value = translateX.value;
        ctxY.value = translateY.value;

        isGestureActive.value = true;
      }
    })
    .onChange(({ translationX, translationY }) => {
      // dont allow drag if we're done editing
      if (editing) {
        translateX.value = ctxX.value + translationX;
        translateY.value = ctxY.value + translationY;
        // 1. We calculate where the tile should be
        const newOrder = getOrder(
          translateX.value,
          translateY.value,
          Object.keys(positions.value).length - 1,
        );

        // 2. We swap the positions
        const oldOlder = positions.value[id];
        if (newOrder !== oldOlder) {
          const idToSwap = Object.keys(positions.value).find(
            (key) => positions.value[key] === newOrder,
          );
          if (idToSwap) {
            // Spread operator is not supported in worklets
            // And Object.assign doesn't seem to be working on alpha.6
            const newPositions = JSON.parse(JSON.stringify(positions.value));
            newPositions[id] = newOrder;
            newPositions[idToSwap] = oldOlder;
            positions.value = newPositions;
          }
        }

        // 3. Scroll up and down if necessary
        const lowerBound = scrollY.value;
        const upperBound = lowerBound + containerHeight - SIZE;
        const maxScroll = contentHeight - containerHeight;
        const leftToScrollDown = maxScroll - scrollY.value;
        if (translateY.value < lowerBound) {
          const diff = Math.min(lowerBound - translateY.value, lowerBound);
          scrollY.value -= diff;
          scrollTo(scrollView, 0, scrollY.value, false);
          ctxY.value -= diff;
          translateY.value = ctxY.value + translationY;
        }
        if (translateY.value > upperBound) {
          const diff = Math.min(translateY.value - upperBound, leftToScrollDown);
          scrollY.value += diff;
          scrollTo(scrollView, 0, scrollY.value, false);
          ctxY.value += diff;
          translateY.value = ctxY.value + translationY;
        }
      }
    })
    .onEnd(() => {
      const newPosition = getPosition(positions.value[id]!);
      translateX.value = withTiming(newPosition.x, animationConfig, () => {
        isGestureActive.value = false;
        runOnJS(onDragEnd)(positions.value);
      });
      translateY.value = withTiming(newPosition.y, animationConfig);
    })
    .enabled(editing);

  const style = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0;
    const scale = withSpring(isGestureActive.value ? 1.05 : 1);
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SIZE,
      height: HEIGHT,
      zIndex,
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale }],
    };
  });
  return (
    <Animated.View style={style}>
      {/* <PanGestureHandler enabled={editing} onGestureEvent={onGestureEvent}> */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={StyleSheet.absoluteFill}>{children}</Animated.View>
      </GestureDetector>
      {/* </PanGestureHandler> */}
    </Animated.View>
  );
};

export default Item;
