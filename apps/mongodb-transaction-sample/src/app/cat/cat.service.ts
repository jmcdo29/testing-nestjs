import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, startSession } from 'mongoose';
import { CatDoc } from './interface/cat-doc';
import { ICat, TCatDeleteRes, TCatPostRes } from './interface/cat.interface';
@Injectable()
export class CatService {
  private session: ClientSession;
  constructor(@InjectModel('Cat') private readonly catModel: Model<CatDoc>) {}

  async getAll(): Promise<ICat[]> {
    return await this.catModel.find().lean();
  }

  async addCat(cat: ICat): Promise<TCatPostRes> {
    try {
      this.session = await startSession({
        defaultTransactionOptions: {
          readConcern: { level: 'local' },
          writeConcern: { w: 'majority' },
        },
      });
      await this.session.withTransaction(async () => {
        return await this.catModel.create(cat);
      });

      return { message: 'Cat created successfully!' };
    } catch (error) {
      await this.session.endSession();
      throw new Error('Transaction cancel!');
    }
  }

  async updateCat(cat: Partial<ICat>): Promise<ICat> {
    let updatedCat: ICat;
    try {
      this.session = await startSession({
        defaultTransactionOptions: {
          readConcern: { level: 'local' },
          writeConcern: { w: 'majority' },
        },
      });
      await this.session.withTransaction(async () => {
        updatedCat = await this.catModel.findOneAndUpdate(
          { _id: cat.id },
          cat,
          { new: true },
        );
      });

      return updatedCat;
    } catch (error) {
      await this.session.endSession();
      throw new Error('Transaction cancel!');
    }
  }

  async deleteCat(id: string): Promise<TCatDeleteRes> {
    try {
      this.session = await startSession({
        defaultTransactionOptions: {
          readConcern: { level: 'local' },
          writeConcern: { w: 'majority' },
        },
      });
      await this.session.withTransaction(async () => {
        await this.catModel.findOneAndRemove({ _id: id });
      });

      return { deleted: true, message: 'Cat Deleted!' };
    } catch (error) {
      await this.session.endSession();
      throw new Error('Transaction cancel!');
    }
  }
}
