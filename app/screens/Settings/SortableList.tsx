import React from 'react';
import { Platform } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { COL, HEIGHT, Positions } from './Config';
import { Tile } from './Tile';
import { Tile as TileShape } from './models';

interface ListProps {
  tiles: TileShape[];
  editing: boolean;
  onDragEnd: (diff: Positions) => void;
}

export const SortableList = ({ tiles, editing, onDragEnd }: ListProps) => {
  const scrollY = useSharedValue(0);
  const scrollView = useAnimatedRef<Animated.ScrollView>();
  const positions = useSharedValue<Positions>(
    Object.assign({}, ...tiles.map((tile, index) => ({ [tile.id]: index }))),
  );
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
  });

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      ref={scrollView}
      contentContainerStyle={{
        height: Platform.OS === 'ios' ? Math.ceil(tiles.length / COL) * HEIGHT : '100%',
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}>
      {tiles.map((tile, index) => {
        return (
          <Tile
            key={`${tile.id}-${index}`}
            positions={positions}
            id={tile.id}
            editing={editing}
            onDragEnd={onDragEnd}
            scrollView={scrollView}
            scrollY={scrollY}
            type={tile.type}
            details={tile.details}
          />
        );
      })}
    </Animated.ScrollView>
  );
};
