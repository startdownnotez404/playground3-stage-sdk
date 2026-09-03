export declare const CHAT_MODEL_BRANDS: {
    readonly anthropic: "anthropic";
    readonly google: "google";
    readonly meta: "meta";
    readonly openai: "openai";
};
export type ChatModelBrand = (typeof CHAT_MODEL_BRANDS)[keyof typeof CHAT_MODEL_BRANDS];
export type ChatModelModality = "text" | "image" | "video" | "audio";
export declare const CHAT_MODEL_CONFIGs: {
    readonly defaultModelId: "gpt-4-1-mini";
    readonly options: readonly [{
        readonly id: "gpt-4-1-mini";
        readonly label: "GPT 4.1 Mini";
        readonly detail: "OpenAI";
        readonly brand: "openai";
        readonly modalities: readonly ["text"];
        readonly providerConfig: {
            readonly provider: "openai";
            readonly model: "gpt-4.1-mini";
        };
    }, {
        readonly id: "gpt-5-mini";
        readonly label: "GPT 5 Mini";
        readonly detail: "OpenAI";
        readonly brand: "openai";
        readonly modalities: readonly ["text"];
        readonly providerConfig: {
            readonly provider: "openai";
            readonly model: "gpt-5-mini";
        };
    }];
};
export declare const resolveChatModelModalities: (modelId: string | undefined) => ChatModelModality[];
export declare const DEFAULT_CHAT_MODEL_OPTION: {
    readonly id: "gpt-4-1-mini";
    readonly label: "GPT 4.1 Mini";
    readonly detail: "OpenAI";
    readonly brand: "openai";
    readonly modalities: readonly ["text"];
    readonly providerConfig: {
        readonly provider: "openai";
        readonly model: "gpt-4.1-mini";
    };
};
export declare const DEFAULT_CHAT_MODEL_PROVIDER_CONFIG: {
    readonly provider: "openai";
    readonly model: "gpt-4.1-mini";
};
