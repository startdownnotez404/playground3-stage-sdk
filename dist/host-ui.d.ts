/**
 * Author-facing ui-lib widgets (Markdown, Modal, MuiModal).
 * Runtime values live only on `@startdownnotez404/playground3-stage-sdk/host-ui`
 * (`dist/host-ui.js`), written by the host build when
 * `PLAYGROUND3_SDK_PACKAGE_ROOT` points at this package. Do not import these
 * values from `"."` / `dist/index.js`.
 */
import type { ComponentType, ReactNode } from "react";
export declare const Markdown: ComponentType<{
    children?: ReactNode;
    [key: string]: unknown;
}>;
export declare const Modal: ComponentType<{
    children?: ReactNode;
    [key: string]: unknown;
}>;
export declare const MuiModal: ComponentType<{
    children?: ReactNode;
    [key: string]: unknown;
}>;
