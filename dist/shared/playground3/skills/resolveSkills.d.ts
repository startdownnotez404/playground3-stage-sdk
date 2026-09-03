import type { Playground3SkillDefinition } from "./parseSkillMarkdown";
import { PLAYGROUND3_PLATFORM_SKILL_IDS } from "./platformSkillRegistry";
export interface Playground3SkillReader {
    readSkill(skillId: string): Promise<string | undefined>;
}
export declare const resolvePlayground3SkillsAsync: (skillIds: string[], reader: Playground3SkillReader) => Promise<Playground3SkillDefinition[]>;
/**
 * Demote ATX headings so skill bodies nest under `## Preloaded skills`
 * (body `# Title` → `### Title`, `## Title` → `#### Title`, capped at ######).
 */
export declare const demotePlayground3SkillMarkdownHeadings: (markdown: string, extraHashes?: number) => string;
export declare const formatPlayground3SkillsForPrompt: (skills: Playground3SkillDefinition[]) => string;
/** Claude-style catalog: name + description only (no full body). */
export declare const formatPlayground3SkillCatalogForPrompt: (skills: Playground3SkillDefinition[]) => string;
export { PLAYGROUND3_PLATFORM_SKILL_IDS };
