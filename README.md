# nestjs-cache

Flexible cache module for NestJS.

## motivation

Nest is a very flexible framework, but there is a problem in the cache soloution that Nest gives us: nest gives us the option to inject only **one** cache instance called `CACHE_MANAGER`, but what if we want multiple caches with diffrent configurations per cache? or just make the caches SRP.

## Installation

```
npm i nestjs-cache
```

## API

```typescript
import { CacheModule } from 'nestjs-cache'

@Module({
  imports: [
        CacheModule.register([{
            cacheName: "USERS_CACHE"
            ttl: 30,
            max: 100
        },
        {
            cacheName: "ENTITIES_CACHE"
        }]),
    ],
})
export class ExampleModule {}
```

Or in different modules:

```typescript
import { CacheModule } from 'nestjs-cache'

@Module({
  imports: [
        CacheModule.register([{
            cacheName: "USERS_CACHE"
            ttl: 30,
            max: 100
        }
    ],
})
export class UsersModule

@Module({
  imports: [
        CacheModule.register([{
            cacheName: "ENTITIES_CACHE"
            ttl: 30,
        }
    ],
})
export class EntitiesModule
```

You can use also `registerAsync`:

```typescript
CacheModule.registerAsync([{
  cacheName: "ASYNC_CACHE_EXAMPLE"
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    ttl: configService.get('CACHE_TTL'),
  }),
  inject: [ConfigService],
}]);
```

And then to inject the cache:

```typescript
constructor(@Inject("YOUR_CACHE_NAME") private cacheManager: Cache) {}
```

### default behaviors

Empty call to `register`:

```typescript
CacheModule.register();
```

will inject `CACHE_DEFAULT_NAME`

\
\
The default config for every cache is exactlly like original cache module of Nest:

```typescript
{
    ttl: 5,
    max: 100,
    store: 'memory'
}
```
