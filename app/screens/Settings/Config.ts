import { Dimensions } from 'react-native';
import { Easing } from 'react-native-reanimated';

export interface Positions {
  [id: string]: number;
}

const { width } = Dimensions.get('window');
export const MARGIN = 16;
export const SIZE = width - MARGIN * 2;
export const HEIGHT = 72;
export const COL = 1;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};

export const getPosition = (position: number) => {
  'worklet';

  return {
    x: position % COL === 0 ? 0 : SIZE * (position % COL),
    y: Math.floor(position / COL) * HEIGHT,
  };
};

export const getOrder = (ty: number, max: number) => {
  'worklet';

  const y = Math.round(ty / HEIGHT) * HEIGHT;
  const row = Math.max(y, 0) / HEIGHT;
  return Math.min(row * COL, max);
};
