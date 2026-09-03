import type { Playground3McpTool } from "../playground3/mcp/manifest";
import type { Playground3ToolCaller, Playground3ToolHandler } from "../playground3/playgroundDefinition";
import { type WhiteboardStateLens } from "./checkpointSlice";
export declare const WHITEBOARD_TOOL_NAMES: {
    readonly read: "whiteboard.read";
    readonly write: "whiteboard.write";
    readonly history: "whiteboard.history";
    readonly diff: "whiteboard.diff";
};
export declare const buildWhiteboardMcpTools: () => Playground3McpTool[];
/**
 * Tools implied by a node's whiteboardAccess grants: any grant unlocks
 * read/history/diff; hasWrite adds write. The engine injects these into the
 * node's tool surface so graph authors never list whiteboard.* by hand.
 */
export declare const resolveWhiteboardToolNamesForAccess: (access?: readonly WhiteboardAccessRule[]) => string[];
/** Access rule for the calling node — from the graph's whiteboardAccess registry. */
export interface WhiteboardAccessRule {
    boardId: string;
    /** Write capability; a grant always includes read. */
    hasWrite: boolean;
}
/**
 * Toolkit handler. Writes stamp the revision author from the threaded caller
 * identity. When `resolveAccess` is provided, the node's whiteboardAccess
 * registry is enforced: writes need hasWrite, reads/history/diff need the
 * grant itself. Boards not declared in the node's access list are rejected.
 */
export declare const createWhiteboardToolHandler: <TState>(input?: {
    lens?: WhiteboardStateLens<TState>;
    resolveAccess?: (caller: Playground3ToolCaller | undefined) => readonly WhiteboardAccessRule[] | undefined;
}) => Playground3ToolHandler<TState>;
