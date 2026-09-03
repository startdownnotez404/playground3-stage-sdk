import type { OrchestraGraphAgent, OrchestraGraphNode, OrchestraGraphOutputKind } from "../../orchestraGraphConfig";
import type { OrchestraGraphConfigAny } from "../../orchestraGraph/v2/config";
import { type Playground3ReasoningOutputContract } from "../reasoningOutputContract";
export type Playground3ResolvedOutputContract = Playground3ReasoningOutputContract & {
    kind?: OrchestraGraphOutputKind;
};
/**
 * Resolve the JSON/text output contract for a graph node or spawned agent.
 * Precedence: node.outputSchema → agent.responseSchema → legacy agent.output.
 * When `agent.reasoning` is true, injects `reasoning: "string"` if missing.
 */
export declare const resolvePlayground3OutputContract: (input: {
    graphConfig: OrchestraGraphConfigAny;
    agent: OrchestraGraphAgent;
    node?: Pick<OrchestraGraphNode, "id" | "outputSchema">;
}) => Playground3ResolvedOutputContract;
export declare const resolvePlayground3AgentOutputContract: (input: {
    graphConfig: OrchestraGraphConfigAny;
    agentId: string;
}) => Playground3ResolvedOutputContract;
