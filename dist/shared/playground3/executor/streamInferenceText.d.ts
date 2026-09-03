import type { Playground3InferenceStreamChunk } from "./types";
export interface Playground3InferenceStreamOptions {
    text: string;
    onChunk: (chunk: Playground3InferenceStreamChunk) => void | Promise<void>;
    signal?: AbortSignal;
    baseDelayMs?: number;
}
export declare const streamPlayground3InferenceText: (input: Playground3InferenceStreamOptions) => Promise<void>;
