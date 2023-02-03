import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('dor')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello(@Query('cacheName') cacheName: string, @Query('key') key: string, @Query('value') value: string) {
    const res = await this.appService.get(cacheName, key);

    return res;
  }

  @Post()
  async putHello(@Query('cacheName') cacheName: string, @Query('key') key: string, @Query('value') value: string) {
    const res = await this.appService.put(cacheName, key, value);


    return this.appService.getKeys(cacheName);
  }
}
