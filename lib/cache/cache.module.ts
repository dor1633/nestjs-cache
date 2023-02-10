import {
    DynamicModule,
    flatten,
    Module,
} from '@nestjs/common';
import { AsyncProviderFactory } from '../types/async-provider-factory';
import { CacheMetadata } from '../types/cache-metadata';
import { DEFAULT_CREATED_CACHE } from '.';
import { createAsyncProviders, createProviders } from './cache.providers';

@Module({})
export class CacheModule {
    static register(sendCacheOptions?: CacheMetadata[]): DynamicModule {
        const cacheOptions = sendCacheOptions || DEFAULT_CREATED_CACHE;
        const providers = createProviders(cacheOptions);

        return {
            module: CacheModule,
            providers,
            exports: providers
        };
    }

    static registerAsync(cachesFactories: AsyncProviderFactory[]): DynamicModule {
        const providers = createAsyncProviders(cachesFactories);
        const factoriesImports = cachesFactories.map(factory => factory.imports || []);
        const uniqueImports = new Set(flatten(factoriesImports));

        return {
            module: CacheModule,
            imports: [...uniqueImports],
            providers,
            exports: providers
        };
    }
}
