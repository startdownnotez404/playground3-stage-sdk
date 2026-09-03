import type { HumanApprovalConfig } from "../../humanApprovalConfig";
import type { Playground3AgentLoopCheckpoint, Playground3ToolCall } from "./types";
import type { Playground3HumanGateDecision } from "./runAgentLoop";
export interface Playground3HumanGateAdapterContext {
    sessionId: string;
    nodeGraphId: string;
    nodeRunId: string;
    nodeId: string;
    executorTabId: string;
}
export interface Playground3HumanGateAdapter {
    waitForApproval: (input: {
        context: Playground3HumanGateAdapterContext;
        checkpoint: Playground3AgentLoopCheckpoint;
        pendingToolCall: Playground3ToolCall;
        approval?: HumanApprovalConfig;
    }) => Promise<Playground3HumanGateDecision>;
    waitForQuestion?: (input: {
        context: Playground3HumanGateAdapterContext;
        checkpoint: Playground3AgentLoopCheckpoint;
        question: string;
        form?: import("./askHuman").Playground3AskHumanForm;
    }) => Promise<string>;
}
