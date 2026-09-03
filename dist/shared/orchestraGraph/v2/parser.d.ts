/**
 * Orchestra graph v2 — canonical-only top-level config parser.
 *
 * v2 accepts the canonical shape exclusively; every v1 authoring alias is
 * rejected with a migration hint instead of being silently normalized.
 * Leaf value parsing delegates to the exported v1 parsers after rejection so
 * value-level semantics stay single-sourced with the frozen v1 module.
 */
import type { OrchestraGraphAgent } from "../../orchestraGraphConfig";
import { type OrchestraGraphConfigV2 } from "./config";
export declare const parseAgentV2: (value: unknown, agentId: string) => OrchestraGraphAgent;
export declare const parseOrchestraGraphConfigV2: (value: Record<string, unknown>) => OrchestraGraphConfigV2;
