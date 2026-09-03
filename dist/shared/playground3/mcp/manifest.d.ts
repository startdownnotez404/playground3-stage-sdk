import type { HumanApprovalConfig } from "../../humanApprovalConfig";
export interface Playground3McpTool {
    name: string;
    description?: string;
    inputSchema: Record<string, unknown>;
    resultSchema?: Record<string, unknown>;
    humanApproval?: HumanApprovalConfig;
    promptHint?: string;
}
export interface Playground3McpSkillRef {
    id: string;
    description?: string;
    scope: "platform" | "app";
}
export interface Playground3McpManifest {
    version: 1;
    routeId: string;
    tools: Playground3McpTool[];
    skills?: Playground3McpSkillRef[];
}
export interface Playground3ResolvedToolSpec {
    name: string;
    description?: string;
    inputJsonSchema?: Record<string, unknown>;
    humanApproval?: HumanApprovalConfig;
    expectedInputType: "frontendAction" | "frontendActionApproval";
    toolSystemPrompt?: string;
}
export declare const normalizePlayground3McpManifest: (value: unknown) => Playground3McpManifest;
export declare const parsePlayground3McpManifestJson: (value: string | Record<string, unknown>) => Playground3McpManifest;
export declare const mcpToolToPlayground3ResolvedToolSpec: (tool: Playground3McpTool) => Playground3ResolvedToolSpec;
/**
 * Tool config shape sent to the model (`inference.run({ tools })`).
 * Subset of {@link Playground3McpTool} — no resultSchema / humanApproval / promptHint.
 */
export type Playground3McpToolConfig = {
    name: string;
    description?: string;
    inputSchema: Record<string, unknown>;
};
/** Map an MCP tool record to the provider/AI tool config. */
export declare const playground3McpToolToToolConfig: (tool: Playground3McpTool) => Playground3McpToolConfig;
/**
 * Look up a tool by name on an MCP manifest and return the real to-AI tool config.
 * `(mcp, toolName) → toolConfig | null`
 */
export declare const getPlayground3McpToolConfig: (mcp: Playground3McpManifest, toolName: string) => Playground3McpToolConfig | null;
/**
 * Resolve to-AI tool configs for an allowlist (order preserved).
 * Unknown names are omitted — callers may stub.
 */
export declare const getPlayground3McpToolConfigs: (mcp: Playground3McpManifest, toolNames: readonly string[]) => Playground3McpToolConfig[];
export declare const resolvePlayground3McpToolSpec: (input: {
    manifest: Playground3McpManifest;
    toolName: string;
}) => Playground3ResolvedToolSpec;
