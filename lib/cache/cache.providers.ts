import { Provider } from '@nestjs/common';
import { caching } from 'cache-manager'
import { AsyncProviderFactory } from 'lib/types/async-provider-factory';

export function createProviders(configs: Record<string, any>[]): Provider[] {
    return configs.map((config) => {
        return {
            provide: config.cacheName,
            useFactory: () => {
                return caching(config)
            }
        }
    });
}

export function createAsyncProviders(configs: AsyncProviderFactory[]): Provider[] {
    return configs.map(config => {
        return {
            provide: config.cacheName,
            useFactory: async (...args: any) => {
                const conf = await config.useFactory(...args)
                return caching(conf);
            },
            inject: [...(config.inject || [])]
        };
    })
}
