import { type Playground3PlanContext, type Playground3PlanNextStepsArgs, type Playground3PlannedFragment } from "./types";
/** Strict args shape parse — throws with a path-prefixed message. */
export declare const parsePlayground3PlanNextStepsArgs: (value: unknown) => Playground3PlanNextStepsArgs;
export type Playground3PlanNextStepsValidation = {
    ok: true;
    fragment: Playground3PlannedFragment;
} | {
    ok: false;
    errors: string[];
};
/**
 * Validate + materialize a planNextSteps call against the live graph.
 * Runtime-only rules (capability bounds, depth budget, executed-node loops)
 * layer on top of the SAME v2 semantic validation used at parse time: the
 * candidate merged config runs through validateReferencesV2, so references
 * (agents / performers / toolSets / responseSchemas / lanes / edges) are
 * checked by the single source of truth, never a parallel ad-hoc checker.
 */
export declare const validatePlayground3PlanNextStepsCall: (input: {
    args: Playground3PlanNextStepsArgs;
    context: Playground3PlanContext;
    /** Skip per-turn caps (cold-resume reconstruction already spent them). */
    skipTurnCaps?: boolean;
}) => Playground3PlanNextStepsValidation;
