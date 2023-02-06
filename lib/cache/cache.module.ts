import {
    DynamicModule,
    flatten,
    Module,
} from '@nestjs/common';
import { ConfigurableModuleClass } from '@nestjs/common/cache/cache.module-definition';
import { AsyncProviderFactory } from 'lib/types/async-provider-factory';
import { CacheMetadata } from 'lib/types/cache-metadata';
import { createAsyncProviders, createProviders } from './cache.providers';
import { DEFAULT_CREATED_CACHE } from './cache.constansts';

@Module({})
export class CacheModule extends ConfigurableModuleClass {
    static register(cacheOptions: CacheMetadata[] = DEFAULT_CREATED_CACHE): DynamicModule {
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
