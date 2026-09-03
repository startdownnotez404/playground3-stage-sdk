import { type Playground3PromptContextMessageSourceKind } from "./constants";
export type Playground3PromptContextMessageRole = "system" | "user" | "assistant" | "tool";
export type { Playground3PromptContextMessageSourceKind };
export interface Playground3PromptContextMessageSource {
    index: number;
    role: Playground3PromptContextMessageRole;
    sourceKind: Playground3PromptContextMessageSourceKind;
    historyItemId?: string;
    nodeRunId?: string;
    nodeId?: string;
    laneId?: string;
    compactionId?: string;
    label?: string;
}
export interface Playground3PromptContextLayers {
    sessionContextCount: number;
    globalContextCount: number;
    inheritedHistoryCount: number;
    promptInjectionCount: number;
    laneId?: string | null;
    compactionId?: string | null;
    checkpointId?: string | null;
    messageSources?: Playground3PromptContextMessageSource[];
}
export declare const normalizePlayground3PromptContextMessageSource: (value: unknown) => Playground3PromptContextMessageSource | null;
export declare const normalizePlayground3PromptContextLayers: (value: unknown) => Playground3PromptContextLayers | null;
export declare const parsePlayground3PromptContextLayersJson: (value: string | null | undefined) => Playground3PromptContextLayers | null;
