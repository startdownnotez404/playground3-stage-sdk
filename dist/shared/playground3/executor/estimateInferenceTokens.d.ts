import type { Playground3ChatMessage, Playground3InferenceResult } from "./types";
/**
 * Frontend char/4 estimate for fake/scripted inference that has no provider usage.
 * Remote adapters must keep API `tokens` — do not overwrite those with this helper.
 */
export declare const estimatePlayground3InferenceTokens: (input: {
    messages: ReadonlyArray<Playground3ChatMessage>;
    content?: string | null;
    streamText?: string | null;
}) => NonNullable<Playground3InferenceResult["tokens"]>;
export declare const withEstimatedPlayground3InferenceTokens: (response: Playground3InferenceResult, messages: ReadonlyArray<Playground3ChatMessage>) => Playground3InferenceResult;
