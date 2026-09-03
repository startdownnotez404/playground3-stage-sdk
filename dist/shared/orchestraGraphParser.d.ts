import type { OrchestraGraphConfigV1 } from "./orchestraGraphConfig";
import type { OrchestraGraphConfigAny, OrchestraGraphConfigV2 } from "./orchestraGraph/v2/config";
/**
 * Version-dispatching parse: v1 (Playground2, frozen) or v2 (Playground3)
 * based on the config's `version` field. Callers that know their schema
 * version should prefer the version-specific helpers below for precise types.
 */
export declare const parseOrchestraGraphConfig: (value: unknown) => OrchestraGraphConfigAny;
export declare const parseOrchestraGraphConfigJson: (raw: string) => OrchestraGraphConfigAny;
/** v1-only parse (Playground2 call sites — rejects v2 configs). */
export declare const parseOrchestraGraphConfigV1Json: (raw: string) => OrchestraGraphConfigV1;
/** v2-only parse (Playground3 call sites — rejects v1 configs). */
export declare const parseOrchestraGraphConfigV2Json: (raw: string) => OrchestraGraphConfigV2;
