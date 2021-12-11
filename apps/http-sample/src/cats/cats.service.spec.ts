import { HttpService, HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CreateCatDto } from './dto/create-cat.dto';

describe('CatsService', () => {
  let service: CatsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CatsService,
        {
          provide: CatsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cats', async () => {
    const data = {};

    const response: AxiosResponse<any> = {
      data,
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl' },
      status: 200,
      statusText: 'OK',
    };

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(of({ data: require('../../cats.json') }) as any);

    httpService.get('http://localhost:3000/mockUrl').subscribe((res) => {
      expect(res).toEqual(response);
    });
  });

  it('should return one cat', async () => {
    const data = {
      name: 'cat #1',
      age: '10',
      breed: 'Russian',
      id: 5,
    };

    const response: AxiosResponse<any> = {
      data,
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl/1' },
      status: 200,
      statusText: 'OK',
    };

    jest.spyOn(httpService, 'get').mockReturnValueOnce(
      of({
        data: {
          name: 'cat #1',
          age: '10',
          breed: 'Russian',
          id: 5,
        },
      }) as any,
    );

    httpService.get('http://localhost:3000/mockUrl/1').subscribe((res) => {
      expect(res).toEqual(response);
    });
  });

  it('should return a new cat', async () => {
    const data = {
      name: 'cat #1',
      age: 10,
      breed: 'Russian',
      id: 5,
    };

    let createCatDto: any = {
      name: 'cat #1',
      age: 10,
      breed: 'Russian',
    };

    const response: AxiosResponse<any> = {
      data,
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl' },
      status: 201,
      statusText: 'OK',
    };

    const newCat = jest
      .spyOn(httpService, 'post')
      .mockImplementationOnce(of(response) as any);

    service.create(createCatDto).subscribe({
      next: (val) => {
        createCatDto = val;
      },
      error: (err) => {
        throw err;
      },
      complete: () => {
        expect(data);
      },
    });
  });

  it('should return a cat update', async () => {
    const data = {
      name: 'cat #1',
      age: '10',
      breed: 'Russian',
      id: 5,
    };

    const response: AxiosResponse<any> = {
      data,
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl/5' },
      status: 200,
      statusText: 'OK',
    };

    jest.spyOn(httpService, 'put').mockImplementationOnce(
      of({
        data: {
          name: 'cat #1',
          age: '10',
          breed: 'Russian',
          id: 5,
        },
      }) as any,
    );

    httpService
      .put('http://localhost:3000/mockUrl/5', data)
      .subscribe((res) => {
        expect(res).toEqual(response);
      });
  });

  it('should return remove a cat', async () => {
    const data = {
      name: 'cat #1',
      age: '10',
      breed: 'Russian',
      id: 5,
    };

    const response: AxiosResponse<any> = {
      data,
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl/5' },
      status: 200,
      statusText: 'OK',
    };

    jest.spyOn(httpService, 'delete').mockReturnValueOnce(
      of({
        data: {
          name: 'cat #1',
          age: '10',
          breed: 'Russian',
          id: 5,
        },
      }) as any,
    );

    httpService.delete('http://localhost:3000/mockUrl/5').subscribe((res) => {
      expect(res).toBeUndefined();
    });
  });
});
