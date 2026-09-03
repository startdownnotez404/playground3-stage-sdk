export declare const PLAYGROUND3_MODE_TYPES: readonly ["play", "ask", "plan", "agent", "custom", "chess-battleground", "chess-battleground-critic"];
export type Playground3ModeType = (typeof PLAYGROUND3_MODE_TYPES)[number];
export type Playground3ModeIconId = "play" | "ask" | "plan" | "agent" | "custom";
export interface Playground3ModeStyle {
    modeType: Playground3ModeType;
    /** Foreground for icon + label */
    color: string;
    /** Soft pill background */
    backgroundColor: string;
    iconId: Playground3ModeIconId;
    /** Short menu / tooltip description */
    description: string;
}
export declare const isPlayground3ModeType: (value: unknown) => value is Playground3ModeType;
/**
 * Resolve mode type from entry. Explicit modeType wins; otherwise
 * textInput → ask, else play.
 */
export declare const resolvePlayground3ModeType: (input: {
    modeType?: Playground3ModeType | string | null;
    textInput?: boolean;
}) => Playground3ModeType;
export declare const resolvePlayground3ModeStyle: (input: {
    modeType?: Playground3ModeType | string | null;
    textInput?: boolean;
}) => Playground3ModeStyle;
