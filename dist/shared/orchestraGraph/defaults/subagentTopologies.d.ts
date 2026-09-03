/**
 * Modular subagent topologies attached under a host graph node.
 * Same host runtime: enter via playground3.spawnSubagent, await nested peer, resume host.
 * Does not advance OrchestraGraph edges (those use routeConditionKey).
 */
import type { OrchestraGraphNode, OrchestraGraphSubagentDiscussion, OrchestraGraphSubagentExpansion, OrchestraGraphSubagentTopologyBinding } from "../../orchestraGraphConfig";
/** Built-in modular topology ids (extensible via registry later). */
export declare const ORCHESTRA_GRAPH_SUBAGENT_TOPOLOGY_IDs: {
    readonly optionalSpawn: "optionalSpawn";
    readonly inlineExpansion: "inlineExpansion";
    readonly discussionRoom: "discussionRoom";
};
export type OrchestraGraphSubagentTopologyId = (typeof ORCHESTRA_GRAPH_SUBAGENT_TOPOLOGY_IDs)[keyof typeof ORCHESTRA_GRAPH_SUBAGENT_TOPOLOGY_IDs];
export type { OrchestraGraphSubagentTopologyBinding };
/** Effective child prompt: hard-coded section + tool prompt. */
export declare const composeSubagentTopologySpawnPrompt: (input: {
    binding: OrchestraGraphSubagentTopologyBinding;
    prompt: string;
}) => string;
export declare const resolveSubagentTopologyBindings: (node: Pick<OrchestraGraphNode, "subagentTopologies" | "subagentExpansion" | "subagentDiscussion" | "task">) => OrchestraGraphSubagentTopologyBinding[];
export declare const normalizeLegacySubagentTopologyBindings: (node: {
    subagentExpansion?: OrchestraGraphSubagentExpansion;
    subagentDiscussion?: OrchestraGraphSubagentDiscussion;
    task?: {
        goal?: string;
    };
}) => OrchestraGraphSubagentTopologyBinding[];
export declare const findDiscussionRoomBinding: (node: Pick<OrchestraGraphNode, "subagentTopologies" | "subagentExpansion" | "subagentDiscussion" | "task">) => OrchestraGraphSubagentTopologyBinding | undefined;
/** Shared room id for discussionRoom (binding preferred, legacy fallback). */
export declare const resolveDiscussionRoomId: (node: Pick<OrchestraGraphNode, "id" | "subagentTopologies" | "subagentExpansion" | "subagentDiscussion" | "task">) => string | undefined;
export declare const findSubagentTopologyBinding: (node: Pick<OrchestraGraphNode, "subagentTopologies" | "subagentExpansion" | "subagentDiscussion" | "task">, moduleRouteKey: string) => OrchestraGraphSubagentTopologyBinding | undefined;
/** First binding that allowlists the given peer agent id. */
export declare const findSubagentTopologyBindingForAgent: (node: Pick<OrchestraGraphNode, "subagentTopologies" | "subagentExpansion" | "subagentDiscussion" | "task">, agentId: string, preferredTopology?: string) => OrchestraGraphSubagentTopologyBinding | undefined;
export declare const collectSubagentTopologyAgentIds: (node: Pick<OrchestraGraphNode, "subagentTopologies" | "subagentExpansion" | "subagentDiscussion" | "task">) => string[];
export declare const listModuleRouteKeysForNode: (node: Pick<OrchestraGraphNode, "subagentTopologies" | "subagentExpansion" | "subagentDiscussion" | "task">) => string[];
/** Map-only group id for a modular plugin shell under a host. */
export declare const resolveSubagentModuleGroupId: (hostNodeId: string, topology: string) => string;
/** Map-only card id for a peer inside a modular plugin shell. */
export declare const resolveSubagentModuleNodeKey: (hostNodeId: string, topology: string, agentId: string) => string;
export declare const isSubagentModuleNodeKey: (nodeId: string) => boolean;
export declare const isSubagentModuleGroupId: (groupId: string) => boolean;
