import type { ChatMessage } from "../../amplifyChatTypes";
import type { Playground3PromptContextMessageSource } from "./promptContextSnapshot";
import { type Playground3ContextWindowToolEntry } from "./agentContextPanel";
export type { Playground3ContextWindowToolEntry };
export type Playground3ContextWindowSegmentKind = "thinking" | "systemPrompt" | "toolDefinitions" | "rules" | "skills" | "laneSummary" | "laneTail" | "inheritedHistory" | "sessionContext" | "promptInjection";
export interface Playground3ContextWindowSegment {
    kind: Playground3ContextWindowSegmentKind;
    tokenCount: number;
    label: string;
    laneId?: string;
}
export interface Playground3ContextWindowBreakdown {
    model: string;
    contextLimit: number;
    totalTokens: number;
    usagePercent: number;
    segments: Playground3ContextWindowSegment[];
    agentId?: string;
    goal?: string;
    rules?: string[];
    tools?: Playground3ContextWindowToolEntry[];
    /** Full playground skill catalog (not only node-attached skills). */
    skillCatalog?: Array<{
        id: string;
        description?: string;
        markdown?: string;
        scope?: "platform" | "app";
    }>;
    mainLaneConversation?: string;
}
export declare const mergePlayground3ConversationDisplaySegment: (segments: Playground3ContextWindowSegment[], mainLaneConversation?: string | null) => Playground3ContextWindowSegment[];
export declare const hasSubstantivePlayground3ContextWindowSegments: (segments: Playground3ContextWindowSegment[]) => boolean;
export declare const buildEstimatedPlayground3ContextWindowSegments: (input: {
    systemPrompts: string[];
    goals: string[];
    rules: string[];
    tools: Playground3ContextWindowToolEntry[];
}) => Playground3ContextWindowSegment[];
export declare const buildPlayground3ContextWindowBreakdown: (input: {
    model: string;
    contextLimit?: number;
    systemPrompt?: string;
    toolDefinitionsJson?: string;
    messages: ChatMessage[];
    messageSources: Playground3PromptContextMessageSource[];
    agentId?: string;
    goal?: string;
    rules?: string[];
    tools?: Playground3ContextWindowToolEntry[];
    mainLaneConversation?: string;
}) => Playground3ContextWindowBreakdown;
export declare const serializePlayground3ContextWindowBreakdown: (breakdown: Playground3ContextWindowBreakdown) => string;
export declare const parsePlayground3ContextWindowBreakdownJson: (value: string | null | undefined) => Playground3ContextWindowBreakdown | null;
export declare const formatPlayground3ContextTokenCount: (value: number) => string;
