import { CacheMetadata } from "lib/types/cache-metadata";

export const DEFAULT_CACHE_CONFIG = {
    ttl: 5,
    max: 100,
    store: 'memory',
};

export const DEFAULT_CACHE_NAME = "CACHE_INSTANCE";

export const DEFAULT_CREATED_CACHE: CacheMetadata[] = [{
    cacheName: DEFAULT_CACHE_NAME
}]