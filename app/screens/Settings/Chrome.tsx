import React from 'react';
import { View } from 'react-native';

import { MARGIN } from './Config';
import { SortableList } from './SortableList';
import { Tile } from './Tile';

const tiles = [
  {
    id: 'google',
    uri: 'https://google.com',
  },

  {
    id: 'expo',
    uri: 'https://expo.io',
  },
  {
    id: 'facebook',
    uri: 'https://facebook.com',
  },
  {
    id: 'reanimated',
    uri: 'https://docs.swmansion.com/react-native-reanimated/',
  },
  {
    id: 'github',
    uri: 'https://github.com',
  },
  {
    id: 'rnnavigation',
    uri: 'https://reactnavigation.org/',
  },
  {
    id: 'youtube',
    uri: 'https://youtube.com',
  },
  {
    id: 'twitter',
    uri: 'https://twitter.com',
  },
];

export const Chrome = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: MARGIN }}>
      <SortableList
        editing
        onDragEnd={(positions) => console.log(JSON.stringify(positions, null, 2))}>
        {[...tiles, ...tiles].map((tile, index) => (
          <Tile
            onLongPress={() => true}
            key={tile.id + '-' + index}
            id={tile.id + '-' + index}
            uri={tile.uri}
          />
        ))}
      </SortableList>
    </View>
  );
};
