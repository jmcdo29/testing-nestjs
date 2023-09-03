import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatDTO } from './cat.dto';
import { CatDoc } from './interfaces/cat-document.interface';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<CatDoc>) {}

  async getAll(): Promise<Cat[]> {
    const catDocs = await this.catModel.find().exec();
    return catDocs.map((doc) => ({
      id: doc._id,
      age: doc.age,
      name: doc.name,
      breed: doc.breed,
    }));
  }

  async getOne(id: string): Promise<Cat> {
    const cat = await this.catModel.findOne({ _id: id }).exec();
    return {
      id: cat._id,
      age: cat.age,
      breed: cat.breed,
      name: cat.name,
    };
  }

  async getOneByName(name: string): Promise<Cat> {
    const cat = await this.catModel.findOne({ name }).exec();
    return {
      id: cat._id,
      age: cat.age,
      breed: cat.breed,
      name: cat.name,
    };
  }

  /**
   * I would suggest against using something like `new this.catModel()`
   * because it becomes really _really_ hard to mock.
   * Instead, you can use the class method `create` to achieve
   * the same effect.
   */
  async insertOne(cat: CatDTO): Promise<Cat> {
    const retCat = await this.catModel.create(cat);
    return {
      id: retCat._id,
      age: retCat.age,
      name: retCat.name,
      breed: retCat.breed,
    };
  }

  async updateOne(cat: CatDTO): Promise<Cat> {
    const { _id } = cat;
    const foundCat = await this.catModel.findOneAndUpdate({ _id }, cat).exec();
    return {
      id: foundCat._id,
      age: foundCat.age,
      breed: foundCat.breed,
      name: foundCat.name,
    };
  }

  async deleteOne(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      // tslint:disable-next-line: no-invalid-await
      await this.catModel.remove({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
