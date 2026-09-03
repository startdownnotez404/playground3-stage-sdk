import { type Playground3ContextWindowToolEntry } from "./agentContextPanel";
import { type Playground3ContextWindowSegment } from "./contextWindow";
import { type Playground3TimelineHistoryItem } from "./timelineMainLaneConversation";
export interface Playground3AgentContextCatalogEntry {
    agentId: string;
    agentPersona?: string;
    goal?: string;
    rules?: string[];
    tools?: Playground3ContextWindowToolEntry[];
    contextTokens: number;
    isActive: boolean;
    hasSnapshot: boolean;
}
export interface Playground3AgentsContextPanel {
    model: string;
    contextLimit: number;
    totalTokens: number;
    aggregateContextTokens: number;
    usagePercent: number;
    segments: Playground3ContextWindowSegment[];
    systemPrompts: string[];
    goals: string[];
    rules: string[];
    tools: Playground3ContextWindowToolEntry[];
    conversation?: string;
    activeAgentId?: string;
    agents: Playground3AgentContextCatalogEntry[];
}
export declare const buildPlayground3AgentsContextPanel: (input: {
    graphJson?: string | null;
    snapshots?: Array<{
        nodeRunId?: string | null;
        createdAt?: string | null;
        contextWindowJson?: string | null;
        agentInvocationContextJson?: string | null;
    }>;
    nodeRuns?: Array<{
        id?: string | null;
        agentId?: string | null;
        nodeId?: string | null;
        parentNodeRunId?: string | null;
        outputPayloadJson?: string | null;
        routeConditionKey?: string | null;
    }>;
    historyItems?: Playground3TimelineHistoryItem[];
    nodeGraphId?: string | null;
    waitingNodeRunId?: string | null;
    preferredNodeRunIds?: string[];
}) => Playground3AgentsContextPanel | null;
