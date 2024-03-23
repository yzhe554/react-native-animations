import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from 'expo-router';
import { useCallback, useMemo, useRef } from 'react';
import { View, Text, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CardList } from '../components/CardList';

export default function CardTab() {
  const height = useHeaderHeight();
  const { top } = useSafeAreaInsets();
  const headerSafeHeigh = useMemo(() => height - top, [height, top]);
  const navigation = useNavigation();

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = e.nativeEvent.contentOffset.y;
      // -4 is when cards is invisible in content
      if (offsetY >= headerSafeHeigh - 4) {
        navigation.setOptions({
          title: 'Cards',
        });
      } else {
        navigation.setOptions({
          title: '',
        });
      }
    },
    [headerSafeHeigh, navigation],
  );

  const onScrollEndDrag = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = e.nativeEvent.contentOffset.y;
      if (offsetY < headerSafeHeigh && offsetY > headerSafeHeigh - 8) {
        scrollRef.current?.scrollTo({
          y: headerSafeHeigh,
          animated: true,
        });
      }
    },
    [headerSafeHeigh],
  );

  const scrollRef = useRef<ScrollView>(null);

  return (
    <ScrollView
      ref={scrollRef}
      scrollEventThrottle={16}
      onScrollEndDrag={onScrollEndDrag}
      onScroll={onScroll}>
      <View
        style={{
          flex: 1,
          height: headerSafeHeigh,
          // paddingTop: 8,
          marginLeft: 16,
          justifyContent: 'flex-end',
        }}>
        <Text style={{ fontSize: 17, fontWeight: '600' }}>Cards</Text>
      </View>
      <View style={{ height: 1000 }}>
        <CardList />
      </View>
    </ScrollView>
  );
}
