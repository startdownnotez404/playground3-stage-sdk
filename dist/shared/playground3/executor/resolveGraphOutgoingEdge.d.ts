import type { OrchestraGraphEdge } from "../../orchestraGraphConfig";
export declare const resolvePlayground3GraphOutgoingEdge: (input: {
    edges: OrchestraGraphEdge[];
    fromNodeId: string;
    routeConditionKey?: string;
}) => OrchestraGraphEdge | undefined;
