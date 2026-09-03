import { type DeclarativePayloadValueType } from "./declarativeOrchestratorConfig";
import { type HumanApprovalConfig } from "./humanApprovalConfig";
export declare const AGENT_LOOP_STOP_REASONs: {
    readonly finalAnswer: "finalAnswer";
    readonly humanInputRequired: "humanInputRequired";
    readonly toolApprovalRequired: "toolApprovalRequired";
    readonly toolFailure: "toolFailure";
    readonly maxSteps: "maxSteps";
    readonly parseError: "parseError";
    readonly phaseError: "phaseError";
};
export type AgentLoopStopReason = (typeof AGENT_LOOP_STOP_REASONs)[keyof typeof AGENT_LOOP_STOP_REASONs];
export declare const AGENT_RESPONSE_KINDs: {
    readonly text: "text";
    readonly json: "json";
};
export type AgentResponseKind = (typeof AGENT_RESPONSE_KINDs)[keyof typeof AGENT_RESPONSE_KINDs];
export interface AgentToolSpec {
    name: string;
    description?: string;
    paramSchema?: Record<string, DeclarativePayloadValueType>;
    /** Full JSON Schema for provider tool calling when flat paramSchema is too coarse. */
    inputJsonSchema?: Record<string, unknown>;
    humanApproval?: HumanApprovalConfig;
    /** Playground2 frontend-action bridge input classification. */
    expectedInputType?: string;
}
export interface AgentLoopPolicy {
    maxSteps: number;
    maxToolCallsPerStep?: number;
    retryOnToolFailure?: boolean;
}
export interface AgentResponseShape {
    kind: AgentResponseKind;
    jsonSchema?: Record<string, DeclarativePayloadValueType>;
}
export interface DeclarativeAgentConfig {
    agentPersona: string;
    tools: AgentToolSpec[];
    loopPolicy: AgentLoopPolicy;
    responseShape: AgentResponseShape;
    planningHint?: string;
}
export declare const parseDeclarativeAgentConfig: (value: unknown) => DeclarativeAgentConfig;
