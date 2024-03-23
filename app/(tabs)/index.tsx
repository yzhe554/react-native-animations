import { useHeaderHeight } from '@react-navigation/elements';
import { useCallback, useMemo, useRef } from 'react';
import { View, Text, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CardList } from '../components/CardList';

export default function CardTab() {
  const height = useHeaderHeight();
  const { top } = useSafeAreaInsets();
  const headerSafeHeigh = useMemo(() => height - top, [height, top]);
  console.log('headerSafeHeigh: ', headerSafeHeigh);

  const onScrollEndDrag = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = e.nativeEvent.contentOffset.y;
      console.log('offsetY: ', offsetY);
      if (offsetY < headerSafeHeigh && offsetY > headerSafeHeigh - 8) {
        console.log('111111');
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
    <ScrollView ref={scrollRef} onScrollEndDrag={onScrollEndDrag}>
      <View
        style={{
          flex: 1,
          height: height - top,
          paddingTop: 8,
          marginLeft: 16,
          justifyContent: 'flex-end',
        }}>
        <Text style={{ fontSize: 17, fontWeight: '600' }}>Cards</Text>
      </View>
      <CardList />
    </ScrollView>
  );
}
