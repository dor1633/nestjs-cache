import {
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
            ...super.register(options),
            providers,
            exports: providers
        };
    }
}
