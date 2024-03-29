import { Stack } from 'expo-router';
import { Image } from 'react-native';

import ControlHelpChat24Logo from '../../../assets/iconControlHelpChat24.png';

export default function CardsLayout() {
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        title: 'Cards',
        headerLargeStyle: {
          backgroundColor: 'yellow',
        },
        headerShadowVisible: false,
        headerLeft: () => <Image style={{ marginRight: 24 }} source={ControlHelpChat24Logo} />,
        headerRight: () => <Image style={{ marginRight: 24 }} source={ControlHelpChat24Logo} />,
      }}
    />
  );
}
