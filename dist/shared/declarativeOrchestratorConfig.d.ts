import type { DeclarativeAgentConfig } from "./declarativeAgentConfig";
import type { ProviderConfig } from "./PROVIDER_CONFIGs";
import { type DeclarativeRulesMarkdownDocument } from "./declarativeRulesMarkdown";
import { type MemoryAccessPolicy } from "./memoryConfig";
import type { OrchestraGraphConfig } from "./orchestraGraphConfig";
export declare const PLAYGROUND_DEFINITION_KINDs: {
    readonly builtIn: "builtIn";
    readonly userAuthored: "userAuthored";
};
export type PlaygroundDefinitionKind = (typeof PLAYGROUND_DEFINITION_KINDs)[keyof typeof PLAYGROUND_DEFINITION_KINDs];
export declare const PLAYGROUND_DEFINITION_VISIBILITYs: {
    readonly private: "private";
    readonly unlisted: "unlisted";
};
export type PlaygroundDefinitionVisibility = (typeof PLAYGROUND_DEFINITION_VISIBILITYs)[keyof typeof PLAYGROUND_DEFINITION_VISIBILITYs];
export declare const DECLARATIVE_RESPONSE_KINDs: {
    readonly text: "text";
    readonly json: "json";
};
export type DeclarativeResponseKind = (typeof DECLARATIVE_RESPONSE_KINDs)[keyof typeof DECLARATIVE_RESPONSE_KINDs];
export declare const DECLARATIVE_ORCHESTRA_PROFILEs: {
    readonly singleStep: "singleStep";
    readonly planExecuteVerify: "planExecuteVerify";
    readonly conductorDriven: "conductorDriven";
    readonly graphDriven: "graphDriven";
    readonly full: "full";
    readonly singleStepExecutor: "singleStepExecutor";
};
export type DeclarativeOrchestraProfile = (typeof DECLARATIVE_ORCHESTRA_PROFILEs)[keyof typeof DECLARATIVE_ORCHESTRA_PROFILEs];
export declare const ORCHESTRA_EXECUTION_MODEs: {
    readonly staticNodeGraph: "static-nodeGraph";
};
export type OrchestraExecutionMode = (typeof ORCHESTRA_EXECUTION_MODEs)[keyof typeof ORCHESTRA_EXECUTION_MODEs];
export declare const DECLARATIVE_PAYLOAD_VALUE_TYPEs: {
    readonly string: "string";
    readonly number: "number";
    readonly boolean: "boolean";
    readonly object: "object";
};
export type DeclarativePayloadValueType = (typeof DECLARATIVE_PAYLOAD_VALUE_TYPEs)[keyof typeof DECLARATIVE_PAYLOAD_VALUE_TYPEs];
export interface DeclarativeActionDefinition {
    actionType: string;
    description?: string;
    payloadSchema?: Record<string, DeclarativePayloadValueType>;
}
export interface DeclarativeResponseShape {
    kind: DeclarativeResponseKind;
    jsonSchema?: Record<string, DeclarativePayloadValueType>;
}
export declare const PERFORMER_COST_TIERs: {
    readonly low: "low";
    readonly medium: "medium";
    readonly high: "high";
};
export type PerformerCostTier = (typeof PERFORMER_COST_TIERs)[keyof typeof PERFORMER_COST_TIERs];
export interface DeclarativePerformerDefinition {
    id: string;
    label: string;
    provider: string;
    model: string;
    baseUrl?: string;
    costTier?: PerformerCostTier;
    maxTokens?: number;
    strengths?: string[];
    weaknesses?: string[];
}
export interface DeclarativeSubagentRole {
    name: string;
    description?: string;
    agentPersona: string;
    toolNames?: string[];
    memoryAccess?: MemoryAccessPolicy;
    performerId?: string;
    /** Capability string matched against performer strengths during 6-step performer routing. */
    requiredCapability?: string;
}
/**
 * Stored once per session at startSession time.
 * Every advanceTurn reads it from session state — no per-turn re-passing.
 */
