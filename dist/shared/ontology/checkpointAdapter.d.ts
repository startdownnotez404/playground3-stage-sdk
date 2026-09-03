import type { Playground3CheckpointAdapter } from "../playground3/playgroundDefinition";
import { type OntologyState } from "./types";
export interface OntologyStateLens<TState> {
    /** Read the ontology slice (default: `state.ontology`). */
    get?: (state: TState) => OntologyState | undefined;
    /** Write the ontology slice immutably (default: `{ ...state, ontology }`). */
    set?: (state: TState, ontology: OntologyState) => TState;
}
export declare const resolveOntologyStateLens: <TState>(lens?: OntologyStateLens<TState>) => Required<OntologyStateLens<TState>>;
/**
 * Compose an app's checkpoint adapter so the ontology slice is always present
 * and structurally normalized (parse tolerates legacy/partial checkpoints).
 * The app keeps owning serialization; the toolkit only guards its own slice.
 */
export declare const createOntologyCheckpointAdapter: <TState>(input: {
    base: Playground3CheckpointAdapter<TState>;
    lens?: OntologyStateLens<TState>;
}) => Playground3CheckpointAdapter<TState>;
