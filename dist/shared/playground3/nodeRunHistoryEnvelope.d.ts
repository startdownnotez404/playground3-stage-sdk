/** Preserved wire kind for node-run history refs. */
declare const PLAYGROUND3_NODE_RUN_REF_KIND = "playground2.nodeRunRef";
declare const PLAYGROUND3_HISTORY_SOURCE_FIELD_SET: {
    readonly inputPayloadJson: true;
    readonly outputPayloadJson: true;
    readonly toolResultsJson: true;
    readonly errorJson: true;
    readonly tokensJson: true;
};
export type Playground3HistorySourceField = keyof typeof PLAYGROUND3_HISTORY_SOURCE_FIELD_SET;
export interface Playground3NodeRunHistoryEnvelope {
    kind: typeof PLAYGROUND3_NODE_RUN_REF_KIND;
    nodeRunId: string;
    nodeId: string;
    status?: string | null;
    routeConditionKey?: string | null;
    inputClientStateCheckpointId?: string | null;
    sourceFields: Playground3HistorySourceField[];
}
export declare const buildPlayground3NodeRunHistoryEnvelope: (input: {
    nodeRunId: string;
    nodeId: string;
    status?: string | null;
    routeConditionKey?: string | null;
    inputClientStateCheckpointId?: string | null;
    sourceFields: Playground3HistorySourceField[];
}) => string;
export declare const parsePlayground3NodeRunHistoryEnvelope: (value: string | null | undefined) => Playground3NodeRunHistoryEnvelope | null;
export {};
