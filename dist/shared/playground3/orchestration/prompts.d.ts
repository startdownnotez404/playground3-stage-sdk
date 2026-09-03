export interface Playground3AgentPrompts {
    agentPersona?: string;
    description?: string;
}
export interface Playground3NodeTaskPrompts {
    goal?: string;
    rules?: string[];
    skills?: string[];
    preloadSkills?: string[];
    tools?: string[];
    successCriteria?: Array<{
        type: string;
        toolName?: string;
        match: unknown;
    }>;
    retryOn?: Array<{
        type: string;
        toolName?: string;
        match: unknown;
        maxAttempts?: number;
    }>;
    /** Route condition key emitted on success; optional public chronicle lane. */
    output?: {
        routeConditionKey?: string;
        broadcastLane?: string;
    };
}
export interface Playground3PromptInjection {
    role: "user" | "assistant" | "system";
    template: string;
}
export interface Playground3GraphPrompts {
    agents?: Record<string, Playground3AgentPrompts>;
    nodes?: Record<string, {
        task?: Playground3NodeTaskPrompts;
        promptInjections?: Playground3PromptInjection[];
    }>;
}
