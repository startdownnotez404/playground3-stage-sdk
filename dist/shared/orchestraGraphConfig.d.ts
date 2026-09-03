/**
 * Orchestra Graph Config
 *
 * Defines a graph-based orchestra execution schema where the author specifies
 * an explicit DAG of agent nodes connected by outcome-based conditional edges.
 *
 * This is an alternative to the fixed-profile phase-planning system:
 * - Fixed profiles (singleStep, planExecuteVerify, etc.) select from a pre-built catalog.
 * - Graph configs let the author directly define the execution topology with
 *   conditional routing, backward loops, and parallel groups.
 *
 * The graph schema is parsed from the user-authored JSON (or workflow.md code block)
 * and drives the orchestra coordinator at runtime.
 *
 * Canonical runtime shape:
 * - performers
 * - subagents
 * - toolSets
 * - performerId
 * - subagents[].responseSchema
 * - subagents[].toolSet
 * - graph.nodes[].agent
 * - graph.nodes[].outputSchema
 * - initialState
 * - actions
 * - runtimeToolDefinitions
 * - responseSchemas
 * - options
 *
 * Accepted authoring aliases are normalized into that runtime shape by the parser.
 * Preferred aliases for new graph files include:
 * - models -> performers
 * - agents -> subagents
 * - modelId -> performerId
 * - runtimeTools -> agent tools
 * - agentId -> graph.nodes[].agent
 * - initialCheckpoint -> initialState
 * - tools -> actions
 * - response -> responseSchemas
 * - runtime -> options
 */
