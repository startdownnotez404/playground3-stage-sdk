import type { ComponentType, CSSProperties, ReactNode } from "react";
import type { Edge, Node } from "@xyflow/react";
export interface FlowMapNodeData extends Record<string, unknown> {
    label?: string;
}
export type FlowMapNode = Node<FlowMapNodeData>;
export type FlowMapEdge = Edge;
export interface FlowTreeGroup {
    id: string;
    type?: string;
    data?: Record<string, unknown>;
    style?: FlowMapNode["style"];
}
export interface FlowTreeNode {
    id: string;
    type?: string;
    data?: Record<string, unknown>;
    style?: CSSProperties;
    children?: FlowTreeNode[];
    edgeLabel?: string;
    group?: string | FlowTreeGroup;
    connectTo?: string[];
}
export declare const FlowMap: ComponentType<{
    nodes?: FlowMapNode[];
    edges?: FlowMapEdge[];
    tree?: FlowTreeNode;
    children?: ReactNode;
    [key: string]: unknown;
}>;
export declare const BottomHandle: ComponentType<Record<string, unknown>>;
export declare const LeftHandle: ComponentType<Record<string, unknown>>;
export declare const RightHandle: ComponentType<Record<string, unknown>>;
export declare const TopHandle: ComponentType<Record<string, unknown>>;
