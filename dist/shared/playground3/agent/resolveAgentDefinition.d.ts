import type { Playground3AgentCapabilities, Playground3AgentDefinition } from "./agentDefinition";
export declare const resolvePlayground3AgentDefinition: (input: {
    agentDefinitions?: Record<string, Playground3AgentDefinition>;
    agentId: string;
    parentAgentId?: string;
}) => Playground3AgentDefinition | undefined;
export declare const resolvePlayground3AgentCapabilities: (input: {
    agentDefinition?: Playground3AgentDefinition;
}) => Playground3AgentCapabilities | undefined;
