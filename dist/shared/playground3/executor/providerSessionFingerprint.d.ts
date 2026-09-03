import type { ProviderConfig } from "../../PROVIDER_CONFIGs";
/** Stable OpenAI-compatible prompt-cache fingerprint for a PG3 agent turn. */
export declare const buildPlayground3ProviderSessionFingerprint: (input: {
    agentId?: string;
    providerConfig: ProviderConfig;
    agentPersona?: string;
    appRulesMarkdown?: string;
    toolNames?: readonly string[];
    skillCatalogIds?: readonly string[];
    forceJsonResponse?: boolean;
    reasoningEnabled?: boolean;
    laneId?: string;
}) => Promise<string>;
