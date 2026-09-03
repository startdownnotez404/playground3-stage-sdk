/**
 * Opt-in promptInjection template helpers for whiteboard checkpoint views.
 *
 * `whiteboardAccess` is a capability gate only — it does **not** auto-inject
 * board content. Authors place these snippets in node `promptInjections` (or
 * persona / task contract) when a turn should see an orientation snapshot.
 * Full / authoritative content stays behind `whiteboard.read`.
 */
export type WhiteboardCheckpointInjectionOptions = {
    /** Prose label before the board dump (default: `Whiteboard \`<boardId>\``). */
    label?: string;
    /**
     * Append a reminder to call `whiteboard.read` when
     * `{{checkpoint.whiteboards.<id>.truncated}}` is true (default: true).
     */
    remindToolRead?: boolean;
};
/**
 * Single-board orientation snippet using
 * `{{checkpoint.whiteboards.<id>.rev|content|truncated}}` magic tokens.
 */
export declare const buildWhiteboardCheckpointInjectionTemplate: (boardId: string, options?: WhiteboardCheckpointInjectionOptions) => string;
