import {
    DynamicModule,
    flatten,
    Module,
} from '@nestjs/common';
import { ConfigurableModuleClass } from '@nestjs/common/cache/cache.module-definition';
import { AsyncProviderFactory } from 'lib/types/async-provider-factory';
import { CacheMetadata } from 'lib/types/cache-metadata';
import { createAsyncProviders, createProviders } from './cache.providers';

@Module({})
export class CacheModule extends ConfigurableModuleClass {
    static register(options: CacheMetadata[]): DynamicModule {
        const providers = createProviders(options);
        return {
            ...super.register(options),
            providers,
            exports: providers
        };
    }

    static registerAsync(factories: AsyncProviderFactory[]): DynamicModule {
        const providers = createAsyncProviders(factories);
        const factoriesImports = factories.map(factory => factory.imports || []);
        const uniqImports = new Set(flatten(factoriesImports));
        return {
            ...super.register(factories),
            imports: [...uniqImports],
            providers,
            exports: providers
        };
    }
}
