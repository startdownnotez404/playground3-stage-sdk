export type ProviderReasoningMode = "anthropic-thinking" | "openai-reasoning" | "gemini-thinking";
export interface ProviderReasoningSupport {
    supported: boolean;
    mode: ProviderReasoningMode | null;
}
export declare const resolveProviderReasoningSupport: (input: {
    provider: string;
    model: string;
}) => ProviderReasoningSupport;
export declare const DEFAULT_REASONING_BUDGET_TOKENS = 10000;
export declare const resolveInferenceReasoningOptions: (input: {
    provider: string;
    model: string;
    enabled: boolean;
    budgetTokens?: number;
}) => {
    enabled: true;
    mode: ProviderReasoningMode;
    budgetTokens: number;
} | undefined;
