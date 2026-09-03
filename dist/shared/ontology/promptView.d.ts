import { type OntologyState } from "./types";
export interface OntologyPromptViewEntityType {
    type: string;
    count: number;
    description?: string;
}
export interface OntologyPromptViewRelationType {
    type: string;
    count: number;
}
/**
 * Compact prompt-facing summary rendered by {{checkpoint.*}} magic tokens.
 * Deliberately small: counts, schema (with usage), and the most recent entity
 * ids. Full data stays behind the ontology.* MCP tools — the prompt view is a
 * map legend, not the map.
 */
export interface OntologyPromptView {
    loose: boolean;
    entityCount: number;
    relationCount: number;
    entityTypes: OntologyPromptViewEntityType[];
    relationTypes: OntologyPromptViewRelationType[];
    /** Most recently upserted entities (tail of insertion order), capped. */
    recentEntities: {
        id: string;
        type: string;
    }[];
}
export declare const buildOntologyPromptView: (state: OntologyState, options?: {
    recentEntityCap?: number;
}) => OntologyPromptView;
