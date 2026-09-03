import type { ComponentType, ReactNode } from "react";
import type { Theme, ThemeOptions } from "@mui/material/styles";
export declare const ThemeProvider: ComponentType<{
    children?: ReactNode;
    theme?: Theme;
    muiThemeOptions?: ThemeOptions;
    defaultMode?: "light" | "dark" | "system";
    storageManager?: null;
}>;
export declare const theme: Theme;
export declare function createAppTheme(options?: ThemeOptions): Theme;
