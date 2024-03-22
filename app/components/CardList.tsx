import { Directions, Gesture, GestureDetector, GestureEvent, HandlerStateChangeEvent, ScrollView } from "react-native-gesture-handler"
import { Card, cardMargin, cardWidth } from "./Card"
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native"
import { useMemo, useRef, useState } from "react"
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

const getOffsetByIndex = (i: number): number => cardWidth * i + ((i - 1 < 0) ? 0 : cardMargin * (i-1))

export const CardList = () => {
  const scrollRef = useRef<ScrollView>(null);

  const [currentIndex, setCurrentIndex] = useState(0);


  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = getIndex(e.nativeEvent.targetContentOffset?.x ?? 0);

    setCurrentIndex(index);

    console.log('index: ', index);
    // console.log('x: ', offsetX);
    // scrollRef.current?.scrollTo({
    //   x: cardWidth * index,
    //   animated: true
    // });
  }

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = getIndex(e.nativeEvent.contentOffset.x);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  const snapToOffsets = useMemo(() => Array.from(Array(maxIndex), (_, i) => getOffsetByIndex(i)), []);

  const onCancelled = (event: HandlerStateChangeEvent) => {
    console.log('event: ', event);
  }

  return (
    <View>
    <ScrollView
      ref={scrollRef}
      onCancelled={onCancelled}
      // snapToInterval={20}
      snapToOffsets={snapToOffsets} 
      decelerationRate={'fast'} 
      horizontal showsHorizontalScrollIndicator={false} 
      onScrollEndDrag={onScrollEndDrag} 
      onMomentumScrollEnd={onMomentumScrollEnd}
    >
      <Card index={0}></Card>
      <Card index={1}></Card>
      <Card index={2}></Card>
      <Card index={3} last></Card>
    </ScrollView>
    <SliderIndicator totalCount={maxIndex + 1} index={currentIndex} />
    </View>
  )
}