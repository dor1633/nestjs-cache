import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject('cache1') private cache1: Cache,
    @Inject('cache2') private cache2: Cache) {
  }
  async put(cacheName: string, key: any, value: any) {
    await this[cacheName].set(key, value);
    return 'Hello World!';
  }

  async get(cacheName: string, key: any) {
    return this[cacheName].get(key);
  }

  async getKeys(cacheName: string) {
    return this[cacheName].keys();
  }
}
