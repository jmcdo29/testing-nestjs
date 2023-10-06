import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, startSession } from 'mongoose';
import { CatDoc } from './interface/cat-doc';
import { ICat } from './interface/cat.interface';
@Injectable()
export class CatService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<CatDoc>) {}

  async getAll(): Promise<ICat[]> {
    return [];
    // return await this.catModel.find().lean();
  }

  async addCat(cat: ICat): Promise<ICat> {
    // initiate transaction,
    const session = await startSession({
      defaultTransactionOptions: {
        // readPreference:  {mode: 'primary', },
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' },
      },
    });

    try {
      const res = (await session.withTransaction(async () => {
        return await this.catModel.create(cat);
      })) as ICat;

      return res;
    } catch (error) {
      await session.endSession();
      throw new Error('Transaction cancel!');
    }
  }
}
