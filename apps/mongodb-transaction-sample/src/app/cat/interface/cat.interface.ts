export interface ICat {
  id?: number;
  name: string;
  age: number;
  breed: string;
}

export type TCatPostRes = {
  message: string;
};

export type TCatDeleteRes = TCatPostRes & {
  deleted: boolean;
};
