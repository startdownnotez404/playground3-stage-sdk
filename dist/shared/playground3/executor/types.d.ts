import type { Playground3TokenSummary } from "./tokenSummaries";
export interface Playground3ChatMessage {
    role: "system" | "user" | "assistant" | "tool";
    content: string;
    toolCallId?: string;
    name?: string;
    /** True when this tool result is a failure (Anthropic tool_result.is_error). */
    isError?: boolean;
    /** Assistant-only: tool calls requested in this turn (for provider tool_use pairing). */
    toolCalls?: Playground3ToolCall[];
}
export interface Playground3ToolCall {
    id?: string;
    name: string;
    args: Record<string, unknown>;
}
export interface Playground3InferenceResult {
    content: string;
    /** Human-readable text streamed into ChatDock before the final JSON payload lands. */
    streamText?: string;
    reasoningContent?: string;
    toolCalls?: Playground3ToolCall[];
    tokens?: Playground3TokenSummary;
    providerSessionJson?: string;
}
export interface Playground3InferenceStreamChunk {
    content: string;
    sequence: number;
    isFinal: boolean;
}
export interface Playground3InferenceAdapter {
    run(input: {
        messages: Playground3ChatMessage[];
        tools?: Array<{
            name: string;
            description?: string;
            inputSchema?: Record<string, unknown>;
        }>;
        signal?: AbortSignal;
        onStreamChunk?: (chunk: Playground3InferenceStreamChunk) => void | Promise<void>;
        agentLoop?: {
            executedToolCalls: Playground3ToolCall[];
            toolCallPolicy?: {
                forceToolCall?: boolean;
                forceToolNames?: string[];
                agentDecidesAfterTool?: boolean;
            };
        };
    }): Promise<Playground3InferenceResult>;
}
export interface Playground3AgentLoopCheckpoint {
    workingMessages: Playground3ChatMessage[];
    stepIndex: number;
    executedToolCalls: Playground3ToolCall[];
    executedToolResults: unknown[];
    latestReply: string;
    parsedReply?: Record<string, unknown> | null;
    pendingToolCalls?: Playground3ToolCall[];
    /** Tokens from the inference that requested pending tool approval (cold resume). */
    pendingInferenceTokens?: {
        input?: number;
        output?: number;
        total?: number;
    };
    pendingAskHuman?: {
        question: string;
        toolCallId?: string;
    };
}
export interface Playground3SpawnedSubagentStepRecord {
    agentId: string;
    agentName: string;
    prompt: string;
    content: string;
    reasoningContent?: string;
    tokens?: {
        input?: number;
        output?: number;
        total?: number;
    };
    tokensJson?: string;
    messagesJson?: string;
    provider?: string;
    model?: string;
    parentStepIndex?: number;
    spawnIndex?: number;
    streamNodeRunId?: string;
    recordedAt?: string;
}
export interface Playground3AgentLoopStep {
    stepIndex: number;
    inference: Playground3InferenceResult;
    toolCalls: Playground3ToolCall[];
    toolResults: unknown[];
    checkpoint: Playground3AgentLoopCheckpoint;
    spawnedSubagents?: Playground3SpawnedSubagentStepRecord[];
    askHumanQuestion?: string;
    askHumanAnswer?: string;
}
