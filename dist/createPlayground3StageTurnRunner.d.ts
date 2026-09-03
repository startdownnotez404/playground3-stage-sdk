import type { Playground3AgentDefinition, Playground3RunTurnInput, Playground3RunTurnResult } from "./shared/playground3/playgroundDefinition";
import type { Playground3InferenceAdapter } from "./shared/playground3/executor/types";
export interface CreatePlayground3StageTurnRunnerOptions<TState> {
    playgroundId: string;
    buildCheckpointState?: (state: TState) => unknown;
    buildFrontendStateJson?: (state: TState) => string;
    agentDefinitions?: Record<string, Playground3AgentDefinition> | ((state: TState) => Record<string, Playground3AgentDefinition>);
    agentProfiles?: Playground3RunTurnInput<TState>["agentProfiles"];
    scriptedNodeInference?: (input: {
        graphKey: string;
        state: TState;
    }) => ((input: {
        nodeId: string;
    }) => Playground3InferenceAdapter | undefined) | undefined;
    statusLabels?: {
        starting?: string;
        resuming?: string;
        running?: string;
        completed?: string;
    };
    failOnNodeFailure?: boolean;
    rejectionMessage?: string;
    failureMessage?: string;
}
/**
 * Implemented by the opaque esbuild bundle. This declaration is the public type.
 */
export declare function createPlayground3StageTurnRunner<TState>(options: CreatePlayground3StageTurnRunnerOptions<TState>): (input: Playground3RunTurnInput<TState>) => Promise<Playground3RunTurnResult>;
