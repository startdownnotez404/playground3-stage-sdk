import type { Playground3CheckpointAdapter } from "../playground3/playgroundDefinition";
import { type WhiteboardsState } from "./types";
export interface WhiteboardStateLens<TState> {
    /** Read the whiteboards slice (default: `state.whiteboards`). */
    get?: (state: TState) => WhiteboardsState | undefined;
    /** Write the whiteboards slice immutably (default: `{ ...state, whiteboards }`). */
    set?: (state: TState, whiteboards: WhiteboardsState) => TState;
}
export declare const resolveWhiteboardStateLens: <TState>(lens?: WhiteboardStateLens<TState>) => Required<WhiteboardStateLens<TState>>;
/**
 * Checkpoint slice helper: compose an app's adapter so the whiteboards slice
 * always exists and parses structurally (append-only log + retention markers).
 */
export declare const createWhiteboardCheckpointSlice: <TState>(input: {
    base: Playground3CheckpointAdapter<TState>;
    lens?: WhiteboardStateLens<TState>;
}) => Playground3CheckpointAdapter<TState>;
export interface WhiteboardPromptViewBoard {
    /** Content capped at the toolkit default (author-overridable). */
    content: string;
    rev: number;
    /** True when content was capped — agents should whiteboard.read for the rest. */
    truncated: boolean;
}
/**
 * Token-friendly per-board prompt view for {{checkpoint.whiteboards.<id>.*}}
 * magic tokens. Authors place tokens via opt-in helpers in
 * `promptTemplates.ts` (or hand-written injections) — never auto-wired from
 * `whiteboardAccess`. The platform only provides values; framing is graph-owned.
 *
 * Pass `ensureBoardIds` for boards the graph injects (e.g. `draft`) so a never-
 * written board still resolves to `{ rev: 0, content: "", truncated: false }`
 * instead of missing → serialized `null` (which confuses first writes).
 */
export declare const buildWhiteboardPromptView: (boards: WhiteboardsState, options?: {
    contentChars?: number;
    ensureBoardIds?: readonly string[];
}) => Record<string, WhiteboardPromptViewBoard>;
