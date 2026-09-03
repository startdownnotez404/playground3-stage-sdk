import type { OrchestraGraphAgent, OrchestraGraphEdge } from "../../orchestraGraphConfig";
import type { OrchestraGraphConfigV2, OrchestraGraphNodeV2 } from "../../orchestraGraph/v2/config";
import type { Playground3PlanNextStepsCapability } from "../agent/agentDefinition";
/**
 * playground3.planNextSteps — control-plane append-only graph growth.
 *
 * The agent loop validates args against a Playground3PlanContext (live graph
 * accessor owned by FrontendGraphTurnExecutor) and returns an ok tool result;
 * the executor applies the materialized fragment when the node completes.
 * Fragments persist into checkpoint state (plannedFragments[]) and every turn
 * seeds its live graph as authored ∪ plannedFragments, so resume replays.
 */
/** Inline new-agent definition (requires capability.allowNewAgents). */
export interface Playground3PlannedNewAgentArgs {
    id?: string;
    description: string;
    agentPersona: string;
    performerId?: string;
    tools?: string[];
    toolSet?: string;
    responseSchema?: string;
}
/** One planned node entry — exactly one of agent / newAgent. */
export interface Playground3PlannedNodeArgs {
    id?: string;
    agent?: string;
    newAgent?: Playground3PlannedNewAgentArgs;
    task?: unknown;
    outcomes?: string[];
    inheritHistory?: unknown;
    toolCallPolicy?: unknown;
    loopPolicy?: unknown;
}
export interface Playground3PlannedEdgeArgs {
    from: string;
    to: string;
    routeCondition?: string;
    maxIterations?: number;
}
export interface Playground3PlanNextStepsArgs {
    attachAfter?: string;
    nodes: Playground3PlannedNodeArgs[];
    edges: Playground3PlannedEdgeArgs[];
}
/**
 * Materialized append-only fragment. Structurally identical to authored
 * registry entries (nodes carry plannedFragmentId provenance), so audit is a
 * registry diff and resume re-seeds the same live graph.
 */
export interface Playground3PlannedFragment {
    fragmentId: string;
    plannedBy: {
        nodeId: string;
        nodeRunId: string;
        agentId: string;
    };
    /** Node the fragment hangs off (args.attachAfter ?? current node). */
    attachAfter: string;
    nodes: OrchestraGraphNodeV2[];
    edges: OrchestraGraphEdge[];
    /** Inline newAgent definitions merged into the live subagents map. */
    newAgents: Record<string, OrchestraGraphAgent>;
    /** Computed plannedDepth per node id (authored = 0, child = parent + 1). */
    depths: Record<string, number>;
    /**
     * Grouped graphs: planned nodes inherit the anchor node's group so the
     * merged config keeps satisfying "every node in exactly one group".
     */
    groupIdByNodeId?: Record<string, string>;
}
/** Live-graph view the agent loop validates planNextSteps calls against. */
export interface Playground3PlanContext {
    capability: Playground3PlanNextStepsCapability;
    /** Current node — anchor when args.attachAfter is omitted. */
    anchorNodeId: string;
    /** Turn node-run id — namespace prefix for planned ids (`{nodeRunId}::{local}`). */
    nodeRunId: string;
    agentId: string;
    liveGraph: {
        nodes: () => Readonly<Record<string, OrchestraGraphNodeV2>>;
        edges: () => readonly OrchestraGraphEdge[];
        subagents: () => Readonly<Record<string, OrchestraGraphAgent>>;
    };
    /** Nodes that already ran (completed or failed) this session. */
    executedNodeIds: () => readonly string[];
    /** plannedDepth of a node (authored = 0). */
    plannedDepthOf: (nodeId: string) => number;
    plannedNodeCountThisTurn: () => number;
    plannedFragmentCountThisTurn: () => number;
    /** workflow.limits.maxPlannedNodesPerTurn cap, when authored. */
    maxPlannedNodesPerTurn?: number;
    /** App manifest tool names — newAgent.tools must be a subset. */
    manifestToolNames: readonly string[];
    /** Authored config (performers / toolSets / responseSchemas references). */
    graphConfig: OrchestraGraphConfigV2;
    /** Executor records validated fragments; applies them on node completion. */
    onFragmentPlanned: (fragment: Playground3PlannedFragment) => void;
}
export declare const PLAYGROUND3_PLAN_NEXT_STEPS_DEFAULTS: {
    readonly maxPlannedDepth: 3;
    readonly maxNodesPerCall: 8;
    readonly rejoinAuthoredGraph: true;
    readonly allowNewAgents: false;
};
/** Auto-namespaced planned id: `{turnNodeRunId}::{localId}`. */
export declare const buildPlayground3PlannedNodeId: (nodeRunId: string, localId: string) => string;
export declare const isPlayground3PlannedNodeId: (nodeId: string) => boolean;
/**
 * Routing shadowing rule: a planned edge shadows an authored edge with the
 * same (from, routeCondition) pair; an unconditional planned edge shadows the
 * authored unconditional fallback for the same from node.
 */
export declare const applyPlannedEdgeShadowing: (input: {
    authoredEdges: readonly OrchestraGraphEdge[];
    plannedEdges: readonly OrchestraGraphEdge[];
}) => OrchestraGraphEdge[];
