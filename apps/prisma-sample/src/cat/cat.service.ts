import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Cat } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CatDTO } from './cat.dto';

@Injectable()
export class CatService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Cat[]> {
    return this.prisma.cat.findMany();
  }

  async getOne(id: string): Promise<Cat> {
    return this.prisma.cat.findUnique({
      where: { id },
    });
  }

  async getOneByName(name: string): Promise<Cat> {
    const cat = await this.prisma.cat.findFirst({
      where: { name },
    });

    if (!cat) {
      throw new NotFoundException('Cat not found');
    }

    return cat;
  }

  async insertOne(cat: CatDTO): Promise<Cat> {
    const newCat = this.prisma.cat.create({
      data: cat,
    });
    return newCat;
  }

  async updateOne(cat: CatDTO): Promise<Cat> {
    const { id, ...catAttributes } = cat;

    return this.prisma.cat.update({
      data: catAttributes,
      where: { id },
    });
  }

  async deleteOne(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.prisma.cat.delete({ where: { id } });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
