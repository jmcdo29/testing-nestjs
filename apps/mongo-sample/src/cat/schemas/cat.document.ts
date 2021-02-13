import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Cat } from '../interfaces/cat.interface';

@Schema({ versionKey: false })
export class CatDocument extends Document implements Cat {
  @Prop()
  age: number;

  @Prop()
  name: string;

  @Prop()
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(CatDocument);
