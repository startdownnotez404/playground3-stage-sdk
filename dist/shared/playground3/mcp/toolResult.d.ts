export interface Playground3ToolResult {
    success: boolean;
    message: string;
    data?: Record<string, unknown>;
    retryable?: boolean;
    failureKind?: string;
    /** Optional recovery hint shown as "Next:" in agent-facing text. */
    next?: string;
    /** Wall-clock ms for this tool/pseudo-tool execution (client-measured). */
    durationMs?: number;
}
export declare const isFailedPlayground3ToolResult: (result: unknown) => boolean;
export declare const formatPlayground3ToolResultForAgent: (toolName: string, result: unknown) => string;
export declare const playground3OkToolResult: (message: string, data?: Record<string, unknown>) => Playground3ToolResult;
export declare const playground3FailToolResult: (message: string, opts?: {
    retryable?: boolean;
    failureKind?: string;
    next?: string;
    data?: Record<string, unknown>;
}) => Playground3ToolResult;
/** Attach client wall-clock duration onto a tool result (preserves non-object results as-is). */
export declare const withPlayground3ToolDuration: (result: unknown, durationMs: number) => unknown;
export declare const readPlayground3ToolDurationMs: (result: unknown) => number | undefined;
