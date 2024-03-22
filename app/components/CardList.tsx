import { ScrollView } from "react-native-gesture-handler"
import { Card, cardMargin, cardWidth } from "./Card"
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native"
import { useMemo, useRef } from "react"
import * as Haptics from 'expo-haptics';
import { SliderIndicator } from "./SliderIndicator";

const maxIndex = 3;


const getIndex = (position: number): number => {
  if (position >= maxIndex * cardWidth) {
    return maxIndex;
  }
  const baseIndex = Math.floor((position - 16) / (cardWidth + cardMargin));
  const offsetX = position - baseIndex * (cardWidth + cardMargin) - ((baseIndex - 1 < 0) ? 0 : (baseIndex - 1) * cardMargin);
  if (offsetX > cardWidth / 2) {
    return baseIndex + 1;
  }
  return baseIndex
}

export const CardList = () => {
  const scrollRef = useRef<ScrollView>(null);

  // const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   const offsetX = e.nativeEvent.contentOffset.x;

  //   const index = getIndex(e.nativeEvent.contentOffset.x);

  //   console.log('index: ', index);
  //   console.log('x: ', offsetX);
  //   scrollRef.current?.scrollTo({
  //     x: cardWidth * index,
  //     animated: true
  //   });
  // }

  const onMomentumScrollBegin = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(getIndex(e.nativeEvent.contentOffset.x));
    console.log('onMomentumScrollBegin: index: ', index);
  }

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  const snapToOffsets = useMemo(() => Array.from(Array(maxIndex), (_, i) => cardWidth * i + ((i - 1 < 0) ? 0 : cardMargin * (i-1))), []);

  return (
    <View>
    <ScrollView
      ref={scrollRef}
      snapToInterval={334}
      snapToOffsets={snapToOffsets} 
      decelerationRate={'fast'} 
      horizontal showsHorizontalScrollIndicator={false} 
      // onScrollEndDrag={onScrollEndDrag} 
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}>
      <Card index={0}></Card>
      <Card index={1}></Card>
      <Card index={2}></Card>
      <Card index={3} last></Card>
    </ScrollView>
    </View>
  )
}