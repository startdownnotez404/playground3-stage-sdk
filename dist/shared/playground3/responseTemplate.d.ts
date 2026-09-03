export interface Playground3ResponseTemplatePath {
    normalizedPath: string;
    segments: string[];
}
export declare const extractPlayground3ResponseTemplatePaths: (template: string, label?: string) => Playground3ResponseTemplatePath[];
export declare const validatePlayground3ResponseTemplate: (template: string, label?: string) => void;
export declare const resolvePlayground3ResponseTemplatePathValue: (responseValue: unknown, pathValue: string, label?: string) => unknown;
export declare const serializePlayground3ResponseTemplateValue: (value: unknown) => string;
export declare const renderPlayground3ResponseTemplate: (template: string, responseValue: unknown) => string;
export declare const resolvePlayground3ResponseDisplayText: (input: {
    responseValue: unknown;
    displayTemplate?: string;
}) => string | undefined;
/**
 * Public chronicle text for a completed node: rendered `historyTemplate`, else
 * `speech` then `narration`. Skips empty text and does not dump raw JSON,
 * `routeConditionKey`, or `reasoning`.
 */
export declare const resolvePlayground3BroadcastLaneText: (input: {
    responseValue: unknown;
    historyTemplate?: string;
}) => string | undefined;
export declare const resolvePlayground3ResponseHistoryText: (input: {
    responseValue: unknown;
    historyTemplate?: string;
    displayTemplate?: string;
}) => string | undefined;
