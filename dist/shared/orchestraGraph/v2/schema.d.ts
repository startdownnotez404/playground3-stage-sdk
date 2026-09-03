/**
 * Orchestra graph v2 — zod structural schema for parsed configs.
 *
 * Mirrors shared/orchestraGraph/v1/schema.ts as the post-parse structural
 * assertion layer. v2 differences: keyed nodes record, wiring-only graph
 * with explicit entryNodeId, no legacy expansion/template/responseShape
 * fields, plus whiteboard registries and plannedFragmentId provenance.
 */
import { z, type ZodError } from "zod";
import type { OrchestraGraphConfigV2 } from "./config";
export declare const orchestraGraphV2Schema: z.ZodObject<{
    version: z.ZodLiteral<"2.0">;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    performers: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        provider: z.ZodString;
        model: z.ZodString;
        costTier: z.ZodOptional<z.ZodEnum<{
            low: "low";
            medium: "medium";
            high: "high";
        }>>;
        strengths: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>>;
    subagents: z.ZodRecord<z.ZodString, z.ZodObject<{
        description: z.ZodString;
        agentPersona: z.ZodString;
        performerId: z.ZodOptional<z.ZodString>;
        toolSet: z.ZodOptional<z.ZodString>;
        tools: z.ZodOptional<z.ZodArray<z.ZodString>>;
        responseSchema: z.ZodOptional<z.ZodString>;
        output: z.ZodOptional<z.ZodObject<{
            kind: z.ZodEnum<{
                json: "json";
                text: "text";
            }>;
            schema: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<{
                string: "string";
                number: "number";
                boolean: "boolean";
                object: "object";
            }>>>;
            displayTemplate: z.ZodOptional<z.ZodString>;
            historyTemplate: z.ZodOptional<z.ZodString>;
            lane: z.ZodOptional<z.ZodObject<{
                includeInCompaction: z.ZodOptional<z.ZodBoolean>;
                includeInParentDigest: z.ZodOptional<z.ZodBoolean>;
                appendHistoryItem: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        reasoning: z.ZodOptional<z.ZodBoolean>;
        lane: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
            laneId: z.ZodString;
        }, z.core.$strict>]>, z.ZodTransform<string, string | {
            laneId: string;
        }>>>;
    }, z.core.$strict>>;
    nodes: z.ZodRecord<z.ZodString, z.ZodObject<{
        id: z.ZodString;
        agent: z.ZodString;
        nodeType: z.ZodOptional<z.ZodEnum<{
            harness: "harness";
            plan: "plan";
            execute: "execute";
            verify: "verify";
            retry: "retry";
            thinking: "thinking";
            tool: "tool";
            query: "query";
            update: "update";
            create: "create";
            delete: "delete";
            result: "result";
            intermission: "intermission";
        }>>;
        outputSchema: z.ZodOptional<z.ZodString>;
        inheritSessionContext: z.ZodOptional<z.ZodBoolean>;
        inheritHistory: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
            kind: z.ZodOptional<z.ZodEnum<{
                agent: "agent";
                "global-context": "global-context";
                node: "node";
            }>>;
            nodeId: z.ZodOptional<z.ZodString>;
            agentId: z.ZodOptional<z.ZodString>;
            agentID: z.ZodOptional<z.ZodString>;
            laneId: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>]>>>;
        outcomes: z.ZodArray<z.ZodString>;
        parallel: z.ZodOptional<z.ZodBoolean>;
        toolCallPolicy: z.ZodOptional<z.ZodObject<{
            forceToolCall: z.ZodOptional<z.ZodBoolean>;
            forceToolNames: z.ZodOptional<z.ZodArray<z.ZodString>>;
            toolWeights: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            agentDecidesAfterTool: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>>;
        promptInjections: z.ZodOptional<z.ZodArray<z.ZodObject<{
            role: z.ZodString;
            template: z.ZodString;
        }, z.core.$strict>>>;
        approval: z.ZodOptional<z.ZodObject<{
            prompt: z.ZodString;
            expectedInputType: z.ZodOptional<z.ZodString>;
            formConfig: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.core.$strict>>;
        retrieval: z.ZodOptional<z.ZodObject<{
            sourceIds: z.ZodArray<z.ZodString>;
            maxResults: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strict>>;
        subagentTopologies: z.ZodOptional<z.ZodArray<z.ZodObject<{
            topology: z.ZodString;
            agentIds: z.ZodArray<z.ZodString>;
            objective: z.ZodString;
            promptSection: z.ZodOptional<z.ZodString>;
            executionOrder: z.ZodOptional<z.ZodEnum<{
                sequential: "sequential";
                allParallel: "allParallel";
            }>>;
            inheritHistory: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
                kind: z.ZodOptional<z.ZodEnum<{
                    agent: "agent";
                    "global-context": "global-context";
                    node: "node";
                }>>;
                nodeId: z.ZodOptional<z.ZodString>;
                agentId: z.ZodOptional<z.ZodString>;
                agentID: z.ZodOptional<z.ZodString>;
                laneId: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>]>>>;
            inheritHostWorking: z.ZodOptional<z.ZodEnum<{
                full: "full";
                none: "none";
                lastExchange: "lastExchange";
            }>>;
            inheritAgentMemory: z.ZodOptional<z.ZodBoolean>;
            roomId: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>>;
        autonomous: z.ZodOptional<z.ZodBoolean>;
        loopPolicy: z.ZodOptional<z.ZodObject<{
            maxSteps: z.ZodOptional<z.ZodNumber>;
            maxToolCallsPerStep: z.ZodOptional<z.ZodNumber>;
            maxPeerCalls: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strict>>;
        task: z.ZodOptional<z.ZodObject<{
            goal: z.ZodString;
            rules: z.ZodOptional<z.ZodArray<z.ZodString>>;
            skills: z.ZodOptional<z.ZodArray<z.ZodString>>;
            preloadSkills: z.ZodOptional<z.ZodArray<z.ZodString>>;
            tools: z.ZodOptional<z.ZodArray<z.ZodString>>;
            successCriteria: z.ZodOptional<z.ZodArray<z.ZodObject<{
                type: z.ZodLiteral<"toolResult">;
                toolName: z.ZodOptional<z.ZodString>;
                match: z.ZodUnion<readonly [z.ZodEnum<{
                    success: "success";
                    retryableFailure: "retryableFailure";
                }>, z.ZodRecord<z.ZodString, z.ZodUnknown>]>;
            }, z.core.$strict>>>;
            retryOn: z.ZodOptional<z.ZodArray<z.ZodObject<{
                type: z.ZodLiteral<"toolResult">;
                toolName: z.ZodOptional<z.ZodString>;
                match: z.ZodUnion<readonly [z.ZodEnum<{
                    success: "success";
                    retryableFailure: "retryableFailure";
                }>, z.ZodRecord<z.ZodString, z.ZodUnknown>]>;
                maxAttempts: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strict>>>;
            output: z.ZodOptional<z.ZodObject<{
                routeConditionKey: z.ZodOptional<z.ZodString>;
                routeReason: z.ZodOptional<z.ZodString>;
                responseText: z.ZodOptional<z.ZodString>;
                broadcastLane: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
        }, z.core.$strict>>;
        lane: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
            laneId: z.ZodString;
        }, z.core.$strict>]>, z.ZodTransform<string, string | {
            laneId: string;
        }>>>;
        moduleHostId: z.ZodOptional<z.ZodString>;
        moduleTopologyId: z.ZodOptional<z.ZodString>;
        plannedFragmentId: z.ZodOptional<z.ZodString>;
        whiteboardAccess: z.ZodOptional<z.ZodArray<z.ZodObject<{
            boardId: z.ZodString;
            hasWrite: z.ZodBoolean;
        }, z.core.$strict>>>;
    }, z.core.$strict>>;
    graph: z.ZodObject<{
        entryNodeId: z.ZodString;
        edges: z.ZodArray<z.ZodObject<{
            from: z.ZodString;
            to: z.ZodString;
            routeCondition: z.ZodOptional<z.ZodString>;
            outcome: z.ZodOptional<z.ZodString>;
            conditionPrompt: z.ZodOptional<z.ZodString>;
            maxIterations: z.ZodOptional<z.ZodNumber>;
            kind: z.ZodOptional<z.ZodEnum<{
                graph: "graph";
                module: "module";
            }>>;
        }, z.core.$strict>>;
        parallel: z.ZodArray<z.ZodObject<{
            nodeIds: z.ZodArray<z.ZodString>;
        }, z.core.$strict>>;
        groups: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodOptional<z.ZodString>;
            objective: z.ZodOptional<z.ZodString>;
            nodeIds: z.ZodArray<z.ZodString>;
            exitNodeId: z.ZodString;
            outputSchema: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<{
                string: "string";
                number: "number";
                boolean: "boolean";
                object: "object";
            }>>>;
            lane: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
                laneId: z.ZodString;
            }, z.core.$strict>]>, z.ZodTransform<string, string | {
                laneId: string;
            }>>>;
        }, z.core.$strict>>>;
        groupEdges: z.ZodOptional<z.ZodArray<z.ZodObject<{
            from: z.ZodString;
            to: z.ZodString;
            routeCondition: z.ZodOptional<z.ZodString>;
            outcome: z.ZodOptional<z.ZodString>;
            conditionPrompt: z.ZodOptional<z.ZodString>;
            maxIterations: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strict>>>;
    }, z.core.$strict>;
    initialState: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    actions: z.ZodArray<z.ZodObject<{
        actionType: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        payloadSchema: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<{
            string: "string";
            number: "number";
            boolean: "boolean";
            object: "object";
        }>>>;
        inputJsonSchema: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        promptHint: z.ZodOptional<z.ZodString>;
        humanApproval: z.ZodOptional<z.ZodObject<{
            required: z.ZodBoolean;
            title: z.ZodOptional<z.ZodString>;
            message: z.ZodOptional<z.ZodString>;
            acceptLabel: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    retrievalSources: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        kind: z.ZodEnum<{
            sessionHistory: "sessionHistory";
        }>;
        description: z.ZodOptional<z.ZodString>;
        maxResults: z.ZodOptional<z.ZodNumber>;
        roleFilter: z.ZodOptional<z.ZodArray<z.ZodString>>;
        itemTypes: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strict>>>;
    runtimeToolDefinitions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        paramSchema: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<{
            string: "string";
            number: "number";
            boolean: "boolean";
            object: "object";
        }>>>;
        humanApproval: z.ZodOptional<z.ZodObject<{
            required: z.ZodBoolean;
            title: z.ZodOptional<z.ZodString>;
            message: z.ZodOptional<z.ZodString>;
            acceptLabel: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
    }, z.core.$strict>>>;
    toolSets: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>>;
    skillSets: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>>;
    responseSchemas: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        kind: z.ZodEnum<{
            json: "json";
            text: "text";
        }>;
        schema: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodEnum<{
            string: "string";
            number: "number";
            boolean: "boolean";
            object: "object";
        }>>>;
        displayTemplate: z.ZodOptional<z.ZodString>;
        historyTemplate: z.ZodOptional<z.ZodString>;
        lane: z.ZodOptional<z.ZodObject<{
            includeInCompaction: z.ZodOptional<z.ZodBoolean>;
            includeInParentDigest: z.ZodOptional<z.ZodBoolean>;
            appendHistoryItem: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>>;
    }, z.core.$strict>>>;
    memory: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        readHot: z.ZodBoolean;
        readCold: z.ZodBoolean;
        writeHot: z.ZodBoolean;
        writeCold: z.ZodBoolean;
    }, z.core.$strict>>>;
    options: z.ZodOptional<z.ZodObject<{
        maxTurns: z.ZodOptional<z.ZodNumber>;
        turnTimeout: z.ZodOptional<z.ZodNumber>;
        defaultOutcome: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>;
    workflow: z.ZodOptional<z.ZodObject<{
        profile: z.ZodOptional<z.ZodEnum<{
            strict: "strict";
            dynamic: "dynamic";
            hybrid: "hybrid";
        }>>;
        macro: z.ZodOptional<z.ZodObject<{
            unit: z.ZodOptional<z.ZodString>;
            advanceBy: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        limits: z.ZodOptional<z.ZodObject<{
            maxPlannedNodesPerTurn: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strict>>;
    }, z.core.$strict>>;
    lanes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        scope: z.ZodObject<{
            kind: z.ZodEnum<{
                session: "session";
                nodeGraph: "nodeGraph";
                nodeGraphs: "nodeGraphs";
            }>;
            nodeGraphIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strict>;
        compactWhenTailTokensExceed: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>>>;
    whiteboards: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        label: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        initialContent: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>>;
}, z.core.$strict>;
export declare const formatOrchestraGraphV2ValidationError: (error: ZodError) => string;
export declare const safeValidateOrchestraGraphV2Config: (value: unknown) => z.ZodSafeParseResult<{
    version: "2.0";
    name: string;
    performers: {
        id: string;
        provider: string;
        model: string;
        costTier?: "low" | "medium" | "high" | undefined;
        strengths?: string[] | undefined;
    }[];
    subagents: Record<string, {
        description: string;
        agentPersona: string;
        performerId?: string | undefined;
        toolSet?: string | undefined;
        tools?: string[] | undefined;
        responseSchema?: string | undefined;
        output?: {
            kind: "json" | "text";
            schema?: Record<string, "string" | "number" | "boolean" | "object"> | undefined;
            displayTemplate?: string | undefined;
            historyTemplate?: string | undefined;
            lane?: {
                includeInCompaction?: boolean | undefined;
                includeInParentDigest?: boolean | undefined;
                appendHistoryItem?: boolean | undefined;
            } | undefined;
        } | undefined;
        reasoning?: boolean | undefined;
        lane?: string | undefined;
    }>;
    nodes: Record<string, {
        id: string;
        agent: string;
        outcomes: string[];
        nodeType?: "harness" | "plan" | "execute" | "verify" | "retry" | "thinking" | "tool" | "query" | "update" | "create" | "delete" | "result" | "intermission" | undefined;
        outputSchema?: string | undefined;
        inheritSessionContext?: boolean | undefined;
        inheritHistory?: (string | {
            kind?: "agent" | "global-context" | "node" | undefined;
            nodeId?: string | undefined;
            agentId?: string | undefined;
            agentID?: string | undefined;
            laneId?: string | undefined;
        })[] | undefined;
        parallel?: boolean | undefined;
        toolCallPolicy?: {
            forceToolCall?: boolean | undefined;
            forceToolNames?: string[] | undefined;
            toolWeights?: Record<string, number> | undefined;
            agentDecidesAfterTool?: boolean | undefined;
        } | undefined;
        promptInjections?: {
            role: string;
            template: string;
        }[] | undefined;
        approval?: {
            prompt: string;
            expectedInputType?: string | undefined;
            formConfig?: Record<string, unknown> | undefined;
        } | undefined;
        retrieval?: {
            sourceIds: string[];
            maxResults?: number | undefined;
        } | undefined;
        subagentTopologies?: {
            topology: string;
            agentIds: string[];
            objective: string;
            promptSection?: string | undefined;
            executionOrder?: "sequential" | "allParallel" | undefined;
            inheritHistory?: (string | {
                kind?: "agent" | "global-context" | "node" | undefined;
                nodeId?: string | undefined;
                agentId?: string | undefined;
                agentID?: string | undefined;
                laneId?: string | undefined;
            })[] | undefined;
            inheritHostWorking?: "full" | "none" | "lastExchange" | undefined;
            inheritAgentMemory?: boolean | undefined;
            roomId?: string | undefined;
        }[] | undefined;
        autonomous?: boolean | undefined;
        loopPolicy?: {
            maxSteps?: number | undefined;
            maxToolCallsPerStep?: number | undefined;
            maxPeerCalls?: number | undefined;
        } | undefined;
        task?: {
            goal: string;
            rules?: string[] | undefined;
            skills?: string[] | undefined;
            preloadSkills?: string[] | undefined;
            tools?: string[] | undefined;
            successCriteria?: {
                type: "toolResult";
                match: Record<string, unknown> | "success" | "retryableFailure";
                toolName?: string | undefined;
            }[] | undefined;
            retryOn?: {
                type: "toolResult";
                match: Record<string, unknown> | "success" | "retryableFailure";
                toolName?: string | undefined;
                maxAttempts?: number | undefined;
            }[] | undefined;
            output?: {
                routeConditionKey?: string | undefined;
                routeReason?: string | undefined;
                responseText?: string | undefined;
                broadcastLane?: string | undefined;
            } | undefined;
        } | undefined;
        lane?: string | undefined;
        moduleHostId?: string | undefined;
        moduleTopologyId?: string | undefined;
        plannedFragmentId?: string | undefined;
        whiteboardAccess?: {
            boardId: string;
            hasWrite: boolean;
        }[] | undefined;
    }>;
    graph: {
        entryNodeId: string;
        edges: {
            from: string;
            to: string;
            routeCondition?: string | undefined;
            outcome?: string | undefined;
            conditionPrompt?: string | undefined;
            maxIterations?: number | undefined;
            kind?: "graph" | "module" | undefined;
        }[];
        parallel: {
            nodeIds: string[];
        }[];
        groups?: {
            id: string;
            nodeIds: string[];
            exitNodeId: string;
            label?: string | undefined;
            objective?: string | undefined;
            outputSchema?: Record<string, "string" | "number" | "boolean" | "object"> | undefined;
            lane?: string | undefined;
        }[] | undefined;
        groupEdges?: {
            from: string;
            to: string;
            routeCondition?: string | undefined;
            outcome?: string | undefined;
            conditionPrompt?: string | undefined;
            maxIterations?: number | undefined;
        }[] | undefined;
    };
    initialState: Record<string, unknown>;
    actions: {
        actionType: string;
        description?: string | undefined;
        payloadSchema?: Record<string, "string" | "number" | "boolean" | "object"> | undefined;
        inputJsonSchema?: Record<string, unknown> | undefined;
        parameters?: Record<string, unknown> | undefined;
        promptHint?: string | undefined;
        humanApproval?: {
            required: boolean;
            title?: string | undefined;
            message?: string | undefined;
            acceptLabel?: string | undefined;
        } | undefined;
    }[];
    description?: string | undefined;
    retrievalSources?: {
        id: string;
        kind: "sessionHistory";
        description?: string | undefined;
        maxResults?: number | undefined;
        roleFilter?: string[] | undefined;
        itemTypes?: string[] | undefined;
    }[] | undefined;
    runtimeToolDefinitions?: {
        name: string;
        description?: string | undefined;
        paramSchema?: Record<string, "string" | "number" | "boolean" | "object"> | undefined;
        humanApproval?: {
            required: boolean;
            title?: string | undefined;
            message?: string | undefined;
            acceptLabel?: string | undefined;
        } | undefined;
    }[] | undefined;
    toolSets?: Record<string, string[]> | undefined;
    skillSets?: Record<string, string[]> | undefined;
    responseSchemas?: Record<string, {
        kind: "json" | "text";
        schema?: Record<string, "string" | "number" | "boolean" | "object"> | undefined;
        displayTemplate?: string | undefined;
        historyTemplate?: string | undefined;
        lane?: {
            includeInCompaction?: boolean | undefined;
            includeInParentDigest?: boolean | undefined;
            appendHistoryItem?: boolean | undefined;
        } | undefined;
    }> | undefined;
    memory?: Record<string, {
        readHot: boolean;
        readCold: boolean;
        writeHot: boolean;
        writeCold: boolean;
    }> | undefined;
    options?: {
        maxTurns?: number | undefined;
        turnTimeout?: number | undefined;
        defaultOutcome?: string | undefined;
    } | undefined;
    workflow?: {
        profile?: "strict" | "dynamic" | "hybrid" | undefined;
        macro?: {
            unit?: string | undefined;
            advanceBy?: string | undefined;
        } | undefined;
        limits?: {
            maxPlannedNodesPerTurn?: number | undefined;
        } | undefined;
    } | undefined;
    lanes?: Record<string, {
        scope: {
            kind: "session" | "nodeGraph" | "nodeGraphs";
            nodeGraphIds?: string[] | undefined;
        };
        label?: string | undefined;
        compactWhenTailTokensExceed?: number | undefined;
    }> | undefined;
    whiteboards?: Record<string, {
        label?: string | undefined;
        description?: string | undefined;
        initialContent?: string | undefined;
    }> | undefined;
}>;
export declare const validateOrchestraGraphV2Config: (value: unknown) => OrchestraGraphConfigV2;
