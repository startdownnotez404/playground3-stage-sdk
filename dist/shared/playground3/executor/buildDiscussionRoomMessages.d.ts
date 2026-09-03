import type { OrchestraGraphNode } from "../../orchestraGraphConfig";
import type { Playground3ChatMessage } from "./types";
import type { Playground3LaneMessageReader } from "./buildSpawnInheritHistoryMessages";
export declare const isPlayground3DiscussionRoomNode: (graphNode: OrchestraGraphNode | undefined) => boolean;
export declare const resolvePlayground3DiscussionRoomLaneId: (graphNode: OrchestraGraphNode | undefined) => string | undefined;
/** True when this spawn should inherit/write the shared discussion room lane. */
export declare const isPlayground3DiscussionRoomSpawn: (input: {
    graphNode?: OrchestraGraphNode;
    topology?: string;
}) => boolean;
export declare const buildPlayground3DiscussionRoomEntry: (input: {
    agentName: string;
    content: string;
}) => Playground3ChatMessage | null;
export declare const formatPlayground3DiscussionRoomDisplayText: (agentName: string, content: string) => string;
export declare const buildPlayground3DiscussionRoomInheritMessages: (input: {
    laneId: string;
    readLaneMessages: Playground3LaneMessageReader;
}) => Playground3ChatMessage[];
