import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch } from 'react-native-gesture-handler';

import { SIZE, HEIGHT } from './Config';
import HamburgerIcon from '../../../assets/hamburger-menu-svgrepo-com.svg';
import { Divider } from '../../components/Divider';

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: HEIGHT,
    borderColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});
interface TileProps {
  id: string;
  type: string;
  details?: string;
}

export const Tile = ({ type, details }: TileProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container} pointerEvents="none">
      <View style={{ flex: 1, margin: 16 }}>
        <Text>{type}</Text>
        <Divider
          style={{
            borderTopWidth: 0.5,
            opacity: 0.5,
            marginTop: 4,
            marginBottom: 8,
            marginRight: SIZE / 3,
          }}
        />
        {details ? <Text>{details}</Text> : null}
      </View>
      <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <HamburgerIcon width={40} height={40} />
      </View>
    </View>
  );
};
