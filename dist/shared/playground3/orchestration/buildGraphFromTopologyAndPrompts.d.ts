import type { OrchestraGraphConfigV2 } from "../../orchestraGraph/v2/config";
import type { Playground3GraphPrompts } from "./prompts";
/**
 * Merge app prompts into a v2 topology JSON, then compose modular topologies
 * (top1 → top2). Input topology JSONs are authored in schema v2 canonical
 * shape: top-level keyed `subagents` + `nodes` registries, wiring-only
 * `graph` with an explicit `entryNodeId`.
 */
export declare const buildGraphFromTopologyAndPrompts: (topologyJson: string, prompts: Playground3GraphPrompts) => string;
export declare const buildMergedPlayground3GraphJson: (input: {
    topologyJson: string;
    prompts: Playground3GraphPrompts;
}) => string;
export declare const parseMergedPlayground3GraphConfig: (topologyJson: string, prompts: Playground3GraphPrompts) => OrchestraGraphConfigV2;
