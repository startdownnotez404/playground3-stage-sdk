export declare const toPlayground3ProviderSafeToolName: (toolName: string) => string;
export declare const buildPlayground3ProviderToolNameMap: (toolNames: string[]) => {
    originalToProvider: Map<string, string>;
    providerToOriginal: Map<string, string>;
};
export interface Playground3ProviderToolDefinition {
    name: string;
    description?: string;
    inputSchema?: Record<string, unknown>;
}
export type Playground3ProviderToolChoice = "auto" | "required" | {
    type: "tool";
    name: string;
};
export declare const mapPlayground3ToolsForProvider: (tools: Playground3ProviderToolDefinition[] | undefined) => {
    tools: Playground3ProviderToolDefinition[];
    originalToProvider: Map<string, string>;
    providerToOriginal: Map<string, string>;
};
export declare const mapPlayground3ToolChoiceForProvider: (toolChoice: Playground3ProviderToolChoice | undefined, originalToProvider: Map<string, string>) => Playground3ProviderToolChoice | undefined;
export declare const restorePlayground3ToolCallNames: <T extends {
    name: string;
    args: Record<string, unknown>;
}>(toolCalls: T[] | undefined, providerToOriginal: Map<string, string>) => T[];
export declare const preparePlayground3ProviderInference: (input: {
    tools?: Playground3ProviderToolDefinition[];
    options?: {
        responseFormat?: {
            type: "jsonObject";
        };
        toolChoice?: Playground3ProviderToolChoice;
        reasoning?: {
            enabled: boolean;
            mode: string;
            budgetTokens?: number;
        };
    };
    /** Extra original tool names (e.g. from message history) to include in the map. */
    additionalToolNames?: readonly string[];
}) => {
    tools: Playground3ProviderToolDefinition[];
    options: {
        responseFormat?: {
            type: "jsonObject";
        };
        toolChoice?: Playground3ProviderToolChoice;
        reasoning?: {
            enabled: boolean;
            mode: string;
            budgetTokens?: number;
        };
    };
    originalToProvider: Map<string, string>;
    providerToOriginal: Map<string, string>;
};
export declare const mapPlayground3MessageToolNamesForProvider: <T extends {
    role: string;
    name?: string;
    toolCalls?: Array<{
        name: string;
        args: Record<string, unknown>;
        id?: string;
    }>;
}>(messages: T[], originalToProvider: Map<string, string>) => T[];