import type { DeclarativePayloadValueType } from "./declarativeOrchestratorConfig";
import type { HumanApprovalConfig } from "./humanApprovalConfig";
import type { MemoryAccessPolicy } from "./memoryConfig";
import type { Playground3ContextLaneScope } from "./playground3/contextCompaction";
export interface OrchestraGraphPerformer {
    /** Stable identifier referenced by agents. */
    id: string;
    /** Provider name (e.g. "openai", "anthropic", "ollama"). */
    provider: string;
    /** Model identifier (e.g. "gpt-4o-mini", "claude-sonnet-4-20250514"). */
    model: string;
    /** Relative cost classification. */
    costTier?: "low" | "medium" | "high";
    /** Capability tags used for performer routing. */
    strengths?: string[];
}
export declare const ORCHESTRA_GRAPH_OUTPUT_KINDs: {
    readonly text: "text";
    readonly json: "json";
};
export type OrchestraGraphOutputKind = (typeof ORCHESTRA_GRAPH_OUTPUT_KINDs)[keyof typeof ORCHESTRA_GRAPH_OUTPUT_KINDs];
export interface OrchestraGraphResponseShapeLane {
    /** Include whisper child runs in context-lane compaction digests. Default false. */
    includeInCompaction?: boolean;
    /** Roll whisper history into the parent node handover history row. Default false. */
    includeInParentDigest?: boolean;
    /** Append a separate history item for this whisper. Default false. */
    appendHistoryItem?: boolean;
}
export interface OrchestraGraphAgentOutput {
    kind: OrchestraGraphOutputKind;
    /** Field-level type map for JSON outputs. */
    schema?: Record<string, DeclarativePayloadValueType>;
    /** Optional template for composed display text using schema.* placeholders. */
    displayTemplate?: string;
    /** Optional template for composed durable history text using schema.* placeholders. */
    historyTemplate?: string;
    /** Lane policy for whisper shapes; handover shapes typically omit this. */
    lane?: OrchestraGraphResponseShapeLane;
}
export interface OrchestraGraphAgent {
    /** Human-readable description of the agent's role. */
    description: string;
    /** Authored agent persona / instructions; joined into the runtime system message. */
    agentPersona: string;
    /** Performer to use for this agent (references OrchestraGraphPerformer.id). Authoring alias: modelId. */
    performerId?: string;
    /** Named shared tool allowlist referenced from OrchestraGraphConfigV1.toolSets. */
    toolSet?: string;
    /**
     * Legacy runtime-tool allowlist for this agent.
     * Authoring alias: runtimeTools.
     * Prefer toolSet when the same allowlist is reused across agents.
     * This allowlist defines the stable provider-session tool surface for the agent.
     */
    tools?: string[];
    /** Named response schema entry for this agent. Node outputSchema still overrides it. */
    responseSchema?: string;
    /** Legacy output shape contract. Prefer graph.nodes[].outputSchema. */
    output?: OrchestraGraphAgentOutput;
    /**
     * When true, Playground2 enables provider-native reasoning when supported and
     * ensures the active JSON output contract includes a `reasoning` string field.
     */
    reasoning?: boolean;
    /** Context lane id for provider-session reuse when this agent runs. */
    lane?: string;
}
export interface OrchestraGraphPromptInjection {
    role: string;
    /** Template placeholders must use explicit checkpoint bindings such as {{checkpoint.board}}. */
    template: string;
}
export interface OrchestraGraphHistorySelector {
    /** Match prior node outputs emitted by this node id. */
    nodeId?: string;
    /** Match prior node outputs emitted by this agent id. */
    agentId?: string;
}
export declare const ORCHESTRA_GRAPH_HISTORY_GLOBAL_CONTEXT_KIND: "global-context";
export declare const ORCHESTRA_GRAPH_HISTORY_NODE_KIND: "node";
export declare const ORCHESTRA_GRAPH_HISTORY_AGENT_KIND: "agent";
/** Spawn/discussion-relative agent id: resolve to the agent being spawned. */
export declare const ORCHESTRA_GRAPH_HISTORY_SELF_AGENT_ID: "$self";
export type OrchestraGraphHistorySelectorKind = typeof ORCHESTRA_GRAPH_HISTORY_GLOBAL_CONTEXT_KIND | typeof ORCHESTRA_GRAPH_HISTORY_NODE_KIND | typeof ORCHESTRA_GRAPH_HISTORY_AGENT_KIND;
/** Inject the active session context-lane compaction (rolling summary + node digests). */
export interface OrchestraGraphGlobalContextHistorySelector {
    kind: typeof ORCHESTRA_GRAPH_HISTORY_GLOBAL_CONTEXT_KIND;
    /** Context lane id. Defaults to `main`. */
    laneId?: string;
}
export type OrchestraGraphHistoryInheritanceEntry = "*" | string | OrchestraGraphHistorySelector | OrchestraGraphGlobalContextHistorySelector;
export interface OrchestraGraphNodeApproval {
    prompt: string;
    expectedInputType?: string;
    formConfig?: Record<string, unknown>;
}
export declare const ORCHESTRA_GRAPH_NODE_TYPEs: {
    readonly harness: "harness";
    readonly plan: "plan";
    readonly execute: "execute";
    readonly verify: "verify";
    readonly retry: "retry";
    readonly thinking: "thinking";
    readonly tool: "tool";
    readonly query: "query";
    readonly update: "update";
    readonly create: "create";
    readonly delete: "delete";
    readonly result: "result";
    readonly intermission: "intermission";
};
export type OrchestraGraphNodeType = (typeof ORCHESTRA_GRAPH_NODE_TYPEs)[keyof typeof ORCHESTRA_GRAPH_NODE_TYPEs];
export interface OrchestraGraphNodeTemplate {
    /** Legacy identifier referenced by older supervisor expansions. */
    id: string;
    /** Which subagent runs each expanded instance. */
    agent: string;
    /** Semantic node type for UI rendering. */
    nodeType?: OrchestraGraphNodeType;
    /** Named response schema entry for expanded nodes. */
    outputSchema?: string;
    /** Declared outcomes for routing after the template group completes. */
    outcomes: string[];
    /** Binding variable name provided by supervisor (e.g., "playerName"). */
    expansionKey: string;
    /** Whether instances of this template run in parallel. Default: true. */
    parallel?: boolean;
    /** Prompt injections supporting {{expansion.*}} in addition to {{checkpoint.*}}. */
    promptInjections?: OrchestraGraphPromptInjection[];
    /** History inheritance for expanded instances. */
    inheritHistory?: OrchestraGraphHistoryInheritanceEntry[];
    /** Tool call policy for expanded instances. */
    toolCallPolicy?: OrchestraGraphNodeToolCallPolicy;
}
export declare const ORCHESTRA_GRAPH_SUPERVISOR_EXPANSION_MODEs: {
    readonly bindings: "bindings";
    readonly edgeCreation: "edge-creation";
};
export declare const ORCHESTRA_GRAPH_PSEUDO_TOOL_NAMEs: {
    readonly subagentExpansion: "subagentExpansion";
    readonly subagentDiscussion: "subagentDiscussion";
    readonly requestHumanInput: "requestHumanInput";
    readonly retrieveContext: "retrieveContext";
};
export declare const ORCHESTRA_GRAPH_RETRIEVAL_SOURCE_KINDs: {
    readonly sessionHistory: "sessionHistory";
};
export type OrchestraGraphRetrievalSourceKind = (typeof ORCHESTRA_GRAPH_RETRIEVAL_SOURCE_KINDs)[keyof typeof ORCHESTRA_GRAPH_RETRIEVAL_SOURCE_KINDs];
export interface OrchestraGraphRetrievalSource {
    /** Stable retrieval source id referenced by node-level retrieval config. */
    id: string;
    /** Backend retrieval implementation surface. */
    kind: OrchestraGraphRetrievalSourceKind;
    /** Optional author-facing description for the source. */
    description?: string;
    /** Default maxResults cap enforced by this source. */
    maxResults?: number;
    /** Optional session-history role filter. */
    roleFilter?: string[];
    /** Optional session-history item-type filter. */
    itemTypes?: string[];
}
export interface OrchestraGraphNodeRetrieval {
    /** Allowlisted retrieval source ids this node may query through retrieveContext. */
    sourceIds: string[];
    /** Optional node-level maxResults cap applied on top of the source defaults. */
    maxResults?: number;
}
export type OrchestraGraphSupervisorExpansionMode = (typeof ORCHESTRA_GRAPH_SUPERVISOR_EXPANSION_MODEs)[keyof typeof ORCHESTRA_GRAPH_SUPERVISOR_EXPANSION_MODEs];
export interface OrchestraGraphSupervisorExpansion {
    /** Allowlist of graph node ids this supervisor may expand. Legacy authoring alias: templateIds. */
    nodeIds: string[];
    /** How template groups relate to each other during execution. */
    executionOrder: "sequential" | "allParallel";
    /** How the backend asks the model to describe the supervisor plan. */
    mode: OrchestraGraphSupervisorExpansionMode;
}
export declare const ORCHESTRA_GRAPH_SUBAGENT_EXPANSION_MODEs: {
    readonly inLoop: "inLoop";
    readonly deferred: "deferred";
};
export type OrchestraGraphSubagentExpansionMode = (typeof ORCHESTRA_GRAPH_SUBAGENT_EXPANSION_MODEs)[keyof typeof ORCHESTRA_GRAPH_SUBAGENT_EXPANSION_MODEs];
export interface OrchestraGraphNodeLoopPolicy {
    maxSteps?: number;
    maxToolCallsPerStep?: number;
    maxPeerCalls?: number;
}
export type OrchestraGraphNodeTaskCriterionMatch = "success" | "retryableFailure" | Record<string, unknown>;
export interface OrchestraGraphNodeTaskCriterion {
    type: "toolResult";
    toolName?: string;
    match: OrchestraGraphNodeTaskCriterionMatch;
}
export interface OrchestraGraphNodeTaskRetryRule extends OrchestraGraphNodeTaskCriterion {
    maxAttempts?: number;
}
export interface OrchestraGraphNodeTaskOutput {
    routeConditionKey?: string;
    /**
     * Why this graph route was chosen (optional but recommended).
     * Distinct from module enter `routeReason` — this advances OrchestraGraph.
     */
    routeReason?: string;
    responseText?: string;
    /**
     * When set, append this node's public history text (rendered `historyTemplate`,
     * else `speech` / `narration`) to the named lane as soon as the node completes.
     * Typically `"main"`. Do not set on secret nodes.
     */
    broadcastLane?: string;
}
export interface OrchestraGraphNodeTaskContract {
    goal: string;
    rules?: string[];
    /** Discoverable skill catalog (name + description only). Load full bodies via playground3.loadSkill. */
    skills?: string[];
    /** Skill ids whose full SKILL.md bodies are always injected into the task contract. */
    preloadSkills?: string[];
    tools?: string[];
    successCriteria?: OrchestraGraphNodeTaskCriterion[];
    retryOn?: OrchestraGraphNodeTaskRetryRule[];
    output?: OrchestraGraphNodeTaskOutput;
}
export interface OrchestraGraphSubagentExpansion {
    /** Allowlist of subagent ids this node may call before deciding its final output. */
    agentIds: string[];
    /** How selected subagent calls relate to each other during execution. */
    executionOrder: "sequential" | "allParallel";
    /** Optional history selection passed into each spawned subagent call. */
    inheritHistory?: OrchestraGraphHistoryInheritanceEntry[];
    /**
     * `inLoop` (default): peers run inside the parent agent loop via subagentExpansion tool.
     * `deferred`: legacy re-entry — executeDeferredSubagentExpansion after the parent node completes.
     */
    mode?: OrchestraGraphSubagentExpansionMode;
    /** Named response schemas (whisper_* or explicit) allowed per interaction.responseShape. */
    allowedWhisperShapes?: string[];
    /** Default whisper shape when an interaction omits responseShape. */
    defaultWhisperShape?: string;
}
export interface OrchestraGraphSubagentDiscussionReadiness {
    /** Content fields that must be present and non-empty for a participant to count as ready. */
    requiredFields?: string[];
    /** When set, all ready participants must share the same non-empty value for this field. */
    consensusField?: string;
}
export interface OrchestraGraphSubagentDiscussion {
    /** Allowlist of subagent ids that may participate in the shared discussion room. */
    agentIds: string[];
    /** How selected discussion turns relate to each other during one tool call. */
    executionOrder: "sequential" | "allParallel";
    /** Optional history selection passed into each spawned discussion turn. */
    inheritHistory?: OrchestraGraphHistoryInheritanceEntry[];
    /** Named response schemas (whisper_* or explicit) allowed per turn.responseShape. */
    allowedWhisperShapes?: string[];
    /** Default whisper shape when a turn omits responseShape. */
    defaultWhisperShape?: string;
    /** Optional stable room key; defaults to the parent node id when omitted. */
    roomId?: string;
    /** Checkpoint-backed prompts seeded at the start of the discussion room each node turn. */
    promptInjections?: OrchestraGraphPromptInjection[];
    /** Graph-declared rules for when a participant counts as ready in this node. */
    readiness?: OrchestraGraphSubagentDiscussionReadiness;
}
export type OrchestraGraphPeerWhisperPolicy = Pick<OrchestraGraphSubagentExpansion, "allowedWhisperShapes" | "defaultWhisperShape">;
/** How much of the host's current working thread a topology peer inherits. */
export type OrchestraGraphSpawnInheritHostWorking = "none" | "lastExchange" | "full";
/**
 * Modular subagent topology attached under a host node (same runtime).
 * Enter via `playground3.spawnSubagent` for an allowlisted peer; does not advance graph edges.
 */
