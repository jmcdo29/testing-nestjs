import { Schema } from 'mongoose';

export const CatSchema = new Schema({
  name: String,
  age: Number,
  breed: String,
});
