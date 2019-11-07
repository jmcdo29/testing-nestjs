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

  constructor(name: string, breed?: string, age?: number, id?: string);
  constructor(name: string, breed: string, age?: number, id?: string);
  constructor(name: string, breed: string, age: number, id?: string);
  constructor(name: string, breed: string, age: number, id: string);
  constructor(name?: string, breed?: string, age?: number, id?: string);
  constructor(name?: string, breed?: string, age?: number, id?: string) {
    this.id = id || '';
    this.name = name || '';
    this.breed = breed || '';
    this.age = age || NaN;
  }
}
