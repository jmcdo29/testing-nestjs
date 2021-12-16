import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
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
            findAll: jest.fn(() => of([testCat])),
            findOne: jest.fn(() => of(testCat)),
            create: jest.fn(() => of(testCat)),
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
    of(controller.findAll()).subscribe((data) => {
      expect(data).toEqual([testCat]);
    });
  });

  it('should get one cat', () => {
    of(controller.findOne('a id')).subscribe((data) => {
      expect(data).toEqual(testCat);
    });
  });

  it('should make a new cat', () => {
    of(
      controller.create({
        name: 'Test Cat',
        age: 5,
        breed: 'Russian Blue',
      }),
    ).subscribe((data) => {
      expect(data).toEqual(testCat);
    });
  });

  it('should remove a one cat', () => {
    const retVal = controller.remove('a id');
    expect(service.remove).toHaveBeenCalled();
    expect(retVal);
  });
});
