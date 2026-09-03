import type { Playground3AgentsContextPanel } from "./agentsContextPanel";
import type { Playground3ContextWindowBreakdown, Playground3ContextWindowSegment } from "./contextWindow";
export declare const isPlayground3FlatSessionLog: (value: string) => boolean;
export type Playground3FlatSessionLogLine = {
    kind: "user";
    label: "user";
    content: string;
} | {
    kind: "context";
    label: "task" | "context" | "system";
    content: string;
} | {
    kind: "node";
    label: string;
    content: string;
};
export declare const parsePlayground3FlatSessionLog: (value: string) => Playground3FlatSessionLogLine[];
export declare const resolvePlayground3ContextSegmentDetailText: (input: {
    segment: Playground3ContextWindowSegment;
    agentsPanel?: Playground3AgentsContextPanel | null;
    breakdown?: Playground3ContextWindowBreakdown | null;
}) => string | null;
export declare const resolvePlayground3ContextSegmentDetailTitle: (segment: Playground3ContextWindowSegment) => string;
