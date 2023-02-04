import { ModuleMetadata } from "@nestjs/common";

export interface AsyncProviderFactory
    extends Pick<ModuleMetadata, 'imports'> {
    cacheName: string;
    useFactory: (
        ...args: any[]
    ) => Record<string, any>;
    inject?: any[];
}