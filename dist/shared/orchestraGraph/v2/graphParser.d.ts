/**
 * Orchestra graph v2 — canonical-only node/graph-wiring parser.
 *
 * Unlike v1 (shared/orchestraGraph/v1/graphParser.ts), v2 accepts only the
 * canonical authoring shape: keyed node registry, explicit entryNodeId, no
 * legacy aliases, no dropped expansion fields. Leaf value parsing delegates
 * to the exported v1 leaf parsers after v2 alias rejection, so value-level
 * semantics stay single-sourced.
 */
import { type OrchestraGraphNodeV2, type OrchestraGraphWiringV2 } from "./config";
export declare const parseNodeV2: (value: unknown, nodeId: string) => OrchestraGraphNodeV2;
/** Top-level keyed node registry; parser injects `id = key` into each node. */
export declare const parseNodesV2: (value: unknown) => Record<string, OrchestraGraphNodeV2>;
/** Wiring-only graph: explicit entry + edges/groups (nodes live top-level). */
export declare const parseGraphV2: (value: unknown) => OrchestraGraphWiringV2;
