import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

const testCat = { id: 1, name: 'Test cat', age: 5, breed: 'Russian Blue' };

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        {
          provide: CatsService,
          useValue: {
            findAll: jest.fn(() => [testCat]),
            findOne: jest.fn(() => testCat),
            create: jest.fn(() => testCat),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get the cats', async () => {
    expect(await controller.findAll()).toEqual([testCat]);
  });

  it('should get one cat', async () => {
    expect(await controller.findOne('a id')).toEqual(testCat);
  });

  it('should make a new cat', async () => {
    expect(
      await controller.create({
        name: 'Test Cat',
        age: 5,
        breed: 'Russian Blue',
      }),
    ).toEqual(testCat);
  });

  it('should remove a one cat', async () => {
    const retVal = controller.remove('a id');
    expect(service.remove).toHaveBeenCalled();
    expect(retVal);
  });
});
