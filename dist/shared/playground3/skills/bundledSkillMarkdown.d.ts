/**
 * Bundled SKILL.md bodies for construction-viewer token estimates.
 * Keep in sync with on-disk SKILL.md (platform + playground-examples).
 * Runtime still loads via MCP readSkill; this mirror is browser-safe.
 */
/** App skill first, then platform — same order as /api/playground3/skills. */
export declare const resolveBundledPlayground3SkillMarkdown: (playgroundId: string | undefined, skillId: string) => string | undefined;
