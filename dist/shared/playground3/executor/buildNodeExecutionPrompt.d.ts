import type { OrchestraGraphNode, OrchestraGraphOutputKind } from "../../orchestraGraphConfig";
/** One optional modular peer group (map / tool detail; not a graph route). */
export interface Playground3ModuleRoutePromptInfo {
    /** Topology id (map shell label). */
    moduleRouteKey: string;
    /** When / why to call a peer (from binding.objective). */
    objective: string;
    agentIds: string[];
}
/** Map authored module bindings for map/inspector tool context (not ## Routes). */
export declare const resolvePlayground3ModuleRoutesForPrompt: (node: Pick<OrchestraGraphNode, "subagentTopologies" | "subagentExpansion" | "subagentDiscussion" | "task">) => Playground3ModuleRoutePromptInfo[];
export interface Playground3NodeExecutionPromptInput {
    nodeId: string;
    agentId: string;
    outputKind?: OrchestraGraphOutputKind;
    outputSchema?: Record<string, unknown>;
    outcomes: string[];
    requiresRouteConditionKey: boolean;
    contentInstruction?: string;
}
/**
 * Standardized ## Routes section for output contracts.
 * Graph finish routes only — optional peers are tools (`playground3.spawnSubagent`), not routes.
 */
export declare const buildPlayground3NodeRoutesSection: (input: {
    outcomes: string[];
    requiresRouteConditionKey: boolean;
}) => string;
/** Enrich spawnSubagent tool catalog detail from modular topology bindings. */
export declare const buildPlayground3SpawnSubagentToolDetail: (moduleRoutes: readonly Playground3ModuleRoutePromptInfo[]) => string | undefined;
/** PG3 node output-contract prompt (schema hint + standardized ## Routes). */
export declare const buildPlayground3NodeExecutionPrompt: (input: Playground3NodeExecutionPromptInput) => string;
