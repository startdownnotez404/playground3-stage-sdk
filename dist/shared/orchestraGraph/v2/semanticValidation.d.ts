/**
 * Orchestra graph v2 — semantic validation (references + integrity).
 *
 * Mirrors shared/orchestraGraph/v1/semanticValidation.ts with the v2 deltas:
 * - nodes come from the top-level keyed registry (paths read `nodes.<id>`).
 * - entry reachability starts at the explicit graph.entryNodeId.
 * - legacy expansion checks (supervisor/subagent templates) are gone.
 * - whiteboardAccess board ids must resolve against the whiteboards registry.
 * - workflow profile "hybrid" = static DAG + human gates (supervisorExpansion
 *   no longer exists in v2).
 */
import type { OrchestraGraphConfigV2 } from "./config";
export declare const validateContextLaneReferencesV2: (config: OrchestraGraphConfigV2) => void;
export declare const validateReferencesV2: (config: OrchestraGraphConfigV2) => void;
export declare const validateWorkflowProfileV2: (config: OrchestraGraphConfigV2) => void;
export declare const validateGraphIntegrityV2: (config: OrchestraGraphConfigV2) => void;
