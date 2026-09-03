import { type OntologyEntity, type OntologyPropertySchema, type OntologyRelation, type OntologyState } from "./types";
/**
 * Validated pure operations. Every op takes the current OntologyState and
 * returns { state, ...payload } with a NEW state object (input is never
 * mutated). Validation failures throw OntologyOpError — tool handlers convert
 * these into retryable tool results.
 */
export declare class OntologyOpError extends Error {
}
export declare const upsertOntologyEntity: (state: OntologyState, input: {
    id: string;
    type: string;
    properties?: Record<string, unknown>;
}) => {
    state: OntologyState;
    entity: OntologyEntity;
    created: boolean;
};
export declare const deleteOntologyEntity: (state: OntologyState, input: {
    id: string;
}) => {
    state: OntologyState;
    removedRelationIds: string[];
};
export declare const linkOntologyEntities: (state: OntologyState, input: {
    type: string;
    from: string;
    to: string;
    properties?: Record<string, unknown>;
}) => {
    state: OntologyState;
    relation: OntologyRelation;
    created: boolean;
};
export declare const unlinkOntologyEntities: (state: OntologyState, input: {
    type: string;
    from: string;
    to: string;
}) => {
    state: OntologyState;
    removedId: string;
};
export declare const patchOntologySchema: (state: OntologyState, input: {
    entityTypes?: Record<string, {
        description?: string;
        properties?: Record<string, OntologyPropertySchema>;
    }>;
    relationTypes?: Record<string, {
        description?: string;
        from?: string[];
        to?: string[];
        properties?: Record<string, OntologyPropertySchema>;
    }>;
}) => {
    state: OntologyState;
    declaredTypes: string[];
};
export declare const queryOntologyByEntity: (state: OntologyState, input: {
    type?: string;
    match?: Record<string, unknown>;
}) => OntologyEntity[];
export declare const queryOntologyByRelation: (state: OntologyState, input: {
    type?: string;
    from?: string;
    to?: string;
}) => OntologyRelation[];
/** Entities within `depth` hops (directed, from = outgoing + incoming). */
export declare const queryOntologyNeighborhood: (state: OntologyState, input: {
    entityId: string;
    depth?: number;
}) => {
    entities: OntologyEntity[];
    relations: OntologyRelation[];
};
/** BFS shortest directed path from → to. Returns entity ids in order, or null. */
export declare const queryOntologyPath: (state: OntologyState, input: {
    from: string;
    to: string;
    maxDepth?: number;
}) => {
    path: string[];
    relationIds: string[];
} | null;
