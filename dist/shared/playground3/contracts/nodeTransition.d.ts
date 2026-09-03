import { type Playground3TransitionKind } from "../constants";
import type { Playground3ArtifactRef } from "./artifact";
export type Playground3StopReason = "toolCalls" | "finalAnswer" | "toolFailure" | "pendingApproval" | "interrupted" | "error";
export interface Playground3InferenceArtifact {
    stepIndex: number;
    stopReason: Playground3StopReason;
    messagesJson: string;
    messageSourcesJson?: string;
    assistantContent: string;
    reasoningContent?: string;
    toolCallsJson?: string;
    toolResultsJson?: string;
    tokensJson: string;
    provider: string;
    model: string;
    providerSessionJson?: string;
    agentInvocationContextJson?: string;
    contextWindowJson?: string;
    promptToolCallingAuditJson?: string;
    messagesArtifactRef?: Playground3ArtifactRef;
    contextWindowArtifactRef?: Playground3ArtifactRef;
}
export interface Playground3NodeOutputArtifact {
    routeConditionKey?: string;
    outputPayloadJson: string;
    displayText?: string;
    historyText?: string;
    toolCallsJson?: string;
    toolResultsJson?: string;
    tokensJson: string;
    stopReason: string;
}
export interface Playground3HumanGateArtifact {
    expectedInputType: string;
    approvalRequestJson?: string;
    toolCallJson?: string;
    message?: string;
}
export interface Playground3ErrorArtifact {
    message: string;
    code?: string;
    detailsJson?: string;
}
export interface Playground3ExecutorCheckpointPayload {
    stepIndex: number;
    agentLoopCheckpointJson: string;
    frontendStateJson?: string;
    mcpManifestHash?: string;
}
export interface Playground3NodeTransitionEnvelope {
    clientRequestId: string;
    sequence: number;
    kind: Playground3TransitionKind;
    sessionId: string;
    nodeGraphId: string;
    nodeRunId: string;
    nodeId: string;
    executorTabId: string;
    /**
     * Composer / board-move invoke text for this turn. Copied onto every envelope
     * so room observers can seed the user bubble even if they miss `nodeStarted`.
     */
    turnUserMessage?: string;
    /** Mode at invoke time — room observers use this for the `@mode@graph` chip. */
    turnModeType?: string;
    /** Graph key at invoke time — room observers use this for the `@mode@graph` chip. */
    turnGraphName?: string;
    /** Display name/email of the room member who invoked this turn. */
    turnInvokerName?: string;
    /** Optional avatar URL for the invoker stamp. */
    turnInvokerAvatarSrc?: string;
    frontendStateJson?: string;
    mcpManifestHash?: string;
    checkpointId?: string;
    inference?: Playground3InferenceArtifact;
    nodeOutput?: Playground3NodeOutputArtifact;
    humanGate?: Playground3HumanGateArtifact;
    error?: Playground3ErrorArtifact;
    executorCheckpoint?: Playground3ExecutorCheckpointPayload;
}
export declare const parsePlayground3NodeTransitionEnvelope: (value: unknown) => Playground3NodeTransitionEnvelope;
export declare const serializePlayground3NodeTransitionEnvelope: (envelope: Playground3NodeTransitionEnvelope) => string;
