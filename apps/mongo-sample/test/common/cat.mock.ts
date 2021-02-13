import { Mock } from 'mockingbird-ts';
import { Cat } from '../../src/cat/interfaces/cat.interface';

export class CatMock implements Cat {
  @Mock((faker) => faker.name.firstName())
  name: string;

  @Mock((faker) => faker.random.number(15))
  age: number;

  @Mock()
  breed: string;
}
