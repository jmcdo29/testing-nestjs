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

  it('should get the cats', () => {
    expect(controller.findAll()).toEqual([testCat]);
  });

  it('should get one cat', () => {
    expect(controller.findOne('a id')).toEqual(testCat);
  });

  it('should make a new cat', () => {
    expect(
      controller.create({
        name: 'Test Cat',
        age: 5,
        breed: 'Russian Blue',
      }),
    ).toEqual(testCat);
  });

  it('should remove a one cat', () => {
    const retVal = controller.remove('a id');
    expect(service.remove).toHaveBeenCalled();
    expect(retVal);
  });
});
