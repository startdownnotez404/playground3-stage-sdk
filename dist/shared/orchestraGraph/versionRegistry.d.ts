import { type OrchestraGraphConfigV1, type OrchestraGraphSchemaVersion } from "../orchestraGraphConfig";
import type { OrchestraGraphConfigV2 } from "./v2/config";
export declare const resolveOrchestraGraphVersion: (value: unknown) => OrchestraGraphSchemaVersion;
export declare const switchOrchestraGraphVersion: <T>(input: {
    version: OrchestraGraphSchemaVersion;
    v1_0: () => T;
    v2_0?: () => T;
}) => T;
export declare const matchOrchestraGraphConfig: <T>(input: {
    config: OrchestraGraphConfigV1 | OrchestraGraphConfigV2;
    v1_0: (config: OrchestraGraphConfigV1) => T;
    v2_0?: (config: OrchestraGraphConfigV2) => T;
}) => T;
