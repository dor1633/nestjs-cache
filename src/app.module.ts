import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    CacheModule.register([
      { cacheName: 'cache1', ttl: 100, max: 1 },
      { cacheName: 'cache2', ttl: 30, max: 100 },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
