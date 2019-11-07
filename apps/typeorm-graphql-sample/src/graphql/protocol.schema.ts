/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CreateCatInput {
  name: string;
  age?: number;
}

export class Cat {
  id: UUID;
  name: string;
  breed?: string;
  age?: number;
}

export abstract class IMutation {
  abstract createCat(createCatInput?: CreateCatInput): Cat | Promise<Cat>;
}

export abstract class IQuery {
  abstract getAll(): Cat[] | Promise<Cat[]>;

  abstract Cat(id: UUID): Cat | Promise<Cat>;
}

export type DateTime = any;
export type JSON = any;
export type UUID = any;
