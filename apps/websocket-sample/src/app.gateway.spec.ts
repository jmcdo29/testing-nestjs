import { Test, TestingModule } from '@nestjs/testing';
import { AppGateway } from './app.gateway';

describe('AppGateway', () => {
  let gateway: AppGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppGateway],
    }).compile();

    gateway = module.get<AppGateway>(AppGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('should be able to run gateway.handleMessage', () => {
    expect(gateway.handleMessage({}, { name: 'Test' })).toBe('Hello, Test!');
    expect(gateway.handleMessage({}, {})).toBe('Hello, World!');
  });
});
