import type { OrchestraGraphAgent, OrchestraGraphEdge, OrchestraGraphGroup, OrchestraGraphParallelGroup, OrchestraGraphPerformer, OrchestraGraphPromptInjection, OrchestraGraphResponseShapeRegistry, OrchestraGraphContextLaneRegistry, OrchestraGraphOptions } from "../../orchestraGraphConfig";
import type { OrchestraGraphConfigV2, OrchestraGraphNodeV2, OrchestraGraphNodeWhiteboardAccess, OrchestraGraphWhiteboardRegistry, OrchestraGraphWiringV2, OrchestraGraphWorkflowV2 } from "../../orchestraGraph/v2/config";
/**
 * Per-app shared authoring: agents + nodes registries compose with a thin
 * graph (edges / entry / mode meta) into one schema-v2 topology document.
 *
 * Whiteboard access stays node-scoped at runtime. Agents may declare defaults;
 * compose copies them onto nodes that omit `whiteboardAccess`.
 */
export type SharedTopologyWhiteboardAccess = OrchestraGraphNodeWhiteboardAccess;
/** Agent registry entry — runtime subagent fields + authoring-only defaults. */
export type SharedTopologyAgent = Omit<OrchestraGraphAgent, "description" | "agentPersona"> & {
    description: string;
    agentPersona: string;
    /** Copied onto bound nodes when the node omits whiteboardAccess. */
    whiteboardAccess?: SharedTopologyWhiteboardAccess[];
};
/** Node registry entry — full node contract including promptInjections. */
export type SharedTopologyNode = Omit<OrchestraGraphNodeV2, "id"> & {
    /** Required agent id from the shared agents registry. */
    agent: string;
};
/** Thin per-mode graph — wiring + mode metadata only. */
export type SharedTopologyGraph = {
    name: string;
    description: string;
    /** App definition entry modeType (e.g. "agent"). */
    modeType?: string;
    entryNodeId: string;
    edges: OrchestraGraphEdge[];
    parallel?: OrchestraGraphParallelGroup[];
    groups?: OrchestraGraphGroup[];
    groupEdges?: OrchestraGraphWiringV2["groupEdges"];
};
/** App-level registries shared across modes. */
export type SharedTopologyShared = {
    performers: OrchestraGraphPerformer[];
    whiteboards?: OrchestraGraphWhiteboardRegistry;
    responseSchemas?: OrchestraGraphResponseShapeRegistry;
    lanes?: OrchestraGraphContextLaneRegistry;
    workflow?: OrchestraGraphWorkflowV2;
    options?: OrchestraGraphOptions;
    initialState?: Record<string, unknown>;
    actions?: OrchestraGraphConfigV2["actions"];
    toolSets?: OrchestraGraphConfigV2["toolSets"];
    skillSets?: OrchestraGraphConfigV2["skillSets"];
    retrievalSources?: OrchestraGraphConfigV2["retrievalSources"];
    runtimeToolDefinitions?: OrchestraGraphConfigV2["runtimeToolDefinitions"];
    memory?: OrchestraGraphConfigV2["memory"];
};
export type ComposeSharedTopologyInput = {
    agents: Record<string, SharedTopologyAgent>;
    nodes: Record<string, SharedTopologyNode>;
    graph: SharedTopologyGraph;
    shared: SharedTopologyShared;
};
/**
 * Compose per-app shared agents/nodes + a thin graph into a canonical v2
 * topology object (before modular top1→top2 expansion).
 */
export declare const composeSharedTopology: (input: ComposeSharedTopologyInput) => Record<string, unknown>;
/**
 * Compose shared registries + thin graph, then expand modular bindings
 * (top1 → top2) into the JSON string the executor / map consume.
 */
export declare const buildSharedTopologyGraphJson: (input: ComposeSharedTopologyInput) => string;
/** Derive a prompts overlay from the agents registry (personas already on topology). */
export declare const promptsFromSharedAgents: (agents: Record<string, SharedTopologyAgent>) => {
    agents: Record<string, {
        description: string;
        agentPersona: string;
    }>;
};
export type { OrchestraGraphPromptInjection };
/** Type guard used by smoke tests for thin-graph hygiene. */
export declare const assertThinSharedGraph: (graph: SharedTopologyGraph) => void;
