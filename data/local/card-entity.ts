import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

export type Card = {
  id: string;
  number: string;
  type: string;
  name: string;
  expiry: string;
  cvc: string;
};

@Entity('card')
export class CardEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  number: string;

  @Column('text')
  type: string;

  @Column('text')
  name: string;

  @Column('text')
  expiry: string;

  @Column('text')
  cvc: string;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
