export class Cat {
  name: string;
  age: number;
  breed: string;
}

export type TCat = Cat & { id: number };
