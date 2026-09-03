export interface Playground3AttachedMcpServerConfig {
    id: string;
    name: string;
    transport: "streamable-http" | "sse";
    url: string;
    headers?: Record<string, string>;
    enabled: boolean;
}
export interface Playground3ExternalMcpClient {
    listTools(): Promise<unknown[]>;
    callTool(input: {
        name: string;
        args: Record<string, unknown>;
    }): Promise<unknown>;
}
export declare const createPlayground3ExternalMcpClient: (config: Playground3AttachedMcpServerConfig) => Playground3ExternalMcpClient;
