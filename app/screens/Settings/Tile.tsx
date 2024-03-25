import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MARGIN, SIZE, HEIGHT } from './Config';

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
      <View style={{ flex: 1, margin: MARGIN * 2, borderRadius: MARGIN }}>
        <Text>123456</Text>
      </View>
    </View>
  );
};
