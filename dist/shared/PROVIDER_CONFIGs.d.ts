export declare const API_PROVIDERs: {
    readonly openai: "openai";
    readonly openaiCompatible: "openai-compatible";
    readonly anthropic: "anthropic";
    readonly gemini: "gemini";
};
export type ProviderId = (typeof API_PROVIDERs)[keyof typeof API_PROVIDERs];
export interface ProviderConfig {
    provider: ProviderId;
    model: string;
    baseUrl?: string;
    apiKeyEnvName?: string;
}
export declare const PROVIDER_DEFAULT_CONFIGS: {
    readonly openai: {
        readonly provider: "openai";
        readonly model: "gpt-4o-mini";
        readonly baseUrl: "https://api.openai.com/v1";
        readonly apiKeyEnvName: "OPENAI_API_KEY";
    };
    readonly "openai-compatible": {
        readonly provider: "openai-compatible";
        readonly model: "gpt-4o-mini";
        readonly baseUrl: "https://api.openai.com/v1";
        readonly apiKeyEnvName: "OPENAI_API_KEY";
    };
    readonly anthropic: {
        readonly provider: "anthropic";
        readonly model: "claude-3-7-sonnet-latest";
        readonly baseUrl: "https://api.anthropic.com/v1";
        readonly apiKeyEnvName: "ANTHROPIC_API_KEY";
    };
    readonly gemini: {
        readonly provider: "gemini";
        readonly model: "gemini-2.5-pro";
        readonly baseUrl: "https://generativelanguage.googleapis.com/v1beta";
        readonly apiKeyEnvName: "GOOGLE_AI_STUDIO_API_KEY";
    };
};
export declare const DEFAULT_PROVIDER_CONFIG: ProviderConfig;
