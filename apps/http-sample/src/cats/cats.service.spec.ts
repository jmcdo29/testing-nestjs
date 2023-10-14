import { HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { TCat } from './entities/cat.entity';

describe('CatsService', () => {
  let service: CatsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            patch: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(CatsService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cats', () => {
    const data: TCat[] = [
      {
        name: 'cat #1',
        age: 10,
        breed: 'Russian',
        id: 1,
      },
      {
        name: 'cat #2',
        age: 5,
        breed: 'Russian',
        id: 2,
      },
    ];

    const response: AxiosResponse<TCat[]> = {
      data,
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl' },
      status: 200,
      statusText: 'OK',
    };

    jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data: [
          {
            name: 'cat #1',
            age: 10,
            breed: 'Russian',
            id: 1,
          },
          {
            name: 'cat #2',
            age: 5,
            breed: 'Russian',
            id: 2,
          },
        ],
        headers: {},
        config: { url: 'http://localhost:3000/mockUrl' },
        status: 200,
        statusText: 'OK',
      }),
    );

    service.findAll().subscribe((res) => {
      expect(res).toEqual(response.data);
    });
  });

  it('should return one cat', () => {
    const data: TCat = {
      name: 'cat #1',
      age: 10,
      breed: 'Russian',
      id: 5,
    };

    const response: AxiosResponse<TCat> = {
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
          age: 10,
          breed: 'Russian',
          id: 5,
        },
        headers: {},
        config: { url: 'http://localhost:3000/mockUrl/1' },
        status: 200,
        statusText: 'OK',
      }),
    );

    service.findOne(5).subscribe((res) => {
      expect(res).toEqual(response.data);
    });
  });

  it('should return a new cat', () => {
    const data: TCat = {
      name: 'cat #1',
      age: 10,
      breed: 'Russian',
      id: 5,
    };

    let createCatDto: CreateCatDto = {
      name: 'cat #1',
      age: 10,
      breed: 'Russian',
    };

    const response: AxiosResponse<TCat> = {
      data,
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl' },
      status: 201,
      statusText: 'OK',
    };

    jest.spyOn(httpService, 'post').mockImplementation(() => of(response));

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

  it('should return a cat update', () => {
    const data: UpdateCatDto = {
      name: 'cat #1',
      age: 10,
      breed: 'Russian',
      id: 5,
    };

    const response: AxiosResponse<UpdateCatDto> = {
      data,
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl/5' },
      status: 200,
      statusText: 'OK',
    };

    jest.spyOn(httpService, 'put').mockImplementation(() =>
      of({
        data: {
          name: 'cat #1',
          age: 10,
          breed: 'Russian',
          id: 5,
        },
        headers: {},
        config: { url: 'http://localhost:3000/mockUrl/5' },
        status: 200,
        statusText: 'OK',
      }),
    );

    service.update(5, data).subscribe((res) => {
      expect(res).toEqual(response.data);
    });
  });

  it('should return remove a cat', () => {
    const data: TCat = {
      name: 'cat #1',
      age: 10,
      breed: 'Russian',
      id: 5,
    };

    const response: AxiosResponse<TCat> = {
      data,
      headers: {},
      config: { url: 'http://localhost:3000/mockUrl/5' },
      status: 204,
      statusText: 'OK',
    };

    jest.spyOn(httpService, 'delete').mockReturnValueOnce(
      of({
        data: {
          name: 'cat #1',
          age: 10,
          breed: 'Russian',
          id: 5,
        },
        headers: {},
        config: { url: 'http://localhost:3000/mockUrl/5' },
        status: 204,
        statusText: 'OK',
      }),
    );

    service.remove(5).subscribe((res) => {
      expect(res).toEqual(response.data);
    });
  });
});
