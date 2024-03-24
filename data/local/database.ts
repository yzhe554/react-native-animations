import { DataSource } from 'typeorm';

import { CardEntity } from './card-entity';

export const source = new DataSource({
  database: 'expo.db',
  type: 'expo',
  driver: require('expo-sqlite'),
  entities: [CardEntity],
  synchronize: true,
});
