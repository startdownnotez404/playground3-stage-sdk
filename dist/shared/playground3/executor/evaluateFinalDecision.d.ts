import type { Playground3AgentLoopToolCallPolicy } from "./toolCallPolicy";
import type { Playground3ToolCall } from "./types";
export declare const isSuccessfulPlayground3ToolResult: (toolResult: unknown) => boolean;
export type Playground3FinalDecisionEvaluation = {
    ok: true;
} | {
    ok: false;
    correction: string;
};
/**
 * Validates a no-tool final agent reply before completing the node.
 * On failure, returns a correction message to re-ask the model.
 */
export declare const evaluatePlayground3FinalDecision: (input: {
    parsedReply: Record<string, unknown> | null;
    allowedRouteConditionKeys?: string[];
    toolCallPolicy?: Playground3AgentLoopToolCallPolicy;
    executedToolCalls: ReadonlyArray<Pick<Playground3ToolCall, "name">>;
    executedToolResults: unknown[];
}) => Playground3FinalDecisionEvaluation;
