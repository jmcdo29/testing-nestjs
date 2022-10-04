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

  it('should be able to run gateway.handleMessage with default value', () => {
    let response = gateway.handleMessage();
    expect(response).toBe('Hello, World!');
  });
  it('should be able to run gateway.handleMessage with input value', () => {
    let response = gateway.handleMessage({ name: 'Test' });
    expect(response).toBe('Hello, Test!');
  });
});
