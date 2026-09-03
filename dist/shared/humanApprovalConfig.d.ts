export interface HumanApprovalConfig {
    required: boolean;
    title?: string;
    message?: string;
    acceptLabel?: string;
}
export declare const parseHumanApprovalConfig: (value: unknown, path: string) => HumanApprovalConfig | undefined;
