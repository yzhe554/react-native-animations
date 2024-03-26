import React from 'react';
import { View } from 'react-native';

import { MARGIN } from './Config';
import { SortableList } from './SortableList';
import { Tile } from './Tile';

type TileProp = {
  id: string;
  type: string;
  details?: string;
};

const tiles: TileProp[] = [
  {
    id: 'completeAccess',
    type: 'Complete Access',
    details: '$1350.42',
  },
  {
    id: 'mastercardUltimate',
    type: 'Mastercard Ultimate',
    details: '-$2350.42',
  },
  {
    id: 'carInsuranceComp',
    type: 'Car Insurance Comp',
  },
];

export const Settings = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#e8e8e8', padding: MARGIN }}>
      <SortableList
        editing
        onDragEnd={(positions) => {
          // console.log(JSON.stringify(positions, null, 2));
        }}>
        {tiles.map((tile, index) => (
          <Tile
            key={tile.id + '-' + index}
            id={tile.id + '-' + index}
            type={tile.type}
            details={tile.details}
          />
        ))}
      </SortableList>
    </View>
  );
};
