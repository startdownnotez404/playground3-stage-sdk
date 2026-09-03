import { type Playground3Status } from "../constants";
import type { Playground3NodeTransitionEnvelope } from "./nodeTransition";
export interface Playground3TransitionValidationState {
    sessionId: string;
    nodeGraphId: string;
    activeNodeRunId?: string | null;
    nodeRunId: string;
    nodeId: string;
    status: Playground3Status;
    latestSequence?: number | null;
    acceptedClientRequestIds?: Record<string, string>;
    primaryExecutorTabId?: string | null;
    allowedRouteConditionKeys?: string[];
    allowedToolNames?: string[];
}
export interface Playground3TransitionValidationResult {
    ok: boolean;
    errors: string[];
}
export declare const validatePlayground3NodeTransition: (input: {
    envelope: Playground3NodeTransitionEnvelope;
    state: Playground3TransitionValidationState;
}) => Playground3TransitionValidationResult;
