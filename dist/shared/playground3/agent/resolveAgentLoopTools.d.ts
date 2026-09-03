import type { Playground3McpTool } from "../mcp/manifest";
import type { Playground3AgentCapabilities, Playground3PlanNextStepsCapability } from "./agentDefinition";
export declare const resolvePlayground3AgentLoopToolNames: (capabilities: Playground3AgentCapabilities | undefined, nodeToolNames: string[] | undefined, options?: {
    switchableGraphKeys?: readonly string[];
}) => string[];
export type Playground3SpawnableAgentRef = {
    id: string;
    description?: string;
};
export type Playground3LoadableSkillRef = {
    id: string;
    description?: string;
};
export type Playground3SwitchableGraphRef = {
    key: string;
    label?: string;
};
/** Capability-aware planNextSteps tool: description advertises the bounds. */
export declare const buildPlayground3PlanNextStepsTool: (capability: Playground3PlanNextStepsCapability) => Playground3McpTool;
/** Build spawnSubagent with an `agentId` enum so live models cannot invent ids. */
export declare const buildPlayground3SpawnSubagentTool: (allowedAgents: readonly (string | Playground3SpawnableAgentRef)[]) => Playground3McpTool;
export declare const buildPlayground3LoadSkillTool: (allowedSkills: readonly (string | Playground3LoadableSkillRef)[]) => Playground3McpTool;
export declare const buildPlayground3SwitchGraphTool: (graphs: readonly string[] | readonly Playground3SwitchableGraphRef[]) => Playground3McpTool;
export declare const appendPlayground3PseudoTools: (tools: Playground3McpTool[], capabilities: Playground3AgentCapabilities | undefined, options?: {
    spawnableAgents?: readonly Playground3SpawnableAgentRef[];
    loadableSkills?: readonly string[] | readonly Playground3LoadableSkillRef[];
    switchableGraphs?: readonly string[] | readonly Playground3SwitchableGraphRef[];
}) => Playground3McpTool[];
