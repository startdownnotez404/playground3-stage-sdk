export interface DeclarativeRulesMarkdownCodeBlock {
    language?: string;
    content: string;
}
export interface DeclarativeRulesMarkdownSection {
    heading: string;
    body: string;
    bullets: string[];
    paragraphs: string[];
    codeBlocks: DeclarativeRulesMarkdownCodeBlock[];
}
export interface DeclarativeRulesMarkdownDocument {
    rawMarkdown: string;
    title?: string;
    goal?: string;
    sections: DeclarativeRulesMarkdownSection[];
}
export declare const parseDeclarativeRulesMarkdown: (markdown?: string) => DeclarativeRulesMarkdownDocument | undefined;
export declare const findDeclarativeRulesMarkdownSection: (document: DeclarativeRulesMarkdownDocument | undefined, heading: string) => DeclarativeRulesMarkdownSection | undefined;
export declare const findDeclarativeRulesMarkdownCodeBlock: (document: DeclarativeRulesMarkdownDocument | undefined, heading: string, language?: string) => DeclarativeRulesMarkdownCodeBlock | undefined;