export interface OrchestraGraphSubagentTopologyBinding {
    /** Platform modular topology id (registry key). */
    topology: string;
    /** Allowlisted peer agent ids. */
    agentIds: string[];
    /** Soft-ask / map: why this module exists on the host. */
    objective: string;
    /** Hard-coded child prompt section; tool `prompt` is appended after. */
    promptSection?: string;
    executionOrder?: "sequential" | "allParallel";
    /** Prior node/global-context lane selectors passed into the spawned peer. */
    inheritHistory?: OrchestraGraphHistoryInheritanceEntry[];
    /**
     * Host working-thread slice for the peer.
     * Default `"none"`: promptSection + tool prompt (+ inheritHistory / agent memory) only.
     */
    inheritHostWorking?: OrchestraGraphSpawnInheritHostWorking;
    /**
     * When true, include the spawned peer's own agent lane history.
     * Default false. Lane write-after-spawn is unchanged.
     */
    inheritAgentMemory?: boolean;
    /**
     * Shared discussion-room id for topology "discussionRoom".
     * Maps to lane `discussion:{roomId}` for inherit + write.
     */
    roomId?: string;
}
export interface OrchestraGraphNode {
    /** Unique node identifier within the graph. */
    id: string;
    /** Which agent runs at this node (key into the subagents map). Authoring alias: agentId. */
    agent: string;
    /** Optional semantic node type used by shared graph UIs for iconography. */
    nodeType?: OrchestraGraphNodeType;
    /** Named top-level response schema entry for this node's content payload. */
    outputSchema?: string;
    /** Include prior non-node-output history rows from this thread before node outputs. */
    inheritSessionContext?: boolean;
    /**
     * Include prior node outputs from this thread before prompt injections.
     * `"*"` means all prior node outputs in chronological order.
      * Legacy string entries are matched against prior node ids.
      * Structured selectors can match by nodeId and/or agentId.
     */
    inheritHistory?: OrchestraGraphHistoryInheritanceEntry[];
    /**
     * Named outcomes this node can produce.
     * The agent's output JSON should include an `outcome` field matching one of these.
     * Edges reference outcomes for conditional routing.
     * When no outcome matches, the defaultOutcome from options is used.
     */
    outcomes: string[];
    /** Whether multiple bindings of this node may run in parallel when expanded by a supervisor. */
    parallel?: boolean;
    /**
     * Optional node-level tool activation and call policy.
     *
     * Agent `toolSet` / `tools` own the stable allowlist and provider-session cache surface.
     * Nodes use this policy to activate tools for the step and steer required/preferred tools.
     *
     * Canonical stored shape:
     * - `forceToolCall`: when true, runtime requires at least one tool call.
     * - `forceToolNames`: when set, at least one of these tools must be called (subset of agent allowlist).
     * - `toolWeights`: per-tool scalar hints in [0,1], total <= 1.
     * - `agentDecidesAfterTool`: when true, after a tool finishes the model keeps
     *   deciding (final JSON / retry) instead of auto-completing the node.
     *
     * Authoring convenience accepted by parser:
     * - `toolCallPolicy` may be a direct map: `{ "state.patch": 1, "chat.respond": 0.25 }`
     * - `toolCallPolicy` may be an array: `[ { "state.patch": 1 }, { "chat.respond": 0.25 } ]`
     * Both shorthand forms normalize to canonical `toolWeights` and imply `forceToolCall: true`.
     *
     * The parser enforces `sum(toolWeights) <= 1`.
     */
    toolCallPolicy?: OrchestraGraphNodeToolCallPolicy;
    /** Local autonomous task contract owned by this node. */
    task?: OrchestraGraphNodeTaskContract;
    /** Explicit checkpoint-derived prompt messages to inject for this node only. */
    promptInjections?: OrchestraGraphPromptInjection[];
    /** Explicit human approval gate for this node. */
    approval?: OrchestraGraphNodeApproval;
    /** Allowlisted backend retrieval sources for retrieveContext calls on this node. */
    retrieval?: OrchestraGraphNodeRetrieval;
    /** When set, this node is a supervisor that expands templates at runtime. */
    supervisorExpansion?: OrchestraGraphSupervisorExpansion;
    /**
     * Modular subagent topologies under this host (preferred).
     * Enter via playground3.spawnSubagent for an allowlisted peer; same runtime await.
     */
    subagentTopologies?: OrchestraGraphSubagentTopologyBinding[];
    /** @deprecated Prefer subagentTopologies with topology "inlineExpansion". */
    subagentExpansion?: OrchestraGraphSubagentExpansion;
    /** @deprecated Prefer subagentTopologies with topology "discussionRoom". */
    subagentDiscussion?: OrchestraGraphSubagentDiscussion;
    /**
     * When true, this node always uses the bounded in-node agent loop (tools, whispers, handover).
     * Also implied when subagentExpansion, subagentDiscussion, active tools, or toolCallPolicy are present.
     */
    autonomous?: boolean;
    /** Per-node agent loop limits; falls back to workflow.limits then defaults. */
    loopPolicy?: OrchestraGraphNodeLoopPolicy;
    /** Context lane id for provider-session reuse when this node runs. */
    lane?: string;
    /**
     * When set, this node was composed from a host's subagentTopologies binding
     * (top1 + modular → top2). Host spawn tool targets this peer.
     */
    moduleHostId?: string;
    /** Modular topology id this composed peer belongs to (e.g. optionalSpawn). */
    moduleTopologyId?: string;
}
export interface OrchestraGraphNodeToolCallPolicy {
    /** Require at least one tool call for this node's agent turn. */
    forceToolCall?: boolean;
    /** Require at least one tool call from this subset when provided. */
    forceToolNames?: string[];
    /**
     * Per-tool scalar weights in [0,1].
     * Runtime can use these as tool-selection preference hints.
     * The total sum must be <= 1.
     */
    toolWeights?: Record<string, number>;
    /**
     * When true, after a tool call completes the agent keeps control of the loop
     * (emit final JSON, retry, etc.) instead of auto-completing the node.
     */
    agentDecidesAfterTool?: boolean;
}
export interface OrchestraGraphEdge {
    /** Source node id. */
    from: string;
    /** Destination node id. */
    to: string;
    /**
     * Optional route condition.
     * When set, this edge is only taken if the source node emits a matching routeConditionKey.
     * When absent, the edge is unconditional (always taken).
     */
    routeCondition?: string;
    /** Legacy alias preserved for existing playground runtime compatibility. */
    outcome?: string;
    /**
     * Optional prompt-evaluated condition.
     *
     * When set, runtime evaluates this prompt to decide whether the edge should
     * be traversed after outcome filtering passes.
     */
    conditionPrompt?: string;
    /**
     * Maximum iterations for backward/loop edges.
     * Prevents infinite loops. When the cap is reached, execution moves to the
     * next available unconditional forward edge or terminates.
     */
    maxIterations?: number;
    /**
     * `module` = composed modular plug-in attachment (moduleRouteKey enter;
     * ignored by graph handover). Default / omitted = normal graph edge.
     */
    kind?: "graph" | "module";
}
export interface OrchestraGraphContextLaneDefinition {
    /** Optional display label for UI / errors. */
    label?: string;
    /** Compaction scope for this lane. */
    scope: Playground3ContextLaneScope;
    /**
     * When unscrolled tail in this lane exceeds this token estimate, trigger
     * compaction in addition to the default item-count threshold.
     */
    compactWhenTailTokensExceed?: number;
}
export type OrchestraGraphContextLaneRegistry = Record<string, OrchestraGraphContextLaneDefinition>;
export interface OrchestraGraphGroup {
    /** Stable group identifier. */
    id: string;
    /** Optional display label for UI rendering. */
    label?: string;
    /**
     * Optional group objective (e.g. composed modular plugin objective from
     * subagentTopologies[].objective).
     */
    objective?: string;
    /** Node ids that belong to this group. */
    nodeIds: string[];
    /** Exit node used to resolve group outcome and group output. */
    exitNodeId: string;
    /** Output shape emitted for this group's checkpoint output. */
    outputSchema?: Record<string, DeclarativePayloadValueType>;
    /** Context lane id for nodes in this group. */
    lane?: string;
}
export interface OrchestraGraphGroupEdge {
    /** Source group id. */
    from: string;
    /** Destination group id. */
    to: string;
    /** Optional route condition from the source group's exit node. */
    routeCondition?: string;
    /** Legacy alias preserved for existing playground runtime compatibility. */
    outcome?: string;
    /** Optional prompt-evaluated condition for grouped routing. */
    conditionPrompt?: string;
    /** Maximum iterations for backward/loop edges. */
    maxIterations?: number;
}
export type OrchestraGraphPriorGroupOutputs = Record<string, Record<string, unknown>>;
export interface OrchestraGraphParallelGroup {
    /** Node ids that execute concurrently within this group. */
    nodeIds: string[];
}
export interface OrchestraGraph {
    /** Ordered node definitions. First node is the entry point. */
    nodes: OrchestraGraphNode[];
    /** Directed edges connecting nodes. */
    edges: OrchestraGraphEdge[];
    /** Groups of nodes that can run in parallel. */
    parallel: OrchestraGraphParallelGroup[];
    /** Optional one-level grouped execution definition. */
    groups?: OrchestraGraphGroup[];
    /** Optional edges between groups when grouped mode is enabled. */
    groupEdges?: OrchestraGraphGroupEdge[];
    /** Legacy reusable node definitions for graphs that still expand via nodeTemplates. */
    nodeTemplates?: OrchestraGraphNodeTemplate[];
}
export interface OrchestraGraphAction {
    /**
     * Action type identifier submitted from the frontend.
     * Authoring aliases: name, toolName.
     */
    actionType: string;
    /** Human-readable description of the action. */
    description?: string;
    /** Field-level type map for the action payload. Authoring alias: inputSchema. */
    payloadSchema?: Record<string, DeclarativePayloadValueType>;
    /** Provider-facing JSON Schema for prompt tool calling. */
    inputJsonSchema?: Record<string, unknown>;
    /** Alias for inputJsonSchema used by some route manifests. */
    parameters?: Record<string, unknown>;
    /** Optional extra prompt guidance appended to the tool description. */
    promptHint?: string;
    /** Optional manual approval policy for this frontend-owned action. */
    humanApproval?: HumanApprovalConfig;
}
export interface OrchestraGraphRuntimeToolDefinition {
    /** Stable runtime tool identifier referenced by agent tool allowlists. */
    name: string;
    /** Optional author-facing description override. */
    description?: string;
    /** Optional parameter schema override or declaration for the runtime tool. */
    paramSchema?: Record<string, DeclarativePayloadValueType>;
    /** Optional human approval policy owned by the graph contract. */
    humanApproval?: HumanApprovalConfig;
}
export type OrchestraGraphToolSetRegistry = Record<string, string[]>;
/** Named shared skill allowlists referenced from graph nodes or authoring bundles. */
export type OrchestraGraphSkillSetRegistry = Record<string, string[]>;
export interface OrchestraGraphResponseShape {
    kind: OrchestraGraphOutputKind;
    schema?: Record<string, DeclarativePayloadValueType>;
    /** Optional template for composed display text using schema.* placeholders. */
    displayTemplate?: string;
    /** Optional template for composed durable history text using schema.* placeholders. */
    historyTemplate?: string;
    /** Lane policy for whisper shapes; handover shapes typically omit this. */
    lane?: OrchestraGraphResponseShapeLane;
}
export type OrchestraGraphResponseShapeRegistry = Record<string, OrchestraGraphResponseShape>;
export type OrchestraGraphMemoryConfig = Record<string, MemoryAccessPolicy>;
export interface OrchestraGraphOptions {
    /** Maximum number of turns before the session auto-closes. */
    maxTurns?: number;
    /** Per-turn timeout in milliseconds. */
    turnTimeout?: number;
    /**
     * Fallback outcome used when an agent does not explicitly declare one.
     * Defaults to "done".
     */
    defaultOutcome?: string;
}
export declare const ORCHESTRA_GRAPH_WORKFLOW_PROFILEs: {
    readonly strict: "strict";
    readonly dynamic: "dynamic";
    readonly hybrid: "hybrid";
};
export type OrchestraGraphWorkflowProfile = (typeof ORCHESTRA_GRAPH_WORKFLOW_PROFILEs)[keyof typeof ORCHESTRA_GRAPH_WORKFLOW_PROFILEs];
export interface OrchestraGraphWorkflowMacro {
    /** Human-readable unit for outer rhythm (turn, pass, phase). */
    unit?: string;
    /** How the macro unit advances (humanInput, frontendAction, routeOutcome). */
    advanceBy?: string;
}
export interface OrchestraGraphWorkflowLimits {
    /** Maximum subagentExpansion loopbacks per parent node. */
    maxSubagentLoopsPerNode?: number;
    /** Maximum supervisor expansions per graph turn (authoring hint). */
    maxSupervisorExpansionsPerTurn?: number;
}
/** Authoring contract for strict, dynamic, or hybrid orchestration styles. */
export interface OrchestraGraphWorkflow {
    profile: OrchestraGraphWorkflowProfile;
    macro?: OrchestraGraphWorkflowMacro;
    limits?: OrchestraGraphWorkflowLimits;
}
export declare const ORCHESTRA_GRAPH_SCHEMA_VERSIONs: {
    readonly v1_0: "1.0";
    readonly v2_0: "2.0";
};
export type OrchestraGraphSchemaVersion = (typeof ORCHESTRA_GRAPH_SCHEMA_VERSIONs)[keyof typeof ORCHESTRA_GRAPH_SCHEMA_VERSIONs];
export interface OrchestraGraphConfigBase {
    /** Schema version for forward compatibility. */
    version: OrchestraGraphSchemaVersion;
    /** Human-readable name for the playground. */
    name: string;
    /** Human-readable description. */
    description?: string;
}
export interface OrchestraGraphConfigV1 extends OrchestraGraphConfigBase {
    version: typeof ORCHESTRA_GRAPH_SCHEMA_VERSIONs.v1_0;
    /** Available LLM performers. Preferred authoring alias: models. */
    performers: OrchestraGraphPerformer[];
    /** Named subagent definitions keyed by subagent id. Preferred authoring alias: agents. */
    subagents: Record<string, OrchestraGraphAgent>;
    /** Execution DAG with outcome-based routing. */
    graph: OrchestraGraph;
    /** Canonical starting state for the session. Preferred authoring alias: initialCheckpoint. */
    initialState: Record<string, unknown>;
    /** Frontend/client-submitted actions per turn. Preferred authoring alias: tools. */
    actions: OrchestraGraphAction[];
    /** Backend-visible retrieval sources available to retrieveContext. */
    retrievalSources?: OrchestraGraphRetrievalSource[];
    /** Graph-owned policy for model-callable runtime tools. */
    runtimeToolDefinitions?: OrchestraGraphRuntimeToolDefinition[];
    /** Named shared tool allowlists referenced by subagents[].toolSet. */
    toolSets?: OrchestraGraphToolSetRegistry;
    /** Named shared skill bundles referenced during authoring. */
    skillSets?: OrchestraGraphSkillSetRegistry;
    /** Named response schemas referenced by graph.nodes[].outputSchema or subagents[].responseSchema. Preferred authoring alias: response. */
    responseSchemas?: OrchestraGraphResponseShapeRegistry;
    /** Legacy per-turn response shape retained for older graphs. */
    responseShape?: OrchestraGraphResponseShape;
    /** Per-agent cross-turn memory access policies. */
    memory?: OrchestraGraphMemoryConfig;
    /** Runtime behavior constraints. Preferred authoring alias: runtime. */
    options?: OrchestraGraphOptions;
    /** Optional workflow profile and limits for authoring validation and UI hints. */
    workflow?: OrchestraGraphWorkflow;
    /** Named context lane definitions referenced by groups, nodes, and agents. */
    lanes?: OrchestraGraphContextLaneRegistry;
}
export type OrchestraGraphConfig = OrchestraGraphConfigV1;
export declare const ORCHESTRA_GRAPH_DEFAULTS: {
    readonly version: "1.0";
    readonly defaultOutcome: "done";
    readonly maxTurns: 100;
    readonly turnTimeout: 30000;
};
