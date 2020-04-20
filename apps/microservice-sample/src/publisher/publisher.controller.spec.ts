import { Test, TestingModule } from '@nestjs/testing';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';

describe('PublisherController', () => {
  let publisherController: PublisherController;
  let publisherService: PublisherService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PublisherController],
      providers: [
        {
          provide: PublisherService,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    publisherController = app.get<PublisherController>(PublisherController);
    publisherService = app.get<PublisherService>(PublisherService);
  });

  describe('root', () => {
    it('should publish an event to microservice"', () => {
      expect(publisherController.publishEvent()).toMatchInlineSnapshot(`
        Object {
          "success": true,
        }
      `);
      expect(publisherService.publish).toHaveBeenCalledTimes(1);
    });
  });
});
