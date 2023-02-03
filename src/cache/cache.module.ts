/* eslint-disable prettier/prettier */
import {
    CacheModuleAsyncOptions,
    CacheModuleOptions,
    DynamicModule,
    Module,
} from '@nestjs/common';
import { ConfigurableModuleClass } from '@nestjs/common/cache/cache.module-definition';
import { createProviders } from './cache.provider';




@Module({})
export class CacheModule extends ConfigurableModuleClass {
    static register(options: Record<string, any>[]): DynamicModule {
        const providers = createProviders(options);
        return {
            // global: options.isGlobal,
            ...super.register(options),
            providers,
            exports: providers
        };
    }

    static registerAsync(
        options: Record<string, any>[],
    ): DynamicModule {
        const moduleDefinition = super.registerAsync(options);
        const providers = createProviders(options);

        return {
            ...moduleDefinition,
            providers,
            exports: providers
        };
    }
}
