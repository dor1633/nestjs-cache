import { Provider } from '@nestjs/common';
import { caching } from 'cache-manager'
import { AsyncProviderFactory } from '../types/async-provider-factory';
import { CacheMetadata } from '../types/cache-metadata';
import { DEFAULT_CACHE_CONFIG } from './cache.constansts';

export function createProviders(cachesOptions: CacheMetadata[]): Provider[] {
    return cachesOptions.map(cacheOptions => {
        return {
            provide: cacheOptions.cacheName,
            useFactory: () => {
                return caching({ ...DEFAULT_CACHE_CONFIG, ...cacheOptions })
            }
        }
    });
}

export function createAsyncProviders(cachesFactories: AsyncProviderFactory[]): Provider[] {
    return cachesFactories.map(cacheFactory => {
        return {
            provide: cacheFactory.cacheName,
            useFactory: async (...args: any) => {
                const cacheOptions = await cacheFactory.useFactory(...args)
                return caching({ ...DEFAULT_CACHE_CONFIG, ...cacheOptions });
            },
            inject: [...(cacheFactory.inject || [])]
        };
    })
}
