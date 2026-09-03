import type { OrchestraGraphHistoryInheritanceEntry } from "./orchestraGraphConfig";
import { type OrchestraGraphGlobalContextHistorySelector } from "./orchestraGraphConfig";
export interface OrchestraGraphHistorySelectionTarget {
    nodeId?: string | null;
    agentId?: string | null;
}
export declare const isGlobalContextHistorySelector: (selector: OrchestraGraphHistoryInheritanceEntry) => selector is OrchestraGraphGlobalContextHistorySelector;
export declare const parseOrchestraGraphHistorySelectorEntries: (value: unknown, path: string) => OrchestraGraphHistoryInheritanceEntry[];
export declare const parseOrchestraGraphHistorySelector: (value: unknown, path: string) => OrchestraGraphHistoryInheritanceEntry;
export declare const parseOrchestraGraphHistorySelectors: (value: unknown, path: string) => OrchestraGraphHistoryInheritanceEntry[] | undefined;
export declare const coerceOrchestraGraphHistorySelectors: (value: unknown) => OrchestraGraphHistoryInheritanceEntry[] | undefined;
export declare const filterNodeOutputHistorySelectors: (selectors: OrchestraGraphHistoryInheritanceEntry[]) => OrchestraGraphHistoryInheritanceEntry[];
export declare const resolveGlobalContextInheritance: (selectors: OrchestraGraphHistoryInheritanceEntry[] | undefined) => {
    include: boolean;
    laneId: string;
};
export declare const matchesOrchestraGraphHistorySelector: (selector: OrchestraGraphHistoryInheritanceEntry, target: OrchestraGraphHistorySelectionTarget) => boolean;
export declare const hasOrchestraGraphHistorySelectorMatch: (selectors: OrchestraGraphHistoryInheritanceEntry[], target: OrchestraGraphHistorySelectionTarget) => boolean;
export declare const isOrchestraGraphHistorySelfAgentId: (agentId: string | null | undefined) => boolean;
export declare const resolveOrchestraGraphHistorySelfAgentId: (selectorAgentId: string | null | undefined, spawnedAgentId: string) => string | undefined;
/** True when a selector uses agentId "$self" (spawn/discussion relative). */
export declare const inheritHistoryEntryUsesSelfAgentId: (selector: OrchestraGraphHistoryInheritanceEntry) => boolean;
