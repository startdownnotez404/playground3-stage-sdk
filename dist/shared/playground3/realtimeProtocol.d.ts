export declare const PLAYGROUND3_REALTIME_MESSAGE_TYPES: {
    readonly resume: "playground3.resume";
    readonly claimPrimary: "playground3.claimPrimary";
    readonly sessionState: "playground3.sessionState";
    readonly transitionCommitted: "playground3.transitionCommitted";
    readonly interruptRequested: "playground3.interruptRequested";
};
export interface Playground3RealtimeResumeMessage {
    type: typeof PLAYGROUND3_REALTIME_MESSAGE_TYPES.resume;
    sessionId: string;
    nodeGraphId: string;
    tabId: string;
}
export interface Playground3RealtimeClaimPrimaryMessage {
    type: typeof PLAYGROUND3_REALTIME_MESSAGE_TYPES.claimPrimary;
    sessionId: string;
    nodeGraphId: string;
    tabId: string;
    force?: boolean;
}
export interface Playground3RealtimeSessionStateMessage {
    type: typeof PLAYGROUND3_REALTIME_MESSAGE_TYPES.sessionState;
    sessionId: string;
    nodeGraphId: string;
    isPrimary: boolean;
    primaryTabId?: string;
    primaryIdleExpiresAt?: string;
}
export type Playground3RealtimeClientMessage = Playground3RealtimeResumeMessage | Playground3RealtimeClaimPrimaryMessage;
export type Playground3RealtimeServerMessage = Playground3RealtimeSessionStateMessage | {
    type: typeof PLAYGROUND3_REALTIME_MESSAGE_TYPES.transitionCommitted;
    sessionId: string;
    nodeGraphId: string;
    nodeRunId?: string;
    status: string;
} | {
    type: typeof PLAYGROUND3_REALTIME_MESSAGE_TYPES.interruptRequested;
    sessionId: string;
    nodeGraphId: string;
    nodeRunId?: string;
    reason?: string;
};
