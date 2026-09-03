import type { OrchestraGraphConfigV1, OrchestraGraphNode } from "../orchestraGraphConfig";
import type { OrchestraGraphConfigAny } from "../orchestraGraph/v2/config";
export declare const normalizePlayground3ToolNames: (toolNames: string[] | undefined) => string[] | undefined;
export declare const resolvePlayground3AgentToolNames: (input: {
    graphConfig: OrchestraGraphConfigAny;
    agentId: string;
    agent: OrchestraGraphConfigV1["subagents"][string];
}) => string[] | undefined;
export declare const isPlayground3NodeToolsActive: (node: OrchestraGraphNode) => boolean;
/** Pseudo-tools activated per node; excluded from provider-session cache allowlists. */
export declare const PLAYGROUND3_NODE_SCOPED_PSEUDO_TOOL_NAMES: readonly ["subagentExpansion", "subagentDiscussion", "retrieveContext", "requestHumanInput"];
export declare const resolvePlayground3ProviderSessionToolNames: (toolNames: string[] | undefined) => string[] | undefined;
/**
 * Active runtime tool allowlist for a node turn.
 * Agent toolSet/tools define the stable allowlist; nodes activate tools and may add pseudo-tools.
 */
export declare const resolvePlayground3NodeToolNames: (input: {
    graphConfig: OrchestraGraphConfigAny;
    node: OrchestraGraphNode;
    agent: OrchestraGraphConfigV1["subagents"][string];
}) => string[] | undefined;
