import type { OrchestraGraphConfigV1, OrchestraGraphGroup } from "../orchestraGraphConfig";
import type { Playground3ContextLaneScope } from "./contextCompaction";
export interface ResolvedContextLaneBinding {
    laneId: string;
    scope: Playground3ContextLaneScope;
    groupId?: string;
    compactWhenTailTokensExceed?: number;
}
export declare const findOrchestraGraphGroupForNodeId: (config: OrchestraGraphConfigV1, nodeId: string) => OrchestraGraphGroup | undefined;
export declare const resolveContextLaneBinding: (input: {
    config: OrchestraGraphConfigV1;
    nodeId: string;
    nodeGraphId?: string;
}) => ResolvedContextLaneBinding;
