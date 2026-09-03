/**
 * Opt-in promptInjection helpers for ontology (+ optional whiteboard) context.
 *
 * Same rule as whiteboard: graph authors opt in via `promptInjections`.
 * Capability fields (`whiteboardAccess`, ontology tools) never auto-inject.
 */
/** Compact ontology summary token — full data stays behind `ontology.query`. */
export declare const ONTOLOGY_CHECKPOINT_SUMMARY_TEMPLATE = "Ontology summary (durable facts \u2014 use ontology.query for full data):\n{{checkpoint.ontology}}";
export type OntologyPlanesInjectionOptions = {
    /** Whiteboard board id to include (default: `draft`). Pass `null` to omit. */
    whiteboardBoardId?: string | null;
    /** Label for the whiteboard block (default: `Draft whiteboard`). */
    whiteboardLabel?: string;
    /** Append the human-scope reminder line (default: true). */
    includeHumanScopeLine?: boolean;
};
/**
 * Combined ontology + whiteboard orientation for modeling / verify turns.
 */
export declare const buildOntologyPlanesInjectionTemplate: (options?: OntologyPlanesInjectionOptions) => string;
