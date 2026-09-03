import type { Playground3RemoteInferenceOptions } from "./remoteInferenceAdapter";
import type { Playground3ToolCall } from "./types";
export interface Playground3AgentLoopToolCallPolicy {
    forceToolCall?: boolean;
    forceToolNames?: string[];
    /**
     * When true, after a tool finishes the agent loop continues so the model can
     * choose the next action (final JSON, retry tool, etc.). Disables auto-complete
     * from committed tool results and from forceToolCall satisfaction alone.
     */
    agentDecidesAfterTool?: boolean;
}
export declare const isPlayground3ToolPolicySatisfiedFromExecution: (input: {
    toolCallPolicy?: Playground3AgentLoopToolCallPolicy;
    executedToolCalls: ReadonlyArray<Pick<Playground3ToolCall, "name">>;
}) => boolean;
export declare const resolvePlayground3AgentLoopInferenceOptions: (input: {
    baseOptions?: Playground3RemoteInferenceOptions;
    toolCallPolicy?: Playground3AgentLoopToolCallPolicy;
    executedToolCalls: ReadonlyArray<Pick<Playground3ToolCall, "name">>;
}) => Playground3RemoteInferenceOptions | undefined;
