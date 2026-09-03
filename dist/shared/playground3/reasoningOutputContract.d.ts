import type { OrchestraGraphAgent, OrchestraGraphOutputKind } from "../orchestraGraphConfig";
export interface Playground3ReasoningOutputContract {
    kind?: OrchestraGraphOutputKind;
    schema?: Record<string, unknown>;
    displayTemplate?: string;
    historyTemplate?: string;
}
export declare const applyAgentReasoningToOutputContract: (input: {
    agent: Pick<OrchestraGraphAgent, "reasoning">;
    contract: Playground3ReasoningOutputContract;
    skipReasoningInject?: boolean;
}) => Playground3ReasoningOutputContract;
export declare const mergeProviderReasoningIntoContent: (input: {
    agentReasoningEnabled: boolean;
    contentValue: unknown;
    providerReasoningContent?: string | null;
}) => unknown;
