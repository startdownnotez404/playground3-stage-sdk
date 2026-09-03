import type { ComponentType, LazyExoticComponent } from "react";
import type { Playground3McpManifest, Playground3McpTool } from "./mcp/manifest";
import type { Playground3ToolResult } from "./mcp/toolResult";
import type { Playground3GraphPrompts } from "./orchestration/prompts";
import type { Playground3NodeTransitionEnvelope } from "./contracts/nodeTransition";
import type { Playground3ToolExecutor } from "./executor/runAgentLoop";
import type { Playground3HumanGateAdapter } from "./executor/humanGateAdapter";
import type { OrchestraGraphGroup } from "../orchestraGraphConfig";
import type { Playground3AgentDefinition, Playground3AgentProfile } from "./agent/agentDefinition";
import type { Playground3ModeType } from "./orchestration/modeType";
import type { Playground3InferenceJobSnapshot, Playground3StartInferenceRequest, Playground3StartInferenceResponse, Playground3StreamChunkEvent } from "./executor/remoteInferenceAdapter";
export type { Playground3AgentCapabilities, Playground3AgentDefinition, Playground3AgentProfile, Playground3PseudoToolName, } from "./agent/agentDefinition";
export { PLAYGROUND3_PSEUDO_TOOL_NAMES, isPlayground3PseudoToolName, isPlayground3InlinePseudoToolName } from "./agent/agentDefinition";
export interface Playground3GraphNodeRunPlan {
    nodeId: string;
    messages: Array<{
        role: string;
        content: string;
    }>;
    inference: unknown;
    tools: Playground3McpTool[];
}
export interface Playground3CheckpointAdapter<TState> {
    createInitial: () => TState;
    parse: (json: string, graphJson?: string) => TState;
    serialize: (state: TState) => string;
}
export interface Playground3ToolHandlerInput<TState> {
    toolName: string;
    args: Record<string, unknown>;
    state: TState;
    completedNodeRuns?: Playground3CompletedNodeRun[];
    /** Identity of the calling agent/node — threaded from the agent loop. */
    caller?: Playground3ToolCaller;
}
/** Who invoked a tool — set by the agent loop, consumed by handlers (audit, access checks). */
export interface Playground3ToolCaller {
    agentId: string;
    nodeId: string;
    nodeRunId: string;
}
export type Playground3ToolHandler<TState> = (input: Playground3ToolHandlerInput<TState>) => Playground3ToolResult | Promise<Playground3ToolResult>;
export interface Playground3CompletedNodeRun {
    nodeId: string;
    outputPayloadJson: string;
    status: "completed" | "failed";
}
interface Playground3TurnContinuationBase {
    graphNodeId: string;
    nodeRunId: string;
    executorTabId: string;
    agentLoopCheckpoint: import("./executor/types").Playground3AgentLoopCheckpoint;
    completedNodeRuns: Playground3CompletedNodeRun[];
}
export type Playground3TurnContinuation = (Playground3TurnContinuationBase & {
    kind: "approvedHumanGate";
}) | (Playground3TurnContinuationBase & {
    kind: "answeredHumanQuestion";
    question: string;
    answer: string;
});
export interface Playground3RunTurnInput<TState> {
    state: TState;
    graphKey: string;
    nodeRunId: string;
    firstNodeId: string;
    tools: Playground3McpTool[];
    toolExecutor: Playground3ToolExecutor;
    getManifestJson: () => Promise<string>;
    getGraphJson: (state: TState, graphKey: string) => string;
    submitTransition: (transition: Playground3NodeTransitionEnvelope) => Promise<unknown>;
    humanGateAdapter?: Playground3HumanGateAdapter;
    inferenceStream?: unknown;
    workingSpawnStore?: unknown;
    activeSession?: {
        sessionId: string;
        nodeGraphId: string;
    } | null;
    /** Channel room: start session with runtimeMode channel + channelId. */
    runtimeMode?: "solo" | "channel";
    channelId?: string;
    /** Prior-move chat for nodes with inheritSessionContext. */
    sessionMessages?: import("./executor/types").Playground3ChatMessage[];
    /** Read messages for a context lane (main + player:*). */
    readLaneMessages?: (laneId: string) => readonly import("./executor/types").Playground3ChatMessage[];
    /** Append messages into a context lane after a spawn turn. */
    appendLaneMessages?: (laneId: string, messages: readonly import("./executor/types").Playground3ChatMessage[]) => void;
    clientStateCheckpointId?: string;
    signal?: AbortSignal;
    completedNodeRuns?: Playground3CompletedNodeRun[];
    continuation?: Playground3TurnContinuation;
    onSessionStarted?: (input: {
        sessionId: string;
        nodeGraphId: string;
        nodeRunId: string;
        nodeId: string;
    }) => void;
    onStatus?: (status: string) => void;
    onFailure?: (input: {
        nodeRunId: string;
        nodeGraphId?: string;
        message: string;
    }) => void;
    onNodeCompleted?: (nodeRun: Playground3CompletedNodeRun) => void;
    agentDefinitions?: Record<string, import("./agent/agentDefinition").Playground3AgentDefinition>;
    agentProfiles?: Record<string, import("./agent/agentDefinition").Playground3AgentProfile>;
    skillReader?: import("./skills").Playground3SkillReader;
    /** Shared app law from RULE.md (loaded by the host). */
    appRulesMarkdown?: string | null;
    /** Composer-selected CHAT_MODEL_CONFIGs option id for model: "$selected". */
    selectedModelId?: string;
    /** Per-agent model overrides for model: "$selected" performers. agentId → option id. */
    agentModelIds?: Record<string, string>;
    /** Graphs the LLM may switch via playground3.switchGraph (requires approval). */
    switchableGraphs?: readonly {
        key: string;
        label?: string;
    }[];
    /**
     * Human text for this turn (composer textInput). Appended after prompt
     * injections so the model sees the live question — not only UI Action: display.
     */
    turnUserMessage?: string;
    /**
     * Live app state getter. When set, each node rebuilds `{{checkpoint.*}}`
     * prompt injections from current state (includes prior-node tool writes in
     * the same turn). Falls back to the frozen `state` snapshot when omitted.
     */
    getLiveState?: () => TState;
    /** Append-only planned fragments from prior turns (host-owned checkpoint slice). */
    plannedFragments?: readonly import("./planNextSteps/types").Playground3PlannedFragment[];
    /** Executor applied new fragments — host persists the full cumulative list. */
    onPlannedFragmentsAppended?: (fragments: readonly import("./planNextSteps/types").Playground3PlannedFragment[]) => void;
    /**
     * Optional platform ports for StageBridge / HTML bundles.
     * When set, runTurn must not import the Amplify query module directly.
     */
    startSession?: (input: {
        playgroundId: string;
        runtimeMode?: string;
        channelId?: string;
        orchestraGraphJson?: string;
        frontendStateJson?: string;
        mcpManifestJson?: string;
    }) => Promise<{
        session: {
            id: string;
        };
        nodeGraph: {
            id: string;
        };
    }>;
    runInference?: (input: {
        sessionId?: string;
        providerConfigJson: string;
        messagesJson: string;
        toolsJson?: string;
        optionsJson?: string;
    }) => Promise<unknown>;
    /**
     * Async inference ports. When set with subscribeToChunks, the executor must
     * not import the Amplify query module — StageBridge / AppHost inject these.
     */
    startInference?: (request: Playground3StartInferenceRequest) => Promise<Playground3StartInferenceResponse>;
    getInferenceJob?: (inferenceId: string) => Promise<Playground3InferenceJobSnapshot | null>;
    subscribeToChunks?: (nodeGraphId: string, handlers: {
        next: (chunk: Playground3StreamChunkEvent) => void;
        error?: (error: unknown) => void;
    }) => {
        unsubscribe: () => void;
    };
    subscribeToInferenceJob?: (inferenceId: string, handlers: {
        next: (job: Playground3InferenceJobSnapshot) => void;
        error?: (error: unknown) => void;
    }) => {
        unsubscribe: () => void;
    };
}
export interface Playground3RunTurnResult {
    sessionId: string;
    nodeGraphId: string;
    nodeRunId: string;
}
export type { Playground3GraphEntry, Playground3MediaInputKind, } from "./orchestration/mediaInput";
/** Composer graph catalog copied onto UiProps so Shells stay SDK-pure. */
export interface Playground3GraphCatalogEntry {
    key: string;
    label: string;
    firstNodeId: string;
    textInput: boolean;
    mediaInput: import("./orchestration/mediaInput").Playground3MediaInputKind[];
    modeType: Playground3ModeType;
}
export interface Playground3OrchestrationGraphBundle {
    topologyJson: string;
    prompts: Playground3GraphPrompts;
    buildGraphJson?: () => string;
    /** Composer entry policy for this graph mode (text/media + first node). */
    entry?: import("./orchestration/mediaInput").Playground3GraphEntry;
}
export interface Playground3HostActions<TState> {
    persistCheckpoint: (state: TState, sourceKind?: string) => Promise<string | null>;
    closeSession: (sessionId?: string) => Promise<void>;
    clearResume: () => void;
    clearThread: () => void;
    /** Append structured messages into inheritSessionContext / main-lane history. */
    appendSessionMessages?: (messages: Array<{
        role: "user" | "assistant";
        content: string;
    }>) => void;
    beginTurn: (input: {
        nodeRunId: string;
        nodeId: string;
        userContent: string;
        optimistic?: boolean;
        modeType?: string | null;
        graphKey?: string | null;
    }) => void;
    finalizeTurnThread: () => void;
    failTurn: (input: {
        nodeRunId: string;
        nodeGraphId?: string;
        message: string;
    }) => void;
    getTurnAbortSignal: () => AbortSignal | undefined;
    setStatus: (status: string) => void;
    setError: (error: string | null) => void;
    getState: () => TState;
    runTurn: (input: {
        graphKey: string;
        nodeRunId: string;
        firstNodeId: string;
        state: TState;
        clientStateCheckpointId?: string;
        successStatus: string;
        turnUserMessage?: string;
        onComplete?: (result: Playground3RunTurnResult) => void | Promise<void>;
    }) => Promise<void>;
    /** Chain AI turns until stop/gate/abort. For AI-vs-AI battleground and demos. */
    startAutoPlay: (config: {
        resolveNextTurn: (state: TState) => null | {
            graphKey: string;
            firstNodeId: string;
            turnUserMessage: string;
            successStatus: string;
            plyLabel?: string;
        };
        shouldStop: (state: TState) => boolean;
        delayMs?: number;
    }) => void;
    stopAutoPlay: () => void;
    isAutoPlaying: boolean;
}
export interface Playground3UiProps<TState> {
    state: TState;
    isPrimary: boolean;
    claimPrimary: () => void;
    canInvoke: boolean;
    isRoomObserver: boolean;
    isRunning: boolean;
    error: string | null;
    status: string;
    actions: Playground3HostActions<TState>;
    setState: (state: TState) => void;
    graphCatalog: Playground3GraphCatalogEntry[];
    selectedGraphKey: string;
    setSelectedGraphKey: (graphKey: string) => void;
    selectedModelId: string;
    setSelectedModelId?: (modelId: string) => void;
    agentModelIds: Record<string, string>;
    setAgentModelId: (agentId: string, modelId: string) => void;
    clearAgentModelId: (agentId: string) => void;
    isAuthenticated: boolean;
}
export interface Playground3Definition<TState> {
    id: string;
    title: string;
    assistantSpeaker?: {
        name: string;
        icon?: string;
    };
    contract: {
        buildManifest: () => Playground3McpManifest;
    };
    orchestration: {
        graphs: Record<string, Playground3OrchestrationGraphBundle>;
        uiGroups?: OrchestraGraphGroup[];
        defaultGraphKey?: string;
        /** App-owned agent capability registry keyed by graph agent id */
        agentDefinitions?: Record<string, Playground3AgentDefinition>;
        /** Display personas for ChatDock avatars */
        agentProfiles?: Record<string, Playground3AgentProfile>;
    };
    runtime: {
        checkpoint: Playground3CheckpointAdapter<TState>;
        executeTool: Playground3ToolHandler<TState>;
        buildInference: (graphKey: string, state: TState, tools: Playground3McpTool[]) => Playground3GraphNodeRunPlan[];
        runTurn: (input: Playground3RunTurnInput<TState>) => Promise<Playground3RunTurnResult>;
        resolveGraphJson?: (state: TState, graphKey: string) => string;
        /** Prompt/checkpoint view for the host agent loop (iframe still owns live state). */
        buildCheckpointState?: (state: TState) => unknown;
        /** Werewolf-style fake performers: iframe runs scripted inference for the host loop. */
        scriptedNodeInference?: (input: {
            graphKey: string;
            state: TState;
        }) => (input: {
            nodeId: string;
        }) => import("./executor/types").Playground3InferenceAdapter | undefined;
        /** Default true. Werewolf keeps the walk going after a node failure. */
        failOnNodeFailure?: boolean;
        /** State-aware agent defs (werewolf live player names). */
        resolveAgentDefinitions?: (state: TState) => Record<string, import("./agent/agentDefinition").Playground3AgentDefinition>;
    };
    /**
     * App shell component. Definitions SHOULD provide this via `React.lazy(() =>
     * import("./ui/Shell"))` so non-UI consumers (smoke validators, backend
     * tooling) can import the registry without pulling the UI bundle (which is
     * not Node-ESM compatible).
     */
    ui: ComponentType<Playground3UiProps<TState>> | LazyExoticComponent<ComponentType<Playground3UiProps<TState>>>;
}
export declare const resolvePlayground3GraphJson: <TState>(definition: Playground3Definition<TState>, graphKey: string) => string;
