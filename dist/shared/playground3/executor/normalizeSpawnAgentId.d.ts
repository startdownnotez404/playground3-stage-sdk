import type { Playground3AgentDefinition } from "../agent/agentDefinition";
/**
 * Map model-invented spawn ids (casing, punctuation, display names) onto an
 * allowed registered agentId. Returns the original trimmed id when no match.
 */
export declare const normalizePlayground3SpawnAgentId: (input: {
    rawAgentId: string;
    allowedAgentIds: readonly string[];
    agentDefinitions?: Record<string, Playground3AgentDefinition>;
    parentAgentId?: string;
}) => string;
export declare const resolvePlayground3SpawnAllowedAgentIds: (input: {
    spawnSubagents?: readonly string[];
    nodeAgentIds?: readonly string[];
}) => string[];
/**
 * Gate spawnSubagent to nodes that declare a spawn contract. Without this,
 * GM capabilities leak spawn into night_open and mash discuss/vote/witch.
 */
export declare const resolvePlayground3NodeSpawnAllowedAgentIds: (input: {
    spawnSubagents?: readonly string[];
    nodeAgentIds?: readonly string[];
    taskSkills?: readonly string[];
    preloadSkills?: readonly string[];
}) => string[];
