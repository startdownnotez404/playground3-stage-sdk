export type Playground3PersistPath = "dynamo" | "appsync" | "none";
export type Playground3SettleSource = "job" | "subscription";
export type Playground3TokenSummary = {
    input?: number;
    output?: number;
    total?: number;
    cached?: number;
    cacheWrite?: number;
    provider?: string;
    /** Provider raw usage (OpenAI prompt_tokens_details, etc.). */
    apiTokenUsageRaw?: Record<string, unknown>;
    /** Wall-clock ms for this inference/spawn call (client-measured). */
    durationMs?: number;
    /** FE emit → backend handler receive (ms). */
    frontendToBackendMs?: number;
    /** Full provider runInference round-trip as backend sees it (ms). */
    providerDurationMs?: number;
    /** Async: start accepted → queued worker start (ms). */
    queueMs?: number;
    /**
     * Provider finished on BE → client received final resultJson (ms).
     * Computed on the client from `providerFinishedAtMs`.
     */
    backendToFrontendMs?: number;
    /** BE: providerFinishedAtMs → persistStartedAtMs / finalEmittedAtMs (ms). */
    postApiMs?: number;
    /** BE persist job write duration (ms). */
    persistMs?: number;
    /** Which job-write path ran on the worker. */
    persistPath?: Playground3PersistPath;
    /** BE AppSync final mutation duration (ms). */
    emitMs?: number;
    /** Successful non-final emitPlayground3Chunk count. */
    deltaEmitCount?: number;
    /** Sum of delta mutation await RTTs (ms). */
    deltaEmitSumMs?: number;
    /** Average delta mutation await RTT (ms). */
    deltaEmitAvgMs?: number;
    /** Max delta mutation await RTT (ms). */
    deltaEmitMaxMs?: number;
    /** Average delta payload size (content + resultJson chars). */
    deltaEmitBytesAvg?: number;
    /** Time awaiting in-flight delta emitChain before final publish (ms). */
    emitDrainMs?: number;
    /** isFinal emitPlayground3Chunk mutation await RTT only (ms). */
    finalEmitMs?: number;
    /** Final chunk payload size (content + resultJson chars). */
    finalEmitBytes?: number;
    /**
     * Notify/read after the winning settle path became ready (ms).
     * job → arrived - persistFinishedAtMs;
     * subscription → arrived - finalPublishStartedAtMs (fallback: emitStartedAtMs).
     * Same-clock caveat: mixes client arrival with BE epoch stamps.
     */
    deliverMs?: number;
    /** Which race leg settled the client. */
    settleSource?: Playground3SettleSource;
    /** Client: final arrival → settle after UI apply (ms). */
    clientApplyMs?: number;
    /**
     * Epoch ms when the backend finished the provider call (opaque hop stamp).
     * Used client-side to derive BE→FE slices; dropped after conversion.
     */
    providerFinishedAtMs?: number;
    /**
     * Epoch ms when the backend started the completion path (persist start).
     * Used client-side to derive postApi / gross deliver; dropped after conversion.
     */
    finalEmittedAtMs?: number;
    /** Opaque: persistJob start. Dropped after conversion. */
    persistStartedAtMs?: number;
    /** Opaque: persistJob finish. Dropped after conversion. */
    persistFinishedAtMs?: number;
    /** Opaque: emitFinal start. Dropped after conversion. */
    emitStartedAtMs?: number;
    /** Opaque: emitFinal finish. Dropped after conversion. */
    emitFinishedAtMs?: number;
    /**
     * Opaque: after drain, immediately before isFinal publish.
     * Subscription deliverMs = clientArrival - this (excludes drain).
     * Dropped after conversion.
     */
    finalPublishStartedAtMs?: number;
};
/** Format inference duration for chips / audit titles (e.g. `842ms`, `1.24s`). */
export declare const formatPlayground3DurationMs: (value: number | undefined) => string | null;
/** Token-chip style tooltip: `FE→BE … · Queue … · API … · BE→FE … · Total …`. */
export declare const formatPlayground3DurationHopTooltip: (tokens: Pick<Playground3TokenSummary, "durationMs" | "frontendToBackendMs" | "providerDurationMs" | "queueMs" | "backendToFrontendMs"> | null | undefined) => string | null;
/** Tool chip tooltip: `Tool 0.45s` or `Tool chess.commitAiMove 0.45s`. */
export declare const formatPlayground3ToolDurationTooltip: (durationMs: number | undefined, toolName?: string) => string | null;
export declare const resolvePlayground3CachedTokensFromRawUsage: (rawUsage?: Record<string, unknown>) => number | undefined;
export declare const resolvePlayground3CacheWriteTokensFromRawUsage: (rawUsage?: Record<string, unknown>) => number | undefined;
export declare const normalizePlayground3TokenSummary: (value: Playground3TokenSummary | null | undefined) => Playground3TokenSummary | undefined;
/** Attach client wall-clock duration onto an inference token summary. */
export declare const withPlayground3InferenceDuration: (tokens: Playground3TokenSummary | null | undefined, durationMs: number) => Playground3TokenSummary;
/** Read clientEmittedAt ISO from optionsJson (opaque hop timing field). */
export declare const readPlayground3ClientEmittedAtMs: (optionsJson?: string | null) => number | undefined;
export declare const computePlayground3FrontendToBackendMs: (clientEmittedAtMs: number | undefined, backendReceivedAtMs: number) => number | undefined;
/** Merge hop timings into a tokens payload object (for tokensJson). */
export declare const mergePlayground3TokenHopTimings: (tokens: unknown, hops: {
    frontendToBackendMs?: number;
    providerDurationMs?: number;
    queueMs?: number;
    providerFinishedAtMs?: number;
    finalEmittedAtMs?: number;
    persistStartedAtMs?: number;
    persistFinishedAtMs?: number;
    emitStartedAtMs?: number;
    emitFinishedAtMs?: number;
    finalPublishStartedAtMs?: number;
    persistMs?: number;
    persistPath?: Playground3PersistPath;
    emitMs?: number;
    deltaEmitCount?: number;
    deltaEmitSumMs?: number;
    deltaEmitAvgMs?: number;
    deltaEmitMaxMs?: number;
    deltaEmitBytesAvg?: number;
    emitDrainMs?: number;
    finalEmitMs?: number;
    finalEmitBytes?: number;
    backendToFrontendMs?: number;
    postApiMs?: number;
    deliverMs?: number;
    settleSource?: Playground3SettleSource;
    clientApplyMs?: number;
}) => Record<string, unknown>;
/**
 * Derive BE→FE slices at client final-arrival time.
 * Drops absolute BE epoch stamps once converted.
 *
 * Subscription deliver prefers skew-free `clientDeliverMs` (last non-final → final
 * on the browser clock), then server `finalEmitMs`. Cross-clock
 * (clientArrival − BE epoch) is not used — it was the fake ~800ms.
 */
export declare const withPlayground3BackendToFrontendMs: (tokens: Playground3TokenSummary | null | undefined, clientFinalArrivedAtMs?: number, clientSettledAtMs?: number, settleSource?: Playground3SettleSource, clientDeliverMs?: number) => Playground3TokenSummary | undefined;
export declare const sumPlayground3TokenSummaries: (...values: Array<Playground3TokenSummary | null | undefined>) => Playground3TokenSummary | undefined;
export declare const sumPlayground3AgentLoopStepTokens: (steps: ReadonlyArray<{
    inference?: {
        tokens?: Playground3TokenSummary;
    };
    spawnedSubagents?: ReadonlyArray<{
        tokens?: Playground3TokenSummary;
    }>;
}>) => Playground3TokenSummary | undefined;
