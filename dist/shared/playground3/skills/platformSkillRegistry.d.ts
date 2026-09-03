/** Platform (A) skill metadata — bodies live in skills/<id>/SKILL.md on disk. */
export declare const PLAYGROUND3_PLATFORM_SKILL_REFS: readonly [{
    readonly id: "spawn-subagent";
    readonly description: "Spawn a registered subagent for a focused subtask via playground3.spawnSubagent.";
    readonly scope: "platform";
}, {
    readonly id: "ask-human";
    readonly description: "Ask the human a clarifying question via playground3.askHuman.";
    readonly scope: "platform";
}, {
    readonly id: "mcp-tool-commit";
    readonly description: "Commit a planned action through an MCP tool call on the frontend route host.";
    readonly scope: "platform";
}, {
    readonly id: "retryable-tool-failure";
    readonly description: "Handle retryable MCP tool failures without duplicate commits.";
    readonly scope: "platform";
}];
export type Playground3PlatformSkillId = (typeof PLAYGROUND3_PLATFORM_SKILL_REFS)[number]["id"];
export declare const PLAYGROUND3_PLATFORM_SKILL_IDS: readonly Playground3PlatformSkillId[];
export declare const isPlayground3PlatformSkillId: (skillId: string) => skillId is Playground3PlatformSkillId;
/** Sync catalog blurb for a known platform skill id (no disk read). */
export declare const resolvePlayground3PlatformSkillDescription: (skillId: string) => string | undefined;
