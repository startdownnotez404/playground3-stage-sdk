/** PG3 pseudo-tools registered in the agent loop when capabilities allow. */
export declare const PLAYGROUND3_PSEUDO_TOOL_NAMES: {
    readonly spawnSubagent: "playground3.spawnSubagent";
    readonly askHuman: "playground3.askHuman";
    readonly loadSkill: "playground3.loadSkill";
    /** Append-only runtime graph growth — validated in-loop, applied by executor. */
    readonly planNextSteps: "playground3.planNextSteps";
    /** Platform mode switch — executed via MCP + humanApproval, not the pseudo partition. */
    readonly switchGraph: "playground3.switchGraph";
};
export type Playground3PseudoToolName = (typeof PLAYGROUND3_PSEUDO_TOOL_NAMES)[keyof typeof PLAYGROUND3_PSEUDO_TOOL_NAMES];
/** Bounds controlling what a planNextSteps call may append (control plane). */
export interface Playground3PlanNextStepsCapability {
    /** Existing subagents ids a plan may reference (default: all authored agents). */
    allowedAgents?: string[];
    /** Plans may define brand-new agents inline (persona, performer, tools). */
    allowNewAgents?: boolean;
    /** Planned edges may target authored nodes (detour rejoin). Default true. */
    rejoinAuthoredGraph?: boolean;
    /** Breadth cap per call. */
    maxNodesPerCall?: number;
    /** Longest chain of consecutive planned nodes from the authored anchor. Default 3. */
    maxPlannedDepth?: number;
    /** Gate the call through the loop's human-approval machinery. Default false. */
    approval?: boolean;
}
export interface Playground3AgentCapabilities {
    /** MCP + app tools the loop may call */
    tools?: string[];
    /** Subagent ids the parent may spawn mid-loop */
    spawnSubagents?: string[];
    /** Allow playground3.askHuman clarifying questions */
    askHuman?: boolean;
    /** Catalog skill ids loadable via playground3.loadSkill */
    loadSkills?: string[];
    /**
     * Allow playground3.switchGraph when the host supplies switchable graph keys.
     * Defaults to true whenever switchable graphs are provided.
     */
    switchGraph?: boolean;
    /** Allow playground3.planNextSteps runtime graph growth (bounded). */
    planNextSteps?: Playground3PlanNextStepsCapability;
}
export interface Playground3AgentProfile {
    name: string;
    icon?: string;
    /**
     * Semantic role of the node the agent runs as — lets the avatar render a
     * proper MUI icon instead of an emoji glyph. Ignored when `icon` is set.
     */
    iconKind?: "planner" | "verifier" | "worker";
    color?: string;
    roleLabel?: string;
}
/** App-owned agent definition — capabilities enforced by the executor. */
export interface Playground3AgentDefinition {
    id: string;
    name: string;
    description: string;
    agentPersona: string;
    performerId?: string;
    capabilities: Playground3AgentCapabilities;
    /** Nested subagent definitions spawnable by this agent */
    subagents?: Record<string, Playground3AgentDefinition>;
}
/** Pseudo tools that run inside executePseudoToolCalls (not humanApproval partition). */
export declare const isPlayground3InlinePseudoToolName: (toolName: string) => boolean;
export declare const isPlayground3PseudoToolName: (toolName: string) => toolName is Playground3PseudoToolName;
