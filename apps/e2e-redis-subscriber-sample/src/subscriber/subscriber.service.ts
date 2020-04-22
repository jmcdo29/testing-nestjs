import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogDocument, LOG_SCHEMA } from './subscriber.type';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectModel(LOG_SCHEMA) private readonly logModel: Model<LogDocument>,
  ) {}

  create(logData: object) {
    const log = new this.logModel({
      data: logData,
    });
    return log.save();
  }

  getAll() {
    return this.logModel.find({}).exec();
  }
}
