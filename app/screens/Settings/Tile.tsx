import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SIZE, HEIGHT } from './Config';

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: HEIGHT,
    borderColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    backgroundColor: 'white',
  },
});
interface TileProps {
  id: string;
  type: string;
  details?: string;
  onLongPress: () => void;
}

export const Tile = ({ type, details }: TileProps) => {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={{ flex: 1, margin: 16 }}>
        <Text>{type}</Text>
        {details ? <Text>{details}</Text> : null}
      </View>
    </View>
  );
};
