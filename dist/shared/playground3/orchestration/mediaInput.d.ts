export declare const PLAYGROUND3_MEDIA_INPUT_KINDS: readonly ["image", "video", "audio", "file"];
export type Playground3MediaInputKind = (typeof PLAYGROUND3_MEDIA_INPUT_KINDS)[number];
export declare const PLAYGROUND3_MODEL_MODALITY_KINDS: readonly ["text", "image", "video", "audio"];
export type Playground3ModelModalityKind = (typeof PLAYGROUND3_MODEL_MODALITY_KINDS)[number];
export interface Playground3GraphEntry {
    label?: string;
    firstNodeId: string;
    /** When true, ChatDock textarea may submit into this graph. Default false. */
    textInput?: boolean;
    /** Media kinds this graph mode accepts in the dock. Default []. */
    mediaInput?: Playground3MediaInputKind[];
    /**
     * Visual mode family for composer color + icon pill.
     * Default: textInput ? "ask" : "play".
     */
    modeType?: import("./modeType").Playground3ModeType;
    /**
     * When false, host skips injecting app RULE.md into this graph turn.
     * Default true — same runTurn path; entry data chooses the payload.
     */
    includeAppRules?: boolean;
}
export declare const resolvePlayground3GraphMediaInput: (mediaInput: readonly Playground3MediaInputKind[] | undefined) => Playground3MediaInputKind[];
export declare const resolvePlayground3ModelModalities: (modalities: readonly Playground3ModelModalityKind[] | undefined) => Playground3ModelModalityKind[];
/**
 * Effective outbound media kinds = graph.mediaInput ∩ model.modalities
 * (excluding "text", which is not a media attachment kind).
 */
export declare const resolvePlayground3EffectiveMediaInput: (input: {
    graphMediaInput?: readonly Playground3MediaInputKind[];
    modelModalities?: readonly Playground3ModelModalityKind[];
}) => Playground3MediaInputKind[];
export type Playground3AttachmentMediaKind = Playground3MediaInputKind;
export interface Playground3PartitionedAttachments<T> {
    accepted: T[];
    dropped: Array<{
        item: T;
        kind: Playground3AttachmentMediaKind;
        reason: string;
    }>;
}
export declare const partitionPlayground3AttachmentsByEffectiveMedia: <T>(input: {
    items: readonly T[];
    resolveKind: (item: T) => Playground3AttachmentMediaKind | null;
    effectiveMedia: readonly Playground3MediaInputKind[];
    graphMediaInput?: readonly Playground3MediaInputKind[];
    modelModalities?: readonly Playground3ModelModalityKind[];
}) => Playground3PartitionedAttachments<T>;
export declare const formatPlayground3DroppedMediaNotice: (dropped: readonly {
    kind: Playground3AttachmentMediaKind;
    reason: string;
}[]) => string | undefined;
