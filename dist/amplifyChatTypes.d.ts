import type { ProviderId } from "./shared/PROVIDER_CONFIGs";

/** Minimal chat types authors see; host Amplify owns the full module. */
export interface ChatMessage {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  toolCallId?: string;
  name?: string;
  isError?: boolean;
  toolCalls?: Array<{
    id?: string;
    name: string;
    args: Record<string, unknown>;
  }>;
}

export interface InferenceProviderSession {
  provider: ProviderId;
  model: string;
  baseUrl?: string;
  compatibilityFingerprint: string;
  nativeHandleJson?: string;
  providerMetadataJson?: string;
}
