import { WhiteboardOpError } from "./markdownOps";
import { type WhiteboardAuthor, type WhiteboardOp, type WhiteboardRevision, type WhiteboardState, type WhiteboardsState } from "./types";
/** Optimistic-concurrency conflict: baseRev is stale. */
export declare class WhiteboardConflictError extends Error {
    readonly latestRev: number;
    readonly latestContent: string;
    constructor(message: string, latestRev: number, latestContent: string);
}
export { WhiteboardOpError };
/**
 * Append a revision (validated + materialized). baseRev must equal the current
 * rev — stale bases throw WhiteboardConflictError carrying the latest content
 * (tool handler converts this into a retryable conflict result).
 */
export declare const writeWhiteboard: (boards: WhiteboardsState, input: {
    boardId: string;
    baseRev: number;
    op: WhiteboardOp;
    summary: string;
    author: WhiteboardAuthor;
    at?: string;
    retentionRevisions?: number;
}) => {
    boards: WhiteboardsState;
    board: WhiteboardState;
    revision: WhiteboardRevision;
};
export declare const readWhiteboard: (boards: WhiteboardsState, input: {
    boardId: string;
    rev?: number;
}) => {
    boardId: string;
    rev: number;
    content: string;
    latestRev: number;
};
export interface WhiteboardHistoryEntry {
    rev: number;
    author: WhiteboardAuthor;
    at: string;
    summary: string;
    opKind: WhiteboardOp["kind"];
}
export declare const whiteboardHistory: (boards: WhiteboardsState, input: {
    boardId: string;
    limit?: number;
}) => {
    boardId: string;
    latestRev: number;
    compactedThroughRev?: number;
    entries: WhiteboardHistoryEntry[];
};
export interface WhiteboardDiffLine {
    kind: "added" | "removed";
    text: string;
}
/** LCS line diff — boards are small; clarity over cleverness. */
export declare const diffWhiteboardText: (fromText: string, toText: string) => WhiteboardDiffLine[];
export declare const diffWhiteboard: (boards: WhiteboardsState, input: {
    boardId: string;
    fromRev: number;
    toRev: number;
}) => {
    boardId: string;
    fromRev: number;
    toRev: number;
    diff: WhiteboardDiffLine[];
};
