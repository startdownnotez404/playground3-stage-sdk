import { type Playground3ContextCompactionStatus, type Playground3ContextLaneScopeKind } from "./constants";
/**
 * Playground3 context lane / compaction contracts.
 * Raw transcript (HistoryItem) stays append-only; compaction is versioned metadata.
 */
export type { Playground3ContextCompactionStatus, Playground3ContextLaneScopeKind };
export interface Playground3ContextLaneScope {
    kind: Playground3ContextLaneScopeKind;
    nodeGraphIds?: string[];
}
export interface Playground3ContextNodeDigest {
    nodeRunId: string;
    nodeId: string;
    agentId?: string | null;
    historyText: string;
    routeConditionKey?: string | null;
}
export interface Playground3ContextCompactionPayload {
    summaryText: string;
    nodeDigests: Playground3ContextNodeDigest[];
    coveredThroughHistoryItemId: string | null;
    supersededCompactionId?: string | null;
}
export declare const parsePlayground3ContextLaneScopeJson: (value: string | null | undefined) => Playground3ContextLaneScope;
export declare const serializePlayground3ContextLaneScope: (scope: Playground3ContextLaneScope) => string;
export declare const parsePlayground3ContextCompactionPayloadJson: (value: string | null | undefined) => Playground3ContextCompactionPayload | null;
export declare const serializePlayground3ContextCompactionPayload: (payload: Playground3ContextCompactionPayload) => string;
