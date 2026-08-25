import 'dotenv/config';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('GET /dashboard/resumo', () => {
    return request(app.getHttpServer())
      .get('/dashboard/resumo')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('gmv');
        expect(response.body).toHaveProperty('orders');
        expect(response.body).toHaveProperty('averageTicket');
      });
  });

  it('GET /dashboard/resumo with date filters', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard/resumo?startDate=2017-01-01&endDate=2017-06-30')
      .expect(200);

    const body = response.body as {
      gmv: number;
      orders: number;
      averageTicket: number;
    };

    expect(body).toHaveProperty('gmv');
    expect(body).toHaveProperty('orders');
    expect(body).toHaveProperty('averageTicket');

    expect(typeof body.gmv).toBe('number');
    expect(typeof body.orders).toBe('number');
    expect(typeof body.averageTicket).toBe('number');
  });

  it('GET /dashboard/resumo with invalid startDate', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard/resumo?startDate=abc')
      .expect(400);

    const body = response.body as {
      statusCode: number;
      message: string[];
    };

    expect(body.statusCode).toBe(400);
    expect(body.message).toContain(
      'startDate must be a valid ISO 8601 date string',
    );
  });

  it('GET /dashboard/gmv/mensal', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard/gmv/mensal')
      .expect(200);

    const body = response.body as {
      month: string;
      gmv: number;
    }[];

    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('month');
    expect(body[0]).toHaveProperty('gmv');
    expect(typeof body[0].gmv).toBe('number');
  });

  it('GET /dashboard/gmv/categoria', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard/gmv/categoria')
      .expect(200);

    const body = response.body as {
      category: string;
      gmv: number;
    }[];

    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('category');
    expect(body[0]).toHaveProperty('gmv');
    expect(typeof body[0].category).toBe('string');
    expect(typeof body[0].gmv).toBe('number');
  });

  it('GET /dashboard/pedidos/status with date filters', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard/pedidos/status?startDate=2017-01-01&endDate=2017-06-30')
      .expect(200);

    const body = response.body as {
      status: string;
      orders: number;
    }[];

    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('status');
    expect(body[0]).toHaveProperty('orders');
    expect(typeof body[0].status).toBe('string');
    expect(typeof body[0].orders).toBe('number');
  });

  it('GET /dashboard/resumo with invalid endDate', async () => {
    const response = await request(app.getHttpServer())
      .get('/dashboard/resumo?endDate=abc')
      .expect(400);

    const body = response.body as {
      statusCode: number;
      message: string[];
    };

    expect(body.statusCode).toBe(400);
    expect(body.message).toContain(
      'endDate must be a valid ISO 8601 date string',
    );
  });

  it('GET /dashboard/gmv/mensal applies date filters', async () => {
    const allResponse = await request(app.getHttpServer())
      .get('/dashboard/gmv/mensal')
      .expect(200);

    const filteredResponse = await request(app.getHttpServer())
      .get('/dashboard/gmv/mensal?startDate=2017-01-01&endDate=2017-06-30')
      .expect(200);

    const all = allResponse.body as {
      month: string;
      gmv: number;
    }[];

    const filtered = filteredResponse.body as {
      month: string;
      gmv: number;
    }[];

    expect(all.length).toBeGreaterThan(filtered.length);

    expect(
      filtered.every((item) => {
        const month = new Date(item.month);
        return month >= new Date('2017-01-01');
      }),
    ).toBe(true);

    expect(
      filtered.every((item) => {
        const month = new Date(item.month);
        return month <= new Date('2017-06-30');
      }),
    ).toBe(true);
  });

  afterEach(async () => {
    await app.close();
  });
});
