import { Cat, UUID } from '../../graphql/protocol.schema';

export class CatDTO extends Cat {
  constructor(args: { id: UUID; name: string; age?: number; breed?: string }) {
    super();

    const { id, name, breed, age } = args;

    this.id = id;
    this.name = name;
    this.age = age || undefined;
    this.breed = breed || undefined;
  }
}
