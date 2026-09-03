import type { ReactNode } from "react";
import type { Root } from "react-dom/client";
import type { Playground3Definition } from "./shared/playground3/playgroundDefinition";
export interface EmbeddedPlayground3McpContent {
    skills: Record<string, string>;
    appRules: string | null;
}
export interface MountPlayground3StageAppInput<TState> {
    definition: Playground3Definition<TState>;
    embeddedMcp?: EmbeddedPlayground3McpContent;
    standalonePlaygroundId?: string;
    root?: HTMLElement | null;
    wrap?: (stage: ReactNode) => ReactNode;
    hostUiTheme?: boolean;
}
export interface MountPlayground3StageAppResult {
    root: Root;
    unmount: () => void;
}
/**
 * Implemented by the opaque esbuild bundle. This declaration is the public type.
 */
export declare function mountPlayground3StageApp<TState>(input: MountPlayground3StageAppInput<TState>): MountPlayground3StageAppResult;
