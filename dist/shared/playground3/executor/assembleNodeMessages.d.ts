import type { OrchestraGraphAgent, OrchestraGraphNode } from "../../orchestraGraphConfig";
import type { OrchestraGraphConfigV2 } from "../../orchestraGraph/v2/config";
import type { Playground3ChatMessage } from "./types";
import type { Playground3PayloadSection } from "./payloadSections";
import type { Playground3CompletedNodeRunSnapshot } from "./buildInheritHistoryMessages";
import type { Playground3SkillReader } from "../skills";
export interface AssemblePlayground3NodeMessagesInput {
    graphNode: OrchestraGraphNode;
    agent: OrchestraGraphAgent;
    graphConfig?: OrchestraGraphConfigV2;
    checkpointState: unknown;
    completedNodeRuns: Playground3CompletedNodeRunSnapshot[];
    sessionMessages?: Playground3ChatMessage[];
    skillReader?: Playground3SkillReader;
    /** Shared app law from `playground-examples/<app>/src/agent/RULE.md`. */
    appRulesMarkdown?: string | null;
    /** Live composer / turn user text for this node run. */
    turnUserMessage?: string;
}
export interface AssemblePlayground3NodeMessagesResult {
    messages: Playground3ChatMessage[];
    sections: Playground3PayloadSection[];
}
export declare const assemblePlayground3NodeMessages: (input: AssemblePlayground3NodeMessagesInput) => Promise<AssemblePlayground3NodeMessagesResult>;
