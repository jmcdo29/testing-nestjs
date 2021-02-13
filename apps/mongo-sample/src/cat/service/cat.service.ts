import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../interface/cat.interface';
import { CatDocument } from '../schema/cat.document';
import { CreateCatDto, UpdateCatDto } from '../dto/cat-dto';

@Injectable()
export class CatService {
  constructor(
    @InjectModel('Cat') private readonly catModel: Model<CatDocument>,
  ) {}

  async getAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async getOne(id: string): Promise<Cat> {
    return this.catModel.findOne({ _id: id }).exec();
  }

  async getOneByName(name: string): Promise<Cat> {
    return this.catModel.findOne({ name }).exec();
  }

  /**
   * I would suggest against using something like `new this.catModel()`
   * because it becomes really _really_ hard to mock.
   * Instead, you can use the class method `create` to achieve
   * the same effect.
   */
  async insertOne(cat: CreateCatDto): Promise<Cat> {
    return this.catModel.create(cat);
  }

  async updateOne(cat: UpdateCatDto): Promise<Cat> {
    const { _id } = cat;
    return this.catModel.findOneAndUpdate({ _id }, cat).exec();
  }

  async deleteOne(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.catModel.remove({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
