import type { Playground3McpTool } from "../playground3/mcp/manifest";
import type { Playground3ToolHandler } from "../playground3/playgroundDefinition";
import { type OntologyStateLens } from "./checkpointAdapter";
export declare const ONTOLOGY_TOOL_NAMES: {
    readonly upsertEntity: "ontology.upsertEntity";
    readonly deleteEntity: "ontology.deleteEntity";
    readonly link: "ontology.link";
    readonly unlink: "ontology.unlink";
    readonly patchSchema: "ontology.patchSchema";
    readonly query: "ontology.query";
};
/**
 * Manifest entries for the ontology toolkit. Generic per-operation tools; the
 * factory shape keeps per-type generated tools (ontology.linkWorksAt) open as
 * a future, non-breaking option.
 */
export declare const buildOntologyMcpTools: () => Playground3McpTool[];
/**
 * Toolkit handler matching Playground3ToolHandler<TState>. Mutations return
 * `data.state` (the full next app state) which the callTool wrapper persists;
 * queries return data only. Any non-ontology tool name throws.
 */
export declare const createOntologyToolHandler: <TState>(input?: {
    lens?: OntologyStateLens<TState>;
}) => Playground3ToolHandler<TState>;
