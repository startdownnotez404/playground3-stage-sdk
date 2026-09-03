export type Playground3ArtifactStorage = "inline" | "s3";
export type Playground3ArtifactContentType = "json" | "text";
export interface Playground3ArtifactRef {
    storage: Playground3ArtifactStorage;
    contentType: Playground3ArtifactContentType;
    sha256: string;
    byteLength: number;
    valueJson?: string;
    valueText?: string;
    s3Key?: string;
}
export interface Playground3ArtifactWriter {
    writeJson(value: unknown): Promise<Playground3ArtifactRef>;
    writeText(value: string): Promise<Playground3ArtifactRef>;
}
export declare const createInlinePlayground3ArtifactWriter: (input?: {
    maxInlineBytes?: number;
}) => Playground3ArtifactWriter;
