import {
    DynamicModule,
    flatten,
    Module,
} from '@nestjs/common';
import { ConfigurableModuleClass } from '@nestjs/common/cache/cache.module-definition';
import { AsyncProviderFactory } from '../types/async-provider-factory';
import { CacheMetadata } from '../types/cache-metadata';
import { DEFAULT_CREATED_CACHE } from '.';
import { createAsyncProviders, createProviders } from './cache.providers';

@Module({})
export class CacheModule extends ConfigurableModuleClass {
    static register(sendCacheOptions?: CacheMetadata[]): DynamicModule {
        const cacheOptions = sendCacheOptions || DEFAULT_CREATED_CACHE;
        const providers = createProviders(cacheOptions);

        return {
            ...super.register(cacheOptions),
            providers,
            exports: providers
        };
    }

    static registerAsync(cachesFactories: AsyncProviderFactory[]): DynamicModule {
        const providers = createAsyncProviders(cachesFactories);
        const factoriesImports = cachesFactories.map(factory => factory.imports || []);
        const uniqueImports = new Set(flatten(factoriesImports));

        return {
            ...super.register(cachesFactories),
            imports: [...uniqueImports],
            providers,
            exports: providers
        };
    }
}
