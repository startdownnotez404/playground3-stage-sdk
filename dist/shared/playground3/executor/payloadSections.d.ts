/**
 * Structured assembly provenance for a digested node-turn payload.
 *
 * `assemblePlayground3NodeMessages` records one section per logical block as
 * it builds the message list, so preview/token surfaces never re-derive
 * structure from message content (the old `startsWith("Prior node ")`
 * heuristics). Multiple sections may share a message index: persona,
 * appRules, taskContract, and executionPrompt are folded into the single
 * leading system message — their per-section rendered text is carried on
 * `provenance.text`.
 */
export type Playground3PayloadSectionKind = "persona" | "appRules" | "taskContract" | "executionPrompt" | "sessionContext" | "promptInjection" | "inheritHistory" | "turnUser";
export type Playground3PayloadSectionProvenance = {
    /** Rendered section text for parts folded into a shared message (system parts). */
    text?: string;
    /** Authoring role for promptInjection sections. */
    role?: string;
    /** Checkpoint/expansion binding paths expanded while rendering templates. */
    bindings?: string[];
    /** inheritHistory selectors that produced the section. */
    selectors?: string[];
};
export type Playground3PayloadSection = {
    id: string;
    kind: Playground3PayloadSectionKind;
    /** Indices into payload.messages this section produced (may be shared). */
    messageIndices: number[];
    provenance?: Playground3PayloadSectionProvenance;
};
