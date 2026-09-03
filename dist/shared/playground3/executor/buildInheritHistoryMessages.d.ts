import type { OrchestraGraphHistoryInheritanceEntry } from "../../orchestraGraphConfig";
export interface Playground3CompletedNodeRunSnapshot {
    nodeId: string;
    agentId?: string;
    outputPayloadJson: string;
    status: "completed" | "failed";
}
export declare const buildPlayground3InheritHistoryMessages: (input: {
    inheritHistory?: OrchestraGraphHistoryInheritanceEntry[];
    completedNodeRuns: Playground3CompletedNodeRunSnapshot[];
}) => Array<{
    role: "user";
    content: string;
}>;
