/**
 * Author-facing Playground3 Stage SDK surface.
 * `tsc --declaration` from this file is copied into playground3-stage-sdk/dist.
 * Do not export StageBridgeProvider, Playground3StageAppHost, Amplify, or ChatDock.
 */
export { mountPlayground3StageApp, type MountPlayground3StageAppInput, type MountPlayground3StageAppResult, type EmbeddedPlayground3McpContent, } from "./mountPlayground3StageApp";
export { ThemeProvider, theme, createAppTheme } from "./theme";
export { createPlayground3StageTurnRunner, type CreatePlayground3StageTurnRunnerOptions, } from "./createPlayground3StageTurnRunner";
export { PLAYGROUND3_CONSTANTS, PLAYGROUND3_PSEUDO_TOOL_NAMES, buildGraphFromTopologyAndPrompts, composeSharedTopology, buildSharedTopologyGraphJson, promptsFromSharedAgents, assertThinSharedGraph, playground3OkToolResult, playground3FailToolResult, type Playground3Definition, type Playground3UiProps, type Playground3HostActions, type Playground3McpManifest, type Playground3McpTool, type Playground3ToolHandler, type Playground3ToolCaller, type Playground3CheckpointAdapter, type Playground3GraphPrompts, type Playground3AgentDefinition, type Playground3AgentProfile, type Playground3GraphNodeRunPlan, type Playground3RunTurnInput, type Playground3RunTurnResult, type Playground3GraphEntry, type Playground3MediaInputKind, type Playground3GraphCatalogEntry, type Playground3PlannedFragment, type ComposeSharedTopologyInput, type SharedTopologyGraph, type SharedTopologyNode, type SharedTopologyAgent, type SharedTopologyShared, streamPlayground3InferenceText, createPlayground3FakeInferenceAdapter, withEstimatedPlayground3InferenceTokens, type Playground3ChatMessage, type Playground3InferenceAdapter, type Playground3InferenceResult, type Playground3ToolResult, } from "./shared/playground3";
export { createWhiteboardCheckpointSlice, buildWhiteboardPromptView, buildWhiteboardMcpTools, createWhiteboardToolHandler, whiteboardHasSection, WHITEBOARD_TOOL_NAMES, buildWhiteboardCheckpointInjectionTemplate, diffWhiteboardText, type WhiteboardAccessRule, type WhiteboardRevision, type WhiteboardsState, } from "./shared/whiteboard";
export { parseOrchestraGraphConfigV2Json } from "./shared/orchestraGraphParser";
export type { OrchestraGraphGroup, OrchestraGraphResponseShape, } from "./shared/orchestraGraphConfig";
export { createOntologyToolHandler, createEmptyOntologyState, createOntologyCheckpointAdapter, buildOntologyPromptView, buildOntologyMcpTools, buildOntologyPlanesInjectionTemplate, ONTOLOGY_TOOL_NAMES, type OntologyState, } from "./shared/ontology";
export { pg3DebugLog, pg3DebugStateBoard, pg3DebugBoardSummary, } from "./shared/playground3/debug/playground3DebugLog";
export { FlowMap, BottomHandle, LeftHandle, RightHandle, TopHandle, type FlowTreeNode, type FlowMapEdge, type FlowMapNode, } from "./flowMap";
