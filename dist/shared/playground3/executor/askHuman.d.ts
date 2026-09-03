import type { Playground3ToolCall } from "./types";
/**
 * Structured answer modes for playground3.askHuman. When the model passes a
 * form, the dock renders fields (text inputs, single/multi choice) — possibly
 * across multiple steps — instead of a single free-text box. The answer is
 * serialized back to a readable string for the agent.
 */
export interface Playground3AskHumanField {
    /** Answer map key, unique within the form (kebab-case). */
    key: string;
    label: string;
    type: "text" | "choice";
    placeholder?: string;
    /** Defaults to true — set false for optional fields. */
    required?: boolean;
    /** choice: selectable options (UI always appends an Other… free-text choice). */
    options?: string[];
    /** choice: allow multiple selections (checkboxes) when true. */
    multi?: boolean;
}
export interface Playground3AskHumanStep {
    title?: string;
    fields: Playground3AskHumanField[];
}
export interface Playground3AskHumanForm {
    steps: Playground3AskHumanStep[];
}
export interface Playground3AskHumanRequest {
    question: string;
    form?: Playground3AskHumanForm;
}
/**
 * Parse and validate the optional form from raw tool args. Accepts either
 * `steps` (multi-step form) or a flat `fields` shorthand (single step).
 * Throws with an arg-fixable message on malformed input.
 */
export declare const readPlayground3AskHumanForm: (args: Record<string, unknown>) => Playground3AskHumanForm | undefined;
/**
 * Loose parse for persisted gate artifacts (approvalRequestJson / section
 * graphPayload): returns undefined instead of throwing on malformed data.
 */
export declare const parsePlayground3AskHumanForm: (value: unknown) => Playground3AskHumanForm | undefined;
export declare const readPlayground3AskHumanRequest: (toolCall: Playground3ToolCall) => Playground3AskHumanRequest;
/**
 * Serialize the human's answers into the readable string handed back to the
 * agent: plain text passes through; form answers become "Label: value" lines
 * in step/field order (multi-choice values joined with ", ").
 */
export declare const formatPlayground3AskHumanAnswerText: (input: {
    form?: Playground3AskHumanForm;
    /** Plain-text answer when no form, else field key → value(s). */
    answer: string | Record<string, string | string[]>;
}) => string;
export declare const formatPlayground3AskHumanToolResult: (answer: string) => string;
export declare const isPlayground3AskHumanToolCall: (toolCall: Playground3ToolCall) => boolean;
