#!/usr/bin/env node
/**
 * Optional local rebuild from a sibling platform checkout.
 * GitHub Releases are created by the monorepo Deploy Stage SDK Release
 * workflow, not by CI in this repository. The host writes dist/host-ui.js
 * when PLAYGROUND3_SDK_PACKAGE_ROOT points here.
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sdkRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const platformRoot = path.resolve(
  process.env.PLAYGROUND3_PLATFORM_ROOT?.trim() ||
    path.join(sdkRoot, "../web/dev/dev-playground-authorSDK")
);
const scriptPath = path.join(
  platformRoot,
  "scripts/buildPlayground3StageSdk.mjs"
);
const outFile = path.join(sdkRoot, "dist/index.js");

const child = spawn(process.execPath, [scriptPath, outFile], {
  cwd: platformRoot,
  stdio: "inherit",
  env: {
    ...process.env,
    PLAYGROUND3_SDK_PACKAGE_ROOT: sdkRoot,
  },
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
