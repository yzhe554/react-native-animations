import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SIZE, HEIGHT } from './Config';

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: HEIGHT,
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: 'white',
  },
});
interface TileProps {
  id: string;
  uri: string;
  onLongPress: () => void;
}

export const Tile = ({ uri }: TileProps) => {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={{ flex: 1 }}>
        <Text>{uri}</Text>
      </View>
    </View>
  );
};
