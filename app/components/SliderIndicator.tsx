import React, { memo } from 'react';
import { View, ViewProps } from 'react-native';

import { Dot } from './Dot';

interface IndicatorProps extends ViewProps {
  totalCount: number;
  index: number;
}
const Dots = ({ totalCount, index }: IndicatorProps) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 16,
      }}>
      {Array.from(Array(totalCount), (_, i) => {
        return <Dot key={i} selected={i === index} />;
      })}
    </View>
  );
};

export const SliderIndicator = memo(Dots);
