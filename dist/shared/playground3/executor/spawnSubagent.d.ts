import type { Playground3AgentDefinition } from "../agent/agentDefinition";
import type { OrchestraGraphNode } from "../../orchestraGraphConfig";
import type { OrchestraGraphConfigV2 } from "../../orchestraGraph/v2/config";
import type { Playground3ChatMessage, Playground3InferenceAdapter, Playground3InferenceResult, Playground3InferenceStreamChunk } from "./types";
import type { OrchestraGraphSubagentTopologyBinding } from "../../orchestraGraphConfig";
import { type Playground3LaneMessageReader, type Playground3LaneMessageWriter } from "./buildSpawnInheritHistoryMessages";
/** Stable stream / review key for a spawned subagent under a parent node run. */
export declare const buildPlayground3SpawnNodeRunId: (input: {
    parentNodeRunId: string;
    agentId: string;
    spawnIndex: number;
}) => string;
export interface RunPlayground3SpawnedSubagentInput {
    agentId: string;
    prompt: string;
    parentAgentId: string;
    agentDefinitions?: Record<string, Playground3AgentDefinition>;
    graphConfig?: OrchestraGraphConfigV2;
    /** Parent graph node — used for legacy expansion/discussion inheritHistory. */
    graphNode?: OrchestraGraphNode;
    /** Topology binding when spawn targets a modular peer (promptSection + inherit). */
    topologyBinding?: OrchestraGraphSubagentTopologyBinding;
    parentMessages: Playground3ChatMessage[];
    /** Host checkpoint — used to render `{{checkpoint.*}}` in the spawn persona. */
    checkpointState?: unknown;
    inference: Playground3InferenceAdapter;
    signal?: AbortSignal;
    provider?: string;
    model?: string;
    parentStepIndex?: number;
    spawnIndex?: number;
    /** When set, spawn inference publishes live chunks under this key. */
    streamNodeRunId?: string;
    onStreamChunk?: (chunk: Playground3InferenceStreamChunk) => void | Promise<void>;
    readLaneMessages?: Playground3LaneMessageReader;
    appendLaneMessages?: Playground3LaneMessageWriter;
}
export interface Playground3SpawnedSubagentResult {
    agentId: string;
    agentName: string;
    prompt: string;
    content: string;
    reasoningContent?: string;
    tokens?: Playground3InferenceResult["tokens"];
    tokensJson?: string;
    messagesJson?: string;
    provider?: string;
    model?: string;
    parentStepIndex?: number;
    spawnIndex?: number;
    streamNodeRunId?: string;
    recordedAt?: string;
}
export declare const runPlayground3SpawnedSubagent: (input: RunPlayground3SpawnedSubagentInput) => Promise<Playground3SpawnedSubagentResult>;
export declare const formatPlayground3SpawnedSubagentToolResult: (result: Playground3SpawnedSubagentResult) => string;
