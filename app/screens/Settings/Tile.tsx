import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
  Switch,
} from 'react-native-gesture-handler';
import Animated, {
  AnimatedRef,
  SharedValue,
  runOnJS,
  scrollTo,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  SIZE,
  HEIGHT,
  Positions,
  getPosition,
  animationConfig,
  MARGIN,
  COL,
  getOrder,
} from './Config';
import HamburgerIcon from '../../../assets/hamburger-menu-svgrepo-com.svg';
import { Divider } from '../../components/Divider';

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});

interface TileProps {
  positions: SharedValue<Positions>;
  editing: boolean;
  onDragEnd: (diffs: Positions) => void;
  scrollView: AnimatedRef<Animated.ScrollView>;
  scrollY: SharedValue<number>;
  id: string;
  type: string;
  details?: string;
}

export const Tile = ({
  positions,
  id,
  onDragEnd,
  scrollView,
  scrollY,
  editing,
  type,
  details,
}: TileProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
        const newOrder = getOrder(translateY.value, Object.keys(positions.value).length - 1);

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
        if (maxScroll < 0) {
          return;
        }
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
    .blocksExternalGesture()
    .enabled(editing);

  const style = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0;
    const scale = withSpring(isGestureActive.value ? 1 : 1);
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SIZE,
      height: HEIGHT,
      zIndex,
      transform: [{ translateY: translateY.value }, { scale }],
      flex: 1,
    };
  });
  return (
    <Animated.View style={style}>
      <Animated.View style={StyleSheet.absoluteFill}>
        <View style={styles.container}>
          <View style={{ flex: 1, margin: 16 }}>
            <Text>{type}</Text>
            <Divider
              style={{
                borderTopWidth: 0.5,
                opacity: 0.5,
                marginTop: 4,
                marginBottom: 8,
                marginRight: SIZE / 3,
              }}
            />
            {details ? <Text>{details}</Text> : null}
          </View>
          <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
            <Switch
              style={{ alignSelf: 'center' }}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <GestureDetector gesture={panGesture}>
              <View style={{ alignSelf: 'center' }}>
                <HamburgerIcon height={40} width={40} />
              </View>
            </GestureDetector>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};
