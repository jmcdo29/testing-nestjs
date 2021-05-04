import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn().mockReturnValue('Hello, World!'),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello, World!"', () => {
      expect(appController.getHello()).toBe('Hello, World!');
    });
    it('should return "Hello, Name!"', () => {
      appService.getHello = jest.fn().mockReturnValueOnce('Hello, Name!');
      expect(appController.getHello('Name')).toBe('Hello, Name!');
    });
  });
});
