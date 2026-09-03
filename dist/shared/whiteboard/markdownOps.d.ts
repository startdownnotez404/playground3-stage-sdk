import type { WhiteboardOp } from "./types";
/**
 * Markdown section-aware content ops (pure). A "section" is a markdown heading
 * plus its body up to the next heading of equal-or-higher level (or EOF).
 * Anchors are heading TEXT (trimmed, case-sensitive, leading #'s ignored) —
 * never line numbers.
 */
export declare class WhiteboardOpError extends Error {
}
/**
 * Models often put `## Forecast` inside op.content even though `heading` already
 * names the section. Strip leading matching heading lines so we don't nest
 * duplicate `## Forecast` headings via append/replace.
 */
export declare const stripMatchingHeadingPrefix: (body: string, heading: string) => string;
/**
 * If the same heading text appears more than once, keep only the **last**
 * section and drop earlier duplicates. Heals stacked `## Forecast` blocks.
 */
export declare const dedupeMarkdownSectionsKeepLast: (content: string) => string;
/** True when markdown already has a section with this heading text. */
export declare const whiteboardHasSection: (content: string, heading: string) => boolean;
/** Apply a whiteboard op to markdown content. Throws WhiteboardOpError. */
export declare const applyWhiteboardOp: (content: string, op: WhiteboardOp) => string;
/** Validate op shape (tool-handler boundary). Throws WhiteboardOpError. */
export declare const parseWhiteboardOp: (value: unknown) => WhiteboardOp;
