import type { Playground3PlanContext } from "./types";
/**
 * In-loop execution of playground3.planNextSteps: validate args + capability
 * + depth against the executor-owned planContext, record the materialized
 * fragment, and return an ok tool result naming the planned node ids. The
 * executor applies recorded fragments to the live graph when the node
 * completes — the plan never mutates the graph mid-loop.
 */
export declare const executePlayground3PlanNextStepsCall: (input: {
    args: unknown;
    planContext: Playground3PlanContext;
    skipTurnCaps?: boolean;
}) => unknown;
