import { Document } from 'mongoose';

export const EVENT_HUB = 'EVENT_HUB';
export const LOG_SCHEMA = 'Log';

export type Log = {
  data: any;
};

export type LogDocument = Log & Document;
