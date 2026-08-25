import type { ComponentType, ReactNode } from "react";

export const PLAYGROUND3_CONSTANTS: {
  transitionKinds: Record<string, string>;
};
export const PLAYGROUND3_PSEUDO_TOOL_NAMES: Record<string, string>;

export function buildGraphFromTopologyAndPrompts(
  topologyJson: string,
  prompts: unknown
): string;
export function composeSharedTopology(input: unknown): Record<string, unknown>;
export function buildSharedTopologyGraphJson(input: unknown): string;
export function promptsFromSharedAgents(agents: unknown): unknown;
export function assertThinSharedGraph(graph: unknown): void;

export function playground3OkToolResult(
  data?: unknown,
  meta?: unknown
): unknown;
export function playground3FailToolResult(
  message: string,
  meta?: unknown
): unknown;

export function createPlayground3StageTurnRunner<TState>(options: {
  playgroundId: string;
  buildCheckpointState?: (state: TState) => unknown;
  buildFrontendStateJson?: (state: TState) => string;
}): (input: unknown) => Promise<unknown>;

export function mountPlayground3StageApp(input: {
  definition: unknown;
  embeddedMcp?: unknown;
  standalonePlaygroundId?: string;
  root?: HTMLElement | null;
  wrap?: (stage: ReactNode) => ReactNode;
  hostUiTheme?: boolean;
}): { unmount: () => void };

export const ThemeProvider: ComponentType<{
  children?: ReactNode;
  theme?: unknown;
  muiThemeOptions?: unknown;
  defaultMode?: "light" | "dark" | "system";
  storageManager?: null;
}>;
export const theme: unknown;
export function createAppTheme(options?: unknown): unknown;

export function pg3DebugLog(...args: unknown[]): void;
export function pg3DebugStateBoard(state: unknown): unknown;
export function pg3DebugBoardSummary(board: unknown): unknown;

export function createWhiteboardCheckpointSlice(input?: unknown): unknown;
export function buildWhiteboardPromptView(...args: unknown[]): unknown;
export function buildWhiteboardMcpTools(): unknown[];
export function createWhiteboardToolHandler<TState>(input: unknown): unknown;
export function whiteboardHasSection(...args: unknown[]): boolean;
export const WHITEBOARD_TOOL_NAMES: Record<string, string>;
export function buildWhiteboardCheckpointInjectionTemplate(
  input?: unknown
): string;
export function parseOrchestraGraphConfigV2Json(raw: string): unknown;

export function createOntologyToolHandler<TState>(input: unknown): unknown;
export function createEmptyOntologyState(): unknown;
export function createOntologyCheckpointAdapter(input?: unknown): unknown;
export function buildOntologyPromptView(...args: unknown[]): unknown;
export function buildOntologyMcpTools(): unknown[];
export function buildOntologyPlanesInjectionTemplate(input?: unknown): string;
export const ONTOLOGY_TOOL_NAMES: Record<string, string>;
export type OntologyState = Record<string, unknown>;
export function diffWhiteboardText(...args: unknown[]): unknown[];
export type WhiteboardRevision = Record<string, unknown>;
export type OrchestraGraphGroup = Record<string, unknown>;
export const FlowMap: ComponentType<any>;
export const BottomHandle: ComponentType<any>;
export const LeftHandle: ComponentType<any>;
export const RightHandle: ComponentType<any>;
export const TopHandle: ComponentType<any>;
export type FlowTreeNode = Record<string, unknown> & {
  children?: FlowTreeNode[];
};
export type FlowMapNode = Record<string, unknown>;
export type FlowMapEdge = Record<string, unknown>;

export function streamPlayground3InferenceText(...args: unknown[]): Promise<unknown>;
export function createPlayground3FakeInferenceAdapter(input?: unknown): unknown;
export function withEstimatedPlayground3InferenceTokens(
  result: unknown,
  messages?: unknown
): unknown;
export type Playground3ChatMessage = Record<string, unknown>;
export type Playground3InferenceAdapter = Record<string, unknown>;
export type Playground3InferenceResult = Record<string, unknown>;

export type Playground3Definition<TState = unknown> = {
  id: string;
  title: string;
  ui: ComponentType<any>;
  [key: string]: unknown;
};
export type Playground3UiProps<TState = unknown> = Record<string, unknown> & {
  state: TState;
};
export type Playground3McpManifest = Record<string, unknown>;
export type Playground3McpTool = Record<string, unknown>;
export type Playground3ToolHandler<TState = unknown> = (
  input: unknown
) => unknown;
export type Playground3ToolCaller = {
  nodeId?: string;
  agentId?: string;
  nodeRunId?: string;
};
export type Playground3CheckpointAdapter<TState = unknown> = {
  createInitial: () => TState;
  parse: (json: string, graphJson?: string) => TState;
  serialize: (state: TState) => string;
};
export type Playground3GraphPrompts = Record<string, unknown>;
export type Playground3AgentDefinition = Record<string, unknown>;
export type Playground3AgentProfile = Record<string, unknown>;
export type Playground3GraphNodeRunPlan = Record<string, unknown>;
export type EmbeddedPlayground3McpContent = Record<string, unknown>;
export type ComposeSharedTopologyInput = Record<string, unknown>;
export type SharedTopologyGraph = {
  name: string;
  description: string;
  modeType?: string;
  entryNodeId: string;
  edges: readonly unknown[];
  parallel?: readonly unknown[];
  groups?: readonly unknown[];
  groupEdges?: unknown;
};
export type SharedTopologyNode = Record<string, unknown>;
export type SharedTopologyAgent = Record<string, unknown>;
export type SharedTopologyShared = Record<string, unknown>;
export type WhiteboardAccessRule = { boardId: string; hasWrite?: boolean };
export type WhiteboardsState = Record<string, unknown>;
export type OrchestraGraphResponseShape = Record<string, unknown>;
