import { CacheMetadata } from "../types/cache-metadata";

export const DEFAULT_CACHE_CONFIG = {
    ttl: 5,
    max: 100,
    store: 'memory',
};

export const CACHE_DEFAULT_NAME = "CACHE_INSTANCE";

export const DEFAULT_CREATED_CACHE: CacheMetadata[] = [{
    cacheName: CACHE_DEFAULT_NAME
}]