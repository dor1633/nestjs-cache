import { Provider } from '@nestjs/common';
import { caching } from 'cache-manager'

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
