export declare const PLAYGROUND3_CONSTANTS: {
    readonly runtimeModes: {
        readonly solo: "solo";
        readonly channel: "channel";
    };
    readonly roomCapabilities: {
        readonly invoke: "invoke";
        readonly observe: "observe";
    };
    readonly commands: {
        readonly startSession: "playground3StartSession";
        readonly submitNodeTransition: "playground3SubmitNodeTransition";
        readonly saveExecutorCheckpoint: "playground3SaveExecutorCheckpoint";
        readonly saveClientStateCheckpoint: "playground3SaveClientStateCheckpoint";
        readonly executorHeartbeat: "playground3ExecutorHeartbeat";
        readonly hydrateSession: "playground3HydrateSession";
        readonly runInference: "playground3RunInference";
        readonly startInference: "playground3StartInference";
        readonly invokeBackendTool: "playground3InvokeBackendTool";
        readonly submitHumanInput: "playground3SubmitHumanInput";
        readonly interruptRun: "playground3InterruptRun";
        readonly closeSession: "playground3CloseSession";
    };
    readonly settings: {
        readonly chunkCoalesceWindowMs: 40;
        readonly chunkCoalesceMaxChars: 256;
        /** Give AppSync subscription filters time to attach before Event workers emit. */
        readonly subscriptionSettleMs: 250;
        /** Client-side ceiling waiting for the final subscription chunk. */
        readonly asyncInferenceTimeoutMs: number;
        /**
         * @deprecated Hot-path job GET polling removed; settlement uses chunk isFinal
         * plus InferenceJob onUpdate. Kept for any external readers of the constant.
         */
        readonly inferenceJobPollIntervalMs: 50;
        /**
         * If neither subscription final nor durable job completes within this window
         * after the last progress signal, GET the inference job once. A still
         * running/queued job re-arms this timer (absolute ceiling remains
         * asyncInferenceTimeoutMs). Missing/failed job → fail instead of leaving
         * "Thinking…".
         */
        readonly asyncInferenceStallTimeoutMs: 45000;
    };
    readonly transitionKinds: {
        readonly nodeStarted: "nodeStarted";
        readonly inferenceStepCompleted: "inferenceStepCompleted";
        readonly executorCheckpoint: "executorCheckpoint";
        readonly waitingHuman: "waitingHuman";
        readonly nodeCompleted: "nodeCompleted";
        readonly nodeFailed: "nodeFailed";
        readonly nodeInterrupted: "nodeInterrupted";
    };
    readonly statuses: {
        readonly queued: "queued";
        readonly running: "running";
        readonly waitingHuman: "waitingHuman";
        readonly completed: "completed";
        readonly failed: "failed";
        readonly interrupted: "interrupted";
        readonly closed: "closed";
    };
    readonly historyItemTypes: {
        readonly agentStep: "agentStep";
        readonly nodeOutput: "nodeOutput";
        readonly turnBundle: "turnBundle";
        readonly approval: "approval";
        readonly error: "error";
    };
    readonly historyEnvelopeKinds: {
        readonly transition: "playground3.transition";
        readonly turnBundle: "playground3.turnBundle";
    };
    readonly artifact: {
        readonly inlineMaxBytes: 240000;
    };
    readonly retention: {
        readonly historyListPageSize: 1000;
        /** Superseded board checkpoints expire after this many days. */
        readonly clientStateCheckpointTtlDays: 30;
        /** In-progress executor recovery rows expire after this many hours. */
        readonly executorCheckpointTtlHours: 24;
        readonly ttlAttributeName: "expiresAt";
        /** Hard reject above this — safely under the DynamoDB 400 KB item limit. */
        readonly maxFrontendStateBytes: 350000;
        /** FIFO eviction keeps at most this many board checkpoints per game. */
        readonly maxClientStateCheckpointsPerNodeGraph: 50;
    };
    readonly context: {
        readonly laneDefaultId: "main";
        readonly laneScopeKinds: {
            readonly session: "session";
            readonly nodeGraph: "nodeGraph";
            readonly nodeGraphs: "nodeGraphs";
        };
        readonly compactionStatuses: {
            readonly active: "active";
            readonly superseded: "superseded";
        };
    };
    readonly reasoning: {
        readonly schemaField: "reasoning";
    };
    readonly promptContext: {
        readonly messageSourceKinds: {
            readonly sessionContext: "sessionContext";
            readonly globalContext: "globalContext";
            readonly inheritedNodeOutput: "inheritedNodeOutput";
            readonly promptInjection: "promptInjection";
            readonly routingHarness: "routingHarness";
        };
    };
};
export type Playground3TransitionKind = (typeof PLAYGROUND3_CONSTANTS.transitionKinds)[keyof typeof PLAYGROUND3_CONSTANTS.transitionKinds];
export type Playground3Status = (typeof PLAYGROUND3_CONSTANTS.statuses)[keyof typeof PLAYGROUND3_CONSTANTS.statuses];
export type Playground3ContextLaneScopeKind = (typeof PLAYGROUND3_CONSTANTS.context.laneScopeKinds)[keyof typeof PLAYGROUND3_CONSTANTS.context.laneScopeKinds];
export type Playground3ContextCompactionStatus = (typeof PLAYGROUND3_CONSTANTS.context.compactionStatuses)[keyof typeof PLAYGROUND3_CONSTANTS.context.compactionStatuses];
export type Playground3PromptContextMessageSourceKind = (typeof PLAYGROUND3_CONSTANTS.promptContext.messageSourceKinds)[keyof typeof PLAYGROUND3_CONSTANTS.promptContext.messageSourceKinds];
