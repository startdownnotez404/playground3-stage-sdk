/**
 * shared/ontology — typed, app-agnostic ontology state living in the PG3 data
 * plane (checkpoint). Nodes never hold data: agents read/write the ontology via
 * MCP tools; prompts see a compact view via {{checkpoint.*}} magic tokens.
 */
/** Scalar property kinds supported by per-type property schemas. */
export type OntologyPropertyType = "string" | "number" | "integer" | "boolean" | "string[]";
export declare const ONTOLOGY_PROPERTY_TYPES: readonly OntologyPropertyType[];
export declare const isOntologyPropertyType: (value: unknown) => value is OntologyPropertyType;
export interface OntologyPropertySchema {
    type: OntologyPropertyType;
    required?: boolean;
    description?: string;
}
export interface OntologyEntityTypeSchema {
    description?: string;
    /** Property name → schema. Absent map = any properties allowed. */
    properties?: Record<string, OntologyPropertySchema>;
}
export interface OntologyRelationTypeSchema {
    description?: string;
    /** Allowed entity types for the source. Absent = any. */
    from?: string[];
    /** Allowed entity types for the target. Absent = any. */
    to?: string[];
    properties?: Record<string, OntologyPropertySchema>;
}
export interface OntologySchemaRegistry {
    entityTypes: Record<string, OntologyEntityTypeSchema>;
    relationTypes: Record<string, OntologyRelationTypeSchema>;
}
export interface OntologyEntity {
    id: string;
    type: string;
    properties: Record<string, unknown>;
}
export interface OntologyRelation {
    /** Deterministic id: `${type}:${from}->${to}`. */
    id: string;
    type: string;
    from: string;
    to: string;
    properties?: Record<string, unknown>;
}
/**
 * Durable structured knowledge ("what we know") — contrast with the whiteboard,
 * which is ephemeral working memory. Empty type registries = loose mode
 * (general-purpose builder): any entity/relation type is accepted; once types
 * are declared via patchSchema, unknown types are rejected.
 */
export interface OntologyState {
    schema: OntologySchemaRegistry;
    entities: Record<string, OntologyEntity>;
    relations: Record<string, OntologyRelation>;
}
export declare const createEmptyOntologyState: () => OntologyState;
export declare const buildOntologyRelationId: (input: {
    type: string;
    from: string;
    to: string;
}) => string;
export declare const isOntologyLooseSchema: (state: OntologyState) => boolean;
/** Structural guard for checkpoint parse paths. */
export declare const normalizeOntologyState: (value: unknown) => OntologyState;
