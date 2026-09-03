import type { OrchestraGraphHistoryInheritanceEntry, OrchestraGraphNode, OrchestraGraphSpawnInheritHostWorking, OrchestraGraphSubagentTopologyBinding } from "../../orchestraGraphConfig";
import type { OrchestraGraphConfigV2 } from "../../orchestraGraph/v2/config";
import type { Playground3ChatMessage } from "./types";
export type Playground3LaneMessageReader = (laneId: string) => readonly Playground3ChatMessage[];
export type Playground3LaneMessageWriter = (laneId: string, messages: readonly Playground3ChatMessage[]) => void;
/**
 * Resolve contract inheritHistory into chat messages for a spawned subagent.
 * Does not dump parent GM working prompts (use inheritHostWorking for that).
 */
export declare const buildPlayground3SpawnInheritHistoryMessages: (input: {
    inheritHistory?: readonly OrchestraGraphHistoryInheritanceEntry[];
    spawnedAgentId: string;
    graphConfig?: OrchestraGraphConfigV2;
    readLaneMessages: Playground3LaneMessageReader;
    /**
     * Topology binding toggle. `true` always loads the peer's own lane;
     * `false` skips it even if listed in inheritHistory;
     * `undefined` (legacy) honors inheritHistory selectors as authored.
     */
    inheritAgentMemory?: boolean;
}) => Playground3ChatMessage[];
/** Slice of the host working thread for a topology peer. */
export declare const buildPlayground3SpawnHostWorkingMessages: (parentMessages: readonly Playground3ChatMessage[], mode?: OrchestraGraphSpawnInheritHostWorking) => Playground3ChatMessage[];
/**
 * Resolve spawn inheritHistory from a topology binding when present,
 * else legacy subagentExpansion / subagentDiscussion.
 */
export declare const resolvePlayground3SpawnInheritHistory: (graphNode: OrchestraGraphNode | undefined, options?: {
    agentId?: string;
    binding?: OrchestraGraphSubagentTopologyBinding;
}) => OrchestraGraphHistoryInheritanceEntry[] | undefined;
export declare const resolvePlayground3SpawnInheritHostWorking: (binding: OrchestraGraphSubagentTopologyBinding | undefined) => OrchestraGraphSpawnInheritHostWorking;
/**
 * Explicit topology toggle. When the field is omitted on an authored binding,
 * default is false (lean). `undefined` when no topology binding (legacy spawn).
 */
export declare const resolvePlayground3SpawnInheritAgentMemory: (binding: OrchestraGraphSubagentTopologyBinding | undefined) => boolean | undefined;
export declare const resolvePlayground3SpawnedAgentLaneId: (graphConfig: OrchestraGraphConfigV2 | undefined, agentId: string) => string;
export declare const buildPlayground3SpawnLanePersistenceMessages: (input: {
    prompt: string;
    content: string;
}) => Playground3ChatMessage[];
