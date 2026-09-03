export interface Playground3PromptInjectionPath {
    normalizedPath: string;
    segments: string[];
}
export declare const extractPlayground3PromptInjectionPaths: (template: string, label?: string) => Playground3PromptInjectionPath[];
export declare const validatePlayground3PromptInjectionTemplate: (template: string, label?: string) => void;
export declare const resolvePlayground3PromptInjectionPathValue: (checkpointState: unknown, pathValue: string, label?: string, expansionContext?: unknown) => unknown;
export declare const resolvePlayground3PromptInjectionTemplateValues: (checkpointState: unknown, template: string, expansionContext?: unknown) => Array<{
    path: string;
    value: unknown;
}>;
export declare const serializePlayground3PromptInjectionValue: (value: unknown) => string;
export declare const renderPlayground3PromptInjectionTemplate: (template: string, checkpointState: unknown, expansionContext?: unknown) => string;
