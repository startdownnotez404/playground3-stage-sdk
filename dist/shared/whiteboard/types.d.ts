/**
 * shared/whiteboard — event-sourced shared working memory ("how we think"),
 * sibling to shared/ontology ("what we know"). Boards live in the checkpoint;
 * agents edit them via whiteboard.* tools; prompts see capped views through
 * {{checkpoint.*}} magic tokens. Revision history never enters prompts
 * automatically — it is retrieved on demand via whiteboard.history / read /
 * diff.
 */
/** Author stamp threaded from the agent loop (Playground3ToolCaller). */
export interface WhiteboardAuthor {
    agentId: string;
    nodeId: string;
    nodeRunId: string;
}
/**
 * Markdown section-aware ops — anchored by heading text, never line numbers.
 * `rewriteAll` is the escape hatch.
 */
export type WhiteboardOp = {
    kind: "appendSection";
    heading: string;
    content: string;
} | {
    kind: "replaceSection";
    heading: string;
    content: string;
} | {
    kind: "removeSection";
    heading: string;
} | {
    kind: "rewriteAll";
    content: string;
};
export interface WhiteboardRevision {
    rev: number;
    author: WhiteboardAuthor;
    /** ISO timestamp. */
    at: string;
    summary: string;
    op: WhiteboardOp;
    /** Full board content after this revision (materialized on write). */
    snapshot: string;
}
export interface WhiteboardState {
    /** Latest content (== revisions.at(-1).snapshot ?? baseSnapshot ?? ""). */
    current: string;
    /** Latest revision number (0 = never written). */
    rev: number;
    /** Append-only log, bounded by retention (see ops). */
    revisions: WhiteboardRevision[];
    /**
     * Retention marker: revisions ≤ compactedThroughRev were folded into
     * baseSnapshot. history results mark this range as compacted.
     */
    compactedThroughRev?: number;
    baseSnapshot?: string;
}
export type WhiteboardsState = Record<string, WhiteboardState>;
export declare const WHITEBOARD_DEFAULTS: {
    /** Keep the last N revisions per board; older ones compact into baseSnapshot. */
    readonly retentionRevisions: 50;
    /** Prompt-view content cap (chars) — author-overridable per board render. */
    readonly promptContentChars: 2000;
};
export declare const createEmptyWhiteboardState: () => WhiteboardState;
/** Structural guard for checkpoint parse paths. */
export declare const normalizeWhiteboardsState: (value: unknown) => WhiteboardsState;
