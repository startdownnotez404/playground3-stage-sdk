import { PLAYGROUND3_CONSTANTS } from "./constants";
import { type Playground3NodeTransitionEnvelope } from "./contracts/nodeTransition";
export type Playground3StoredHistoryEnvelope = {
    kind: typeof PLAYGROUND3_CONSTANTS.historyEnvelopeKinds.transition;
    transition: Playground3NodeTransitionEnvelope;
} | {
    kind: typeof PLAYGROUND3_CONSTANTS.historyEnvelopeKinds.turnBundle;
    nodeRunId: string;
    transitions: Playground3NodeTransitionEnvelope[];
};
export declare const serializePlayground3TransitionHistoryEnvelope: (transition: Playground3NodeTransitionEnvelope) => string;
export declare const serializePlayground3TurnBundleHistoryEnvelope: (input: {
    nodeRunId: string;
    transitions: Playground3NodeTransitionEnvelope[];
}) => string;
export declare const expandPlayground3HistoryItemTransitions: (envelopeJson: string | null | undefined) => Playground3NodeTransitionEnvelope[];
