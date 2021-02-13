import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Cat } from '../interface/cat.interface';

@Schema()
export class CatDocument extends Document implements Cat {
  @Prop()
  age: number;

  @Prop()
  name: string;

  @Prop()
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(CatDocument);
