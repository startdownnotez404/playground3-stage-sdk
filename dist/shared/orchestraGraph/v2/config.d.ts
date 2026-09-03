/**
 * Orchestra graph schema v2 — PG3-only registry + wiring shape.
 *
 * Authoring rules that differ from v1 (shared/orchestraGraphConfig.ts):
 * - Top level holds declared things as keyed registries; `graph` is wiring only.
 * - `nodes` is a top-level Record keyed by node id (authoring drops the `id`
 *   field; the parser injects `id = key` into runtime node objects).
 * - `graph` carries an explicit `entryNodeId` (no implicit "first node wins").
 * - Canonical keys only — no v1 authoring aliases (models/agents/runtime/...).
 * - Legacy fields dropped: graph.nodeTemplates, supervisorExpansion,
 *   subagentExpansion, subagentDiscussion, top-level responseShape.
 *
 * v1 remains the frozen schema for Playground2; the parser entry
 * (shared/orchestraGraphParser.ts) dispatches on the `version` field.
 */
import { ORCHESTRA_GRAPH_SCHEMA_VERSIONs, type OrchestraGraphAction, type OrchestraGraphAgent, type OrchestraGraphContextLaneRegistry, type OrchestraGraphEdge, type OrchestraGraphGroup, type OrchestraGraphGroupEdge, type OrchestraGraphMemoryConfig, type OrchestraGraphNode, type OrchestraGraphOptions, type OrchestraGraphParallelGroup, type OrchestraGraphPerformer, type OrchestraGraphResponseShapeRegistry, type OrchestraGraphRetrievalSource, type OrchestraGraphRuntimeToolDefinition, type OrchestraGraphSkillSetRegistry, type OrchestraGraphToolSetRegistry, type OrchestraGraphConfigV1, type OrchestraGraphWorkflowMacro, type OrchestraGraphWorkflowProfile } from "../../orchestraGraphConfig";
export interface OrchestraGraphWhiteboardDefinition {
    /** Optional display label for UI / panels. */
    label?: string;
    /** Optional author-facing description of the board's purpose. */
    description?: string;
    /** Seed markdown content for a fresh session checkpoint. */
    initialContent?: string;
}
export type OrchestraGraphWhiteboardRegistry = Record<string, OrchestraGraphWhiteboardDefinition>;
export interface OrchestraGraphNodeWhiteboardAccess {
    /** Board id from the top-level whiteboards registry. */
    boardId: string;
    /**
     * Write capability. Presence in whiteboardAccess always grants read
     * (read/history/diff); hasWrite adds write. There is no write-without-read:
     * baseRev concurrency makes blind writes impossible anyway.
     */
    hasWrite: boolean;
}
export interface OrchestraGraphNodeV2 extends Omit<OrchestraGraphNode, "supervisorExpansion" | "subagentExpansion" | "subagentDiscussion"> {
    /**
     * Runtime provenance: id of the planned fragment (planNextSteps) that
     * appended this node. Absent on authored nodes.
     */
    plannedFragmentId?: string;
    /** Allowlisted whiteboard boards this node may read/write (Phase 2). */
    whiteboardAccess?: OrchestraGraphNodeWhiteboardAccess[];
}
export interface OrchestraGraphWiringV2 {
    /** Explicit entry node id (must exist in the nodes registry). */
    entryNodeId: string;
    /** Directed edges connecting nodes. */
    edges: OrchestraGraphEdge[];
    /** Groups of nodes that can run in parallel. */
    parallel: OrchestraGraphParallelGroup[];
    /** Optional one-level grouped execution definition. */
    groups?: OrchestraGraphGroup[];
    /** Optional edges between groups when grouped mode is enabled. */
    groupEdges?: OrchestraGraphGroupEdge[];
}
export interface OrchestraGraphWorkflowLimitsV2 {
    /**
     * Maximum planned nodes appended per graph turn via planNextSteps
     * (runtime-enforced; authoring hint for validation/UI).
     */
    maxPlannedNodesPerTurn?: number;
}
export interface OrchestraGraphWorkflowV2 {
    /** Legacy routing profile. Optional: planNextSteps-driven graphs (limits only) have none. */
    profile?: OrchestraGraphWorkflowProfile;
    macro?: OrchestraGraphWorkflowMacro;
    limits?: OrchestraGraphWorkflowLimitsV2;
}
export interface OrchestraGraphConfigV2 extends Omit<OrchestraGraphConfigV1, "version" | "graph" | "responseShape" | "workflow"> {
    version: typeof ORCHESTRA_GRAPH_SCHEMA_VERSIONs.v2_0;
    /** Available LLM performers. */
    performers: OrchestraGraphPerformer[];
    /** Named subagent definitions keyed by subagent id. */
    subagents: Record<string, OrchestraGraphAgent>;
    /** Top-level keyed node registry (key = node id; parser injects `id = key`). */
    nodes: Record<string, OrchestraGraphNodeV2>;
    /** Wiring-only graph: explicit entry + edges/groups. */
    graph: OrchestraGraphWiringV2;
    /** Canonical starting state for the session. */
    initialState: Record<string, unknown>;
    /** Frontend/client-submitted actions per turn. */
    actions: OrchestraGraphAction[];
    /** Backend-visible retrieval sources available to retrieveContext. */
    retrievalSources?: OrchestraGraphRetrievalSource[];
    /** Graph-owned policy for model-callable runtime tools. */
    runtimeToolDefinitions?: OrchestraGraphRuntimeToolDefinition[];
    /** Named shared tool allowlists referenced by subagents[].toolSet. */
    toolSets?: OrchestraGraphToolSetRegistry;
    /** Named shared skill bundles referenced during authoring. */
    skillSets?: OrchestraGraphSkillSetRegistry;
    /** Named response schemas referenced by nodes[].outputSchema or subagents[].responseSchema. */
    responseSchemas?: OrchestraGraphResponseShapeRegistry;
    /** Per-agent cross-turn memory access policies. */
    memory?: OrchestraGraphMemoryConfig;
    /** Runtime behavior constraints. */
    options?: OrchestraGraphOptions;
    /** Optional workflow profile and limits for authoring validation and UI hints. */
    workflow?: OrchestraGraphWorkflowV2;
    /** Named context lane definitions referenced by groups, nodes, and agents. */
    lanes?: OrchestraGraphContextLaneRegistry;
    /** Shared whiteboard definitions referenced by nodes[].whiteboardAccess. */
    whiteboards?: OrchestraGraphWhiteboardRegistry;
}
export type OrchestraGraphConfigAny = OrchestraGraphConfigV1 | OrchestraGraphConfigV2;
export declare const isOrchestraGraphConfigV2: (config: OrchestraGraphConfigAny) => config is OrchestraGraphConfigV2;
/**
 * Nodes as a list regardless of schema version. v2 node objects structurally
 * satisfy the v1 node type (they only omit optional legacy fields), so the
 * shared v1 node type is the common denominator for read-only consumers.
 */
export declare const listOrchestraGraphNodes: (config: OrchestraGraphConfigAny) => OrchestraGraphNode[];
export declare const getOrchestraGraphNode: (config: OrchestraGraphConfigAny, nodeId: string) => OrchestraGraphNode | undefined;
/** Explicit entry node id on v2; first authored node on v1. */
export declare const resolveOrchestraGraphEntryNodeId: (config: OrchestraGraphConfigAny) => string | undefined;
