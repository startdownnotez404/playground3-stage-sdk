import type { OrchestraGraphNode } from "../../orchestraGraphConfig";
import type { OrchestraGraphConfigV2 } from "../../orchestraGraph/v2/config";
import type { Playground3McpManifest, Playground3McpTool } from "./manifest";
export declare const resolvePlayground3NodeToolNames: (input: {
    graphConfig: OrchestraGraphConfigV2;
    node: OrchestraGraphNode;
    agent: OrchestraGraphConfigV2["subagents"][string];
}) => string[] | undefined;
export declare const filterPlayground3McpTools: (allTools: Playground3McpTool[], toolNames: string[] | undefined) => Playground3McpTool[];
export declare const assertPlayground3GraphToolsInManifest: (input: {
    graphConfig: OrchestraGraphConfigV2;
    manifest: Playground3McpManifest;
}) => void;
export declare const normalizePlayground3ToolNames: (toolNames: string[] | undefined) => string[] | undefined;
export declare const resolvePlayground3AgentToolNames: (input: {
    graphConfig: import("../../orchestraGraph/v2/config").OrchestraGraphConfigAny;
    agentId: string;
    agent: import("../../orchestraGraphConfig").OrchestraGraphConfigV1["subagents"][string];
}) => string[] | undefined;
