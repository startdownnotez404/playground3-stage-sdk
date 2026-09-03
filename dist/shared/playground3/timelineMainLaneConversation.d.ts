export interface Playground3TimelineHistoryItem {
    id: string;
    nodeRunId?: string | null;
    itemType?: string | null;
    contentText?: string | null;
    envelopeJson?: string | null;
    createdAt?: string | null;
}
export interface Playground3TimelineNodeRun {
    id?: string | null;
    nodeId?: string | null;
    agentId?: string | null;
    parentNodeRunId?: string | null;
    outputPayloadJson?: string | null;
    routeConditionKey?: string | null;
}
export declare const resolvePlayground3TimelineMainLaneConversation: (input: {
    graphJson?: string | null;
    nodeGraphId?: string | null;
    historyItems?: Playground3TimelineHistoryItem[];
    nodeRuns?: Playground3TimelineNodeRun[];
    laneId?: string;
}) => string | undefined;
