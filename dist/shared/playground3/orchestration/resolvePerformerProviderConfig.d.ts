import { type ProviderConfig } from "../../PROVIDER_CONFIGs";
import type { OrchestraGraphPerformer } from "../../orchestraGraphConfig";
import type { OrchestraGraphConfigV2 } from "../../orchestraGraph/v2/config";
/** Topology performer.model sentinel: resolve from the composer-selected chat model. */
export declare const PLAYGROUND3_SELECTED_MODEL_TOKEN = "$selected";
export declare const isPlayground3FakePerformer: (performer: {
    provider: string;
    model: string;
}) => boolean;
export declare const isPlayground3SelectedModelPerformer: (performer: {
    model: string;
}) => boolean;
export declare const resolvePlayground3Performer: (graphConfig: OrchestraGraphConfigV2, performerId?: string) => OrchestraGraphPerformer;
/** Resolve a CHAT_MODEL_CONFIGs option id into a full ProviderConfig. */
export declare const resolvePlayground3SelectedProviderConfig: (selectedModelId?: string | null) => ProviderConfig;
export declare const resolvePerformerProviderConfig: (performer: OrchestraGraphPerformer, options?: {
    selectedProviderConfig?: ProviderConfig;
}) => ProviderConfig;