export interface UserModelConstraint {
    provider: string;
    model: string;
    baseUrl?: string;
    apiKey?: string;
}
/** How the phases in a conductor plan are connected. */
export type ConductorTopology = "linear" | "parallel" | "custom";
/**
 * An abstract phase slot in the working graph.
 * The conductor decides what kind of work happens at each slot —
 * not which specific agent fills it (that is the sector director's job).
 */
export interface ConductorPhase {
    /** Stable slot identifier within this plan, e.g. "phase-0". */
    id: string;
    /**
     * Abstract role kind for this slot.
     * e.g. "planning", "execution", "verification", "reflection".
     * The sector director maps this kind to a concrete agent ID.
     */
    kind: string;
}
/**
 * The first-layer working graph produced by the conductor.
 * Describes the abstract topology and phase slots only.
 * Concrete agent assignment is left to the sector director.
 */
export interface ConductorPlan {
    /** How the phases connect. Most profiles use "linear". */
    topology: ConductorTopology;
    /** Ordered abstract phase slots for this turn. */
    phases: ConductorPhase[];
}
/**
 * A reusable cluster definition selected by the sector director.
 * A cluster is a set of agents that run together inside one phase.
 */
export interface SectorDirectorCluster {
    id: string;
    agentIds: string[];
    description?: string;
}
/**
 * Sector-director assignment for one conductor phase.
 * When a real multi-agent cluster covers the phase, `clusterId` is set.
 * Single-agent phases bind directly — no cluster wrapper is created.
 */
export interface SectorDirectorPhaseAssignment {
    /** Present only when the phase maps to a multi-agent cluster. */
    clusterId?: string;
    activateRoles: string[];
}
/**
 * Output produced by the sector director.
 * Maps conductor phases onto reusable clusters, then flattens the selected
 * cluster agent order into the overall execution sequence for this turn.
 */
export interface SectorDirectorPlan {
    /** Ordered list of concrete agent IDs to run across all selected phases. */
    activateRoles: string[];
    /** Cluster definitions available for this turn. */
    clusters: Record<string, SectorDirectorCluster>;
    /** Maps phase slot id to the selected cluster plus that cluster's agent order. */
    phaseAssignments: Record<string, SectorDirectorPhaseAssignment>;
}
export interface DeclarativeOrchestratorConfig {
    agentPersona: string;
    initialState: Record<string, unknown>;
    actionDefinitions: DeclarativeActionDefinition[];
    responseShape: DeclarativeResponseShape;
    agent?: DeclarativeAgentConfig;
    orchestraProfile?: DeclarativeOrchestraProfile;
    /**
      * When true, the planner pipeline runs every turn and dynamically authors
      * per-turn executor/verifier guidance even under the singleStepExecutor
      * profile. Lets the planning stack adapt to the current state instead of
      * relying solely on static role agentPersonas.
     */
    dynamicInstructor?: boolean;
    rulesMarkdown?: string;
    toolsMarkdown?: string[];
    performerMarkdown?: string[];
    rulesDocument?: DeclarativeRulesMarkdownDocument;
    subagents?: DeclarativeSubagentRole[];
    performers?: DeclarativePerformerDefinition[];
    /**
     * Author-defined execution DAG with outcome-based routing.
     * Set when orchestraProfile is "graphDriven".
      * The graph replaces the fixed-profile phase/cluster planning system with
     * an explicit node/edge topology including conditional backward loops.
     */
    orchestraGraph?: OrchestraGraphConfig;
}
export declare const parseDeclarativeOrchestratorConfig: (value: unknown) => DeclarativeOrchestratorConfig;
export declare const parseDeclarativeOrchestratorConfigJson: (raw: string) => DeclarativeOrchestratorConfig;
export declare const resolvePerformerProviderConfig: (performers: DeclarativePerformerDefinition[] | undefined, performerId: string | undefined) => ProviderConfig | undefined;
export declare const resolvePerformerModelLabel: (performers: DeclarativePerformerDefinition[] | undefined, performerId: string | undefined) => string | undefined;
export declare const validatePerformerReferences: (config: DeclarativeOrchestratorConfig) => void;
