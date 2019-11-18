import { Document } from 'mongoose';

export interface CatDoc extends Document {
  age: number;
  name: string;
  breed: string;
}
