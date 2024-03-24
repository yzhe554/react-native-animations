import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';

import IconTabNavHomeSelected24Logo from '../../assets/iconTabNavHomeSelected24.png';

export const cardMargin = 16;
export const windowWidth = Dimensions.get('window').width;
export const cardWidth = windowWidth - cardMargin * 4;
export const cardHeight = (cardWidth / 16) * 10;

export type CardProps = {
  index: number;
  last?: boolean;
};
export const Card = ({ index, last = false }: CardProps) => {
  const paddingRight = useMemo(() => (last ? cardMargin * 3 : 0), [last]);
  return (
    <View style={{ paddingLeft: 16, paddingRight }}>
      <View
        style={{
          width: cardWidth,
          height: cardHeight,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            // flex: 1,
            zIndex: 1,
            marginHorizontal: 16,
            marginTop: 16,
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
            height: 32,
            alignItems: 'center',
          }}>
          <Image style={{ width: 24, height: 24 }} source={IconTabNavHomeSelected24Logo} />
          <Text style={{}}>5320 4243 4342 5435</Text>
        </View>
        <View
          style={{
            zIndex: 1,
            marginHorizontal: 16,
            marginBottom: 16,
          }}>
          <Text>Debit MasterCard Platinum</Text>
          <Text style={{ marginTop: 8, fontSize: 13, fontWeight: '300' }}>John Snow</Text>
          <Text style={{ fontSize: 13, fontWeight: '300' }}>EXPIRY **/**</Text>
          <Text style={{ fontSize: 13, fontWeight: '300' }}>CVC ***</Text>
        </View>
        <LinearGradient
          // Background Linear Gradient
          colors={['#ECECEC', '#9E9E9E']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: cardHeight,
          }}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 16,
        }}>
        <Text>Complete Access</Text>
        <Text>$1234 Available</Text>
      </View>
    </View>
  );
};
