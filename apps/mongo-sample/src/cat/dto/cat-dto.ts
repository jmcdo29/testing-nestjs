import { Cat } from '../interface/cat.interface';

export type CreateCatDto = Readonly<Cat>;

export type UpdateCatDto = CreateCatDto & Readonly<{ _id: string }>;
