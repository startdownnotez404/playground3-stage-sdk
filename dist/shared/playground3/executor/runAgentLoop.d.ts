import { type Playground3TransitionKind } from "../constants";
import type { HumanApprovalConfig } from "../../humanApprovalConfig";
import type { Playground3AgentDefinition } from "../agent/agentDefinition";
import type { Playground3ToolCaller } from "../playgroundDefinition";
import type { Playground3AgentLoopToolCallPolicy } from "./toolCallPolicy";
import { type Playground3SpawnedSubagentResult } from "./spawnSubagent";
import type { Playground3McpTool } from "../mcp/manifest";
import type { Playground3SkillReader } from "../skills";
import type { OrchestraGraphNode } from "../../orchestraGraphConfig";
import type { OrchestraGraphConfigV2 } from "../../orchestraGraph/v2/config";
import type { Playground3AgentLoopCheckpoint, Playground3AgentLoopStep, Playground3ChatMessage, Playground3InferenceAdapter, Playground3InferenceStreamChunk, Playground3ToolCall } from "./types";
import type { Playground3LaneMessageReader, Playground3LaneMessageWriter } from "./buildSpawnInheritHistoryMessages";
import type { Playground3PlanContext } from "../planNextSteps/types";
export type Playground3SubagentInferenceResolver = Playground3InferenceAdapter | ((agentId: string) => Playground3InferenceAdapter);
/** Host stream bridge surface used to fan out spawn inference chunks. */
export interface Playground3SpawnInferenceStreamBridge {
    emitChunk: (context: {
        sessionId: string;
        nodeGraphId: string;
        nodeRunId: string;
        nodeId: string;
    }, chunk: Playground3InferenceStreamChunk) => void;
    resetNodeRun: (nodeRunId: string) => void;
}
export interface Playground3SpawnStreamContext {
    sessionId: string;
    nodeGraphId: string;
    /** Parent graph node run id — spawn keys are derived from this. */
    parentNodeRunId: string;
    nodeId: string;
}
export interface Playground3SpawnedSubagentStartInfo {
    agentId: string;
    agentName: string;
    prompt: string;
    spawnIndex: number;
    streamNodeRunId: string;
    parentStepIndex?: number;
    provider?: string;
    model?: string;
}
export interface Playground3AgentLoopRuntime {
    parentAgentId: string;
    agentDefinitions?: Record<string, Playground3AgentDefinition>;
    /** Orchestra graph for spawned-agent response contracts / reasoning merge. */
    graphConfig?: OrchestraGraphConfigV2;
    /** Parent graph node — spawn inherits history from its subagentExpansion contract. */
    graphNode?: OrchestraGraphNode;
    subagentInference?: Playground3SubagentInferenceResolver;
    /** Default provider/model labels for spawned subagent audit records. */
    inferenceProvider?: string;
    inferenceModel?: string;
    resolveSubagentInferenceMeta?: (agentId: string) => {
        provider?: string;
        model?: string;
    };
    readLaneMessages?: Playground3LaneMessageReader;
    appendLaneMessages?: Playground3LaneMessageWriter;
    awaitHumanQuestion?: (input: {
        question: string;
        form?: import("./askHuman").Playground3AskHumanForm;
        checkpoint: Playground3AgentLoopCheckpoint;
    }) => Promise<string>;
    /** Parent node stream identity + bridge for per-spawn live chunks. */
    spawnStreamContext?: Playground3SpawnStreamContext;
    inferenceStream?: Playground3SpawnInferenceStreamBridge;
    /** Fired before spawn inference so the dock can fan out a working review row. */
    onSpawnedSubagentStart?: (info: Playground3SpawnedSubagentStartInfo) => void | Promise<void>;
    onSpawnedSubagent?: (result: Playground3SpawnedSubagentResult) => void | Promise<void>;
    /** Progressive skills: load full SKILL.md bodies for catalog ids. */
    skillReader?: Playground3SkillReader;
    /** Allowlist for playground3.loadSkill (node task.skills catalog). */
    loadSkillIds?: readonly string[];
    /** Host checkpoint for rendering `{{checkpoint.*}}` in spawn personas. */
    checkpointState?: unknown;
    /**
     * planNextSteps live-graph context (executor-owned). Present only when the
     * node's agent capability enables playground3.planNextSteps.
     */
    planContext?: Playground3PlanContext;
    /** Caller identity threaded into tool handlers (audit / access checks). */
    callerContext?: import("../playgroundDefinition").Playground3ToolCaller;
}
export type Playground3HumanGateDecision = "approved" | "rejected";
export type Playground3AgentLoopContinuationKind = "approvedPendingTools" | "answeredHumanQuestion";
export interface Playground3ToolExecutor {
    callTool(input: Playground3ToolCall, caller?: Playground3ToolCaller): Promise<unknown>;
}
export interface RunPlayground3AgentLoopInput {
    messages: Playground3ChatMessage[];
    tools: Playground3McpTool[];
    inference: Playground3InferenceAdapter;
    toolExecutor: Playground3ToolExecutor;
    toolCallPolicy?: Playground3AgentLoopToolCallPolicy;
    /** When set, final no-tool replies must use one of these routeConditionKey values. */
    allowedRouteConditionKeys?: string[];
    /**
     * When true, merge provider-native thinking into parsedFinalContent.reasoning
     * (same contract as Playground2 agent.reasoning).
     */
    agentReasoningEnabled?: boolean;
    maxSteps?: number;
    signal?: AbortSignal;
    resumeFrom?: Playground3AgentLoopCheckpoint;
    continuationKind?: Playground3AgentLoopContinuationKind;
    /** Cold-resume payload for an answered playground3.askHuman gate. */
    answeredHumanQuestion?: {
        question: string;
        answer: string;
    };
    resolveToolApproval?: (toolName: string) => HumanApprovalConfig | undefined;
    awaitHumanApproval?: (input: {
        toolCalls: Playground3ToolCall[];
        checkpoint: Playground3AgentLoopCheckpoint;
    }) => Promise<Playground3HumanGateDecision>;
    agentRuntime?: Playground3AgentLoopRuntime;
    onStep?: (step: Playground3AgentLoopStep) => Promise<void> | void;
    onStreamChunk?: (chunk: Playground3InferenceStreamChunk) => void | Promise<void>;
    onStreamReset?: () => void;
}
export interface RunPlayground3AgentLoopResult {
    finalContent: string;
    parsedFinalContent: Record<string, unknown> | null;
    steps: Playground3AgentLoopStep[];
    checkpoint: Playground3AgentLoopCheckpoint;
    stopKind: Playground3TransitionKind;
    /** Present when stopKind is nodeFailed and the failure has a known cause. */
    failureCode?: "humanRejected" | "maxStepsExceeded" | "inferenceFailed" | "interrupted";
    /** Human-readable cause for host status / banners (preferred over generic app copy). */
    failureMessage?: string;
    /** Filled by the turn executor for diagnostics (which node failed). */
    nodeId?: string;
    /** Loop budget that applied to this node run (for maxStepsExceeded copy). */
    maxSteps?: number;
}
export declare const executeApprovedPendingTools: (input: {
    pendingToolCalls: Playground3ToolCall[];
    toolExecutor: Playground3ToolExecutor;
    workingMessages: Playground3ChatMessage[];
    latestReply: string;
    executedToolCalls: Playground3ToolCall[];
    executedToolResults: unknown[];
    signal?: AbortSignal;
    agentRuntime?: Playground3AgentLoopRuntime;
}) => Promise<{
    workingMessages: Playground3ChatMessage[];
    executedToolCalls: Playground3ToolCall[];
    executedToolResults: unknown[];
}>;
export declare const runPlayground3AgentLoop: (input: RunPlayground3AgentLoopInput) => Promise<RunPlayground3AgentLoopResult>;
