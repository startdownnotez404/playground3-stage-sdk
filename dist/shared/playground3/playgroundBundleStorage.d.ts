/** Amplify Storage prefix for compiled playground HTML bundles. */
export declare const PLAYGROUND_BUNDLE_STORAGE_PREFIX = "playground/";
export declare const sanitizePlaygroundBundlePathSegment: (value: string) => string;
/** Object key: playground/{entity_id}/{app_id}.html (matches defineStorage playground/{entity_id}/*). */
export declare const buildPlaygroundBundleStoragePath: (entityId: string, appId: string) => string;
export declare const parsePlaygroundBundleStoragePath: (storagePath: string) => {
    entityId: string;
    appId: string;
} | null;
export declare const isSafePlaygroundBundleStoragePath: (storagePath: string) => boolean;
