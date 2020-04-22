import * as mongoose from 'mongoose';
import { LogDocument } from './subscriber.type';

export const LogSchema = new mongoose.Schema<LogDocument>(
  {
    data: {},
  },
  {
    timestamps: true,
  },
);
