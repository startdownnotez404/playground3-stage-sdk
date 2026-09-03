import { type DeclarativePayloadValueType } from "../../declarativeOrchestratorConfig";
import { type OrchestraGraphNodeType } from "../../orchestraGraphConfig";
export declare const isRecord: (value: unknown) => value is Record<string, unknown>;
export declare const hasOwn: (value: Record<string, unknown>, key: string) => boolean;
export declare const requireString: (value: unknown, path: string) => string;
export declare const optionalString: (value: unknown) => string | undefined;
export interface AliasedPropertyMatch {
    key: string;
    value: unknown;
}
export declare const resolveAliasedProperty: (input: {
    record: Record<string, unknown>;
    path: string;
    canonicalKey: string;
    aliasKeys?: string[];
    includeKey?: (key: string, value: unknown) => boolean;
}) => AliasedPropertyMatch | undefined;
export declare const parseNodeType: (value: unknown, path: string) => OrchestraGraphNodeType | undefined;
export declare const isJsonSchemaLike: (value: unknown) => value is Record<string, unknown>;
export declare const parseOptionalJsonSchemaObject: (value: unknown, path: string) => Record<string, unknown> | undefined;
export declare const parsePayloadSchema: (value: unknown, path: string) => Record<string, DeclarativePayloadValueType> | undefined;
