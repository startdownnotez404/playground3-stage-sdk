import type { ProviderConfig } from "../../PROVIDER_CONFIGs";
import type { InferenceProviderSession } from "../../../amplifyChatTypes";
import type { Playground3InferenceAdapter } from "./types";
import { type Playground3SettleSource } from "./tokenSummaries";
export interface Playground3RemoteInferenceRequest {
    providerConfigJson: string;
    messagesJson: string;
    toolsJson?: string;
    optionsJson?: string;
}
export interface Playground3RemoteInferenceResponse {
    content: string;
    reasoningContent?: string | null;
    toolCallsJson?: string | null;
    tokensJson?: string | null;
    providerSessionJson?: string | null;
    status: string;
    /** Client epoch ms when final resultJson arrived (before UI apply). */
    clientFinalArrivedAtMs?: number;
    /**
     * Skew-free: client ms from last non-final chunk arrival → final arrival.
     * Only set when this inference had at least one non-final chunk.
     */
    clientDeliverMs?: number;
    /**
     * Same-clock FE→BE: subscribe settle + startInference (or sync runInference) await.
     * Prefer over server cross-clock frontendToBackendMs (skew often clamps to 0).
     */
    clientFrontendToBackendMs?: number;
    /** Which race leg delivered the final resultJson. */
    settleSource?: Playground3SettleSource;
}
export interface Playground3RemoteInferenceOptions {
    responseFormat?: {
        type: "jsonObject";
    };
    toolChoice?: "auto" | "required" | {
        type: "tool";
        name: string;
    };
    reasoning?: {
        enabled: boolean;
        mode: string;
        budgetTokens?: number;
    };
    providerSession?: InferenceProviderSession;
    providerSessionCompatibilityFingerprint?: string;
}
export interface Playground3InferenceStreamRouting {
    sessionId: string;
    nodeGraphId: string;
    nodeRunId: string;
    nodeId: string;
}
export interface Playground3StreamChunkEvent {
    sessionId: string;
    nodeGraphId: string;
    nodeRunId: string;
    nodeId: string;
    inferenceId: string;
    content: string;
    sequence: number;
    isFinal: boolean;
    errorMessage?: string | null;
    resultJson?: string | null;
}
export interface Playground3StartInferenceRequest extends Playground3RemoteInferenceRequest {
    inferenceId: string;
    sessionId: string;
    nodeGraphId: string;
    nodeRunId: string;
    nodeId: string;
}
export interface Playground3StartInferenceResponse {
    inferenceId: string;
    status: string;
}
export interface Playground3InferenceJobSnapshot {
    id: string;
    status: string;
    resultJson?: string | null;
    errorMessage?: string | null;
}
export declare const createPlayground3RemoteInferenceAdapter: (input: {
    providerConfig: ProviderConfig;
    systemPrompt?: string;
    options?: Playground3RemoteInferenceOptions;
    streamRouting?: Playground3InferenceStreamRouting;
    startInference?: (request: Playground3StartInferenceRequest) => Promise<Playground3StartInferenceResponse>;
    getInferenceJob?: (inferenceId: string) => Promise<Playground3InferenceJobSnapshot | null>;
    subscribeToChunks?: (nodeGraphId: string, handlers: {
        next: (chunk: Playground3StreamChunkEvent) => void;
        error?: (error: unknown) => void;
    }) => {
        unsubscribe: () => void;
    };
    /** Safeguard: InferenceJob onUpdate filtered by id. */
    subscribeToInferenceJob?: (inferenceId: string, handlers: {
        next: (job: Playground3InferenceJobSnapshot) => void;
        error?: (error: unknown) => void;
    }) => {
        unsubscribe: () => void;
    };
    runInference: (request: Playground3RemoteInferenceRequest) => Promise<Playground3RemoteInferenceResponse>;
}) => Playground3InferenceAdapter;
