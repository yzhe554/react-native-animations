import React from "react";
import {
  Canvas,
  Rect,
  // LinearGradient,
  Skia,
  Shader,
  vec
} from "@shopify/react-native-skia";
import { Dimensions, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export const cardMargin = 16;
export const windowWidth = Dimensions.get('window').width;
export const cardWidth = windowWidth - cardMargin * 6;
export const cardHeight = cardWidth / 16 * 9;
 
export type CardProps = {
  index: number;
  last?: boolean
}
export const Card = ({index, last = false}) => {
  return (
    <View style={{width: cardWidth, height: cardHeight, marginRight: last? 3*cardMargin : cardMargin, marginLeft: index === 0 ? cardMargin : 0}}>

  <LinearGradient
          // Background Linear Gradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: cardHeight,
          }}
      />
    {/* <Canvas style={{ height: cardHeight, marginHorizontal: cardMargin }}>
      <Rect x={0} y={0} width={cardWidth} height={cardHeight}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(cardWidth, 0)}
          colors={["white", "grey"]}
        />
      </Rect>
    </Canvas> */}
    </View>
  );
}