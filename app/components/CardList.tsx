import { ScrollView } from "react-native-gesture-handler"
import { Card, cardMargin, cardWidth } from "./Card"
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native"
import { useRef } from "react"

const maxIndex = 2;


// const getIndex = (position: number): number => {
//   if (position >= maxIndex * cardWidth) {
//     return maxIndex;
//   }
//   const baseIndex = Math.floor((position - 16) / (cardWidth + cardMargin));
//   const offsetX = position - baseIndex * (cardWidth + cardMargin);
//   if (offsetX > cardWidth / 2) {
//     return baseIndex + 1;
//   }
//   return baseIndex
// }

export const CardList = () => {
  const scrollRef = useRef<ScrollView>(null);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = e.nativeEvent.contentOffset.x / cardWidth;
    console.log('index: ', index);


  }


  return (
    <ScrollView ref={scrollRef} snapToInterval={334} decelerationRate={'fast'} horizontal showsHorizontalScrollIndicator={false} style={{paddingHorizontal: 16}} onMomentumScrollEnd={onMomentumScrollEnd}>
      <Card index={0}></Card>
      <Card index={1}></Card>
      <Card index={2} last></Card>
    </ScrollView>
  )
}