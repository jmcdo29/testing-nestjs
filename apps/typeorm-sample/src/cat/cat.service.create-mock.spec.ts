import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CatService } from './cat.service';

describe('CatService using createMock with DI', () => {
  // let service: CatService;
  let repo: Repository<Cat>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CatService,
        {
          provide: getRepositoryToken(Cat),
          useValue: createMock<Repository<Cat>>(),
        },
      ],
    }).compile();

    // service = module.get<CatService>(CatService);
    repo = module.get<Repository<Cat>>(getRepositoryToken(Cat));
  });

  it('should have the repo mocked', () => {
    expect(typeof repo.find).toBe('function');
  });
});

describe('CatService using createMock without DI', () => {
  const repo = createMock<Repository<Cat>>();

  beforeEach(async () => {
    await Test.createTestingModule({
      providers: [
        CatService,
        {
          provide: getRepositoryToken(Cat),
          useValue: repo,
        },
      ],
    }).compile();
  });

  it('should have the repo mocked', async () => {
    const cat = { name: 'cat1', age: 2, breed: 'tabby', id: '1' };
    repo.find.mockResolvedValue([cat]);
    // tslint:disable-next-line: no-invalid-await
    expect(await repo.find()).toEqual([cat]);
  });
});
