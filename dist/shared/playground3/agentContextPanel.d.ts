import type { Playground3ContextWindowBreakdown } from "./contextWindow";
export interface Playground3AgentInvocationContextView {
    agentId?: string;
    systemPromptContext?: {
        providerSystemPrompt?: string;
    };
    executionPolicy?: {
        agentSystemPrompt?: string;
        nodeContracts?: {
            task?: {
                goal?: string;
                rules?: string[];
            };
        };
    };
    inferenceInput: {
        tools: Playground3ContextWindowToolEntry[];
    };
}
export declare const parsePlayground3AgentInvocationContextJson: (value: string | null | undefined) => Playground3AgentInvocationContextView | null;
export interface Playground3ContextWindowToolEntry {
    name: string;
    description?: string;
}
export interface Playground3AgentContextPanelFields {
    agentId?: string;
    goal?: string;
    rules?: string[];
    tools?: Playground3ContextWindowToolEntry[];
    mainLaneConversation?: string;
}
export declare const buildPlayground3AgentContextPanelFields: (input: {
    agentId?: string;
    goal?: string;
    rules?: string[];
    tools?: Playground3ContextWindowToolEntry[];
    mainLaneConversation?: string;
}) => Playground3AgentContextPanelFields;
export declare const resolvePlayground3AgentContextPanelFieldsFromInvocationJson: (agentInvocationContextJson: string | null | undefined) => Playground3AgentContextPanelFields | null;
export declare const mergePlayground3AgentContextPanelFields: (primary: Playground3AgentContextPanelFields | null | undefined, fallback: Playground3AgentContextPanelFields | null | undefined) => Playground3AgentContextPanelFields;
export declare const estimatePlayground3AgentContextPanelTokens: (input: {
    goal?: string;
    rules?: string[];
    tools?: Playground3ContextWindowToolEntry[];
    mainLaneConversation?: string;
    agentPersona?: string;
    toolDefinitionsJson?: string;
    promptMessages?: string[];
}) => number;
export declare const enrichPlayground3ContextWindowBreakdown: (input: {
    breakdown: Playground3ContextWindowBreakdown | null;
    agentInvocationContextJson?: string | null;
}) => Playground3ContextWindowBreakdown | null;
export declare const formatPlayground3AgentContextPanelSection: (input: {
    goal?: string;
    rules?: string[];
    tools?: Playground3ContextWindowToolEntry[];
    mainLaneConversation?: string;
}) => string;
