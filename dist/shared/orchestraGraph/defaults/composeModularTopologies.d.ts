/**
 * Compose modular subagent topologies into the host graph (schema v2).
 *
 *   top1 (+ prompts) + modular bindings  →  top2
 *
 * top2 is the single surface for map render and execution. Module nodes are
 * appended into the top-level keyed nodes registry; module edges are tagged
 * kind:"module" so graph handover (routeConditionKey) ignores them; peers are
 * entered via playground3.spawnSubagent in the same runtime.
 */
/**
 * Plug authored `subagentTopologies` (optionalSpawn, inlineExpansion) into
 * the v2 nodes registry / graph edges / graph groups. Idempotent when module
 * node ids already exist. Operates on raw v2 authoring JSON (pre-parse).
 */
export declare const composeModularTopologiesIntoGraphJson: (value: unknown) => unknown;
