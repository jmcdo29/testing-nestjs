import { Test, TestingModule } from '@nestjs/testing';
import { PublisherService } from './publisher.service';
import { ClientProxy } from '@nestjs/microservices';
import { PublisherController } from './publisher.controller';
import { EVENT_HUB } from './publisher.type';

describe('PublisherController', () => {
  let publisherController: PublisherController;
  let client: ClientProxy;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PublisherController],
      providers: [
        PublisherService,
        {
          provide: EVENT_HUB,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    publisherController = app.get<PublisherController>(PublisherController);
    client = app.get<ClientProxy>(EVENT_HUB);
  });

  describe('root', () => {
    it('should publish an event to microservice"', () => {
      expect(publisherController.publishEvent()).toMatchInlineSnapshot(`
        {
          "result": {
            "success": true,
          },
        }
      `);
      expect(client.emit).toHaveBeenCalledTimes(1);
    });
  });
});
