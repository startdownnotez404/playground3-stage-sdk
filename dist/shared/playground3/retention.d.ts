export declare const computePlayground3ExpiresAtSeconds: (input: {
    days?: number;
    hours?: number;
    fromMs?: number;
}) => number;
export declare const computePlayground3SupersededClientStateCheckpointExpiresAt: () => number;
export declare const computePlayground3ExecutorCheckpointExpiresAt: () => number;
/**
 * Oldest-first eviction: rows missing timestamps sort oldest so legacy rows
 * are reclaimed first. `keepId` (the just-created checkpoint) is never evicted.
 */
export declare const selectPlayground3FifoEvictionIds: (input: {
    checkpoints: Array<{
        id: string;
        submittedAt?: string | null;
    }>;
    maxCount: number;
    keepId?: string;
}) => string[];
