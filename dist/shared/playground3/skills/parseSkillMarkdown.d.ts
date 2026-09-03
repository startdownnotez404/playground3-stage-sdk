export interface Playground3SkillDefinition {
    id: string;
    name: string;
    description: string;
    body: string;
}
export declare const parsePlayground3SkillMarkdown: (skillId: string, markdown: string) => Playground3SkillDefinition;
