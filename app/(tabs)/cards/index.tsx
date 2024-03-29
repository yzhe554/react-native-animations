import { useRef } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { CardList } from '../../components/CardList';

export default function CardTab() {
  const scrollRef = useRef<ScrollView>(null);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" ref={scrollRef} scrollEventThrottle={16}>
      <View style={{ height: 1000 }}>
        <CardList />
      </View>
    </ScrollView>
  );
}
