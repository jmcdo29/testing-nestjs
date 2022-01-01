import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column({ type: 'int' })
  age: number;

  constructor(name: string, breed?: string, age?: number);
  constructor(name: string, breed: string, age?: number);
  constructor(name: string, breed: string, age: number);
  constructor(name?: string, breed?: string, age?: number);
  constructor(name?: string, breed?: string, age?: number) {
    this.name = name || '';
    this.breed = breed || '';
    this.age = age || NaN;
  }
}
