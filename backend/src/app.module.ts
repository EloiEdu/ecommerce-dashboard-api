import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        const redisHost = process.env.REDIS_HOST ?? 'localhost';
        const redisPort = process.env.REDIS_PORT ?? '6379';
        const redisStore = createKeyv(`redis://${redisHost}:${redisPort}`);

        redisStore.on('error', (error) => {
          console.error('Redis cache error:', error);
        });

        return {
          stores: [redisStore],
          ttl: 300_000,
        };
      },
    }),
    DashboardModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
