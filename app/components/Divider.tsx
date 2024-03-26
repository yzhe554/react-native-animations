import React from 'react';
import { View, ViewStyle } from 'react-native';

type DividerProps = {
  style?: ViewStyle;
};

export const Divider = ({ style = {} }: DividerProps) => (
  <View
    style={{
      borderTopColor: 'black',
      borderTopWidth: 1,
      ...style,
    }}
  />
);
