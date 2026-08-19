import 'dotenv/config';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
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

  afterEach(async () => {
    await app.close();
  });
});
