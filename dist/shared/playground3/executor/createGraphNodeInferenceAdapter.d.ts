import type { OrchestraGraphNode } from "../../orchestraGraphConfig";
import type { OrchestraGraphConfigV2 } from "../../orchestraGraph/v2/config";
import type { ProviderConfig } from "../../PROVIDER_CONFIGs";
import type { Playground3InferenceStreamRouting, Playground3InferenceJobSnapshot, Playground3RemoteInferenceOptions, Playground3StartInferenceRequest, Playground3StartInferenceResponse, Playground3StreamChunkEvent } from "./remoteInferenceAdapter";
import { createPlayground3RemoteInferenceAdapter } from "./remoteInferenceAdapter";
import type { Playground3InferenceAdapter } from "./types";
export declare const createPlayground3GraphNodeInferenceAdapter: (input: {
    graphConfig: OrchestraGraphConfigV2;
    agentId: string;
    /** When set, node.outputSchema overrides agent.responseSchema. */
    node?: Pick<OrchestraGraphNode, "id" | "outputSchema">;
    options?: Playground3RemoteInferenceOptions;
    /** Composer-selected provider/model for performers with model: "$selected". */
    selectedProviderConfig?: ProviderConfig;
    streamRouting?: Playground3InferenceStreamRouting;
    startInference?: (request: Playground3StartInferenceRequest) => Promise<Playground3StartInferenceResponse>;
    getInferenceJob?: (inferenceId: string) => Promise<Playground3InferenceJobSnapshot | null>;
    subscribeToChunks?: (nodeGraphId: string, handlers: {
        next: (chunk: Playground3StreamChunkEvent) => void;
        error?: (error: unknown) => void;
    }) => {
        unsubscribe: () => void;
    };
    subscribeToInferenceJob?: (inferenceId: string, handlers: {
        next: (job: Playground3InferenceJobSnapshot) => void;
        error?: (error: unknown) => void;
    }) => {
        unsubscribe: () => void;
    };
    runInference: Parameters<typeof createPlayground3RemoteInferenceAdapter>[0]["runInference"];
}) => Playground3InferenceAdapter;
