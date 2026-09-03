export type MemoryMessageRole = "system" | "user" | "assistant";
export declare const MEMORY_SCOPEs: {
    readonly session: "session";
    readonly definition: "definition";
};
export type MemoryScope = (typeof MEMORY_SCOPEs)[keyof typeof MEMORY_SCOPEs];
export declare const MEMORY_KINDs: {
    readonly episodic: "episodic";
    readonly semantic: "semantic";
};
export type MemoryKind = (typeof MEMORY_KINDs)[keyof typeof MEMORY_KINDs];
export interface MemoryAccessPolicy {
    readHot: boolean;
    readCold: boolean;
    writeHot: boolean;
    writeCold: boolean;
}
export declare const NO_MEMORY_ACCESS: MemoryAccessPolicy;
export declare const FULL_MEMORY_ACCESS: MemoryAccessPolicy;
export interface HotMemorySnapshot {
    scratchpad: string[];
    recentMessages: Array<{
        role: MemoryMessageRole;
        content: string;
        createdAt: string;
    }>;
    recentSteps: Array<{
        index: number;
        kind: string;
        createdAt: string;
    }>;
    rollingSummary?: string;
}
export declare const EMPTY_HOT_MEMORY: HotMemorySnapshot;
export interface ColdMemoryEntrySummary {
    id: string;
    scope: MemoryScope;
    kind: MemoryKind;
    summary: string;
    tags: string[];
    createdAt: string;
}
export declare const isMemoryScope: (value: unknown) => value is MemoryScope;
export declare const isMemoryKind: (value: unknown) => value is MemoryKind;
export declare const parseMemoryAccessPolicy: (value: unknown) => MemoryAccessPolicy | undefined;
