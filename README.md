# @startdownnotez404/playground3-stage-sdk

Opaque Playground3 Stage SDK for author apps. Source lives on GitHub;
install the published tarball from a **public GitHub Release** (not npmjs,
and not a `github:` git dependency):

```bash
npm install https://github.com/startdownnotez404/playground3-stage-sdk/releases/download/v0.1.3/startdownnotez404-playground3-stage-sdk-0.1.3.tgz
```

The repo and release must be public so Author `npm i` can fetch the `.tgz`
without a token.

Mount, turn runner, and FlowMap come from the package root. Host ui-lib
widgets (`MuiModal`, `Markdown`, `Modal`) are a separate slim entry:

```ts
import { mountPlayground3StageApp, FlowMap } from "@startdownnotez404/playground3-stage-sdk";
import { MuiModal, Markdown } from "@startdownnotez404/playground3-stage-sdk/host-ui";
```

Do not import `MuiModal`, `Markdown`, or `Modal` from `"."`. Those names
may appear on the root TypeScript surface; the JavaScript values exist
only on `./host-ui`.

`/playground3/author` pins the Release URL inside WebContainer:

```json
"@startdownnotez404/playground3-stage-sdk": "https://github.com/startdownnotez404/playground3-stage-sdk/releases/download/v0.1.3/startdownnotez404-playground3-stage-sdk-0.1.3.tgz"
```

## What this package is

Author apps own UI, tools/checkpoint, and the LLM/MCP graph. This package
publishes:

- `dist/index.js` — opaque esbuild bundle (mount, turn runner, whiteboard,
  ontology, FlowMap) built from the host. This is `exports["."]` only.
- `dist/host-ui.js` — slim ui-lib widget chunk (`Markdown`, `Modal`,
  `MuiModal`). This is `exports["./host-ui"]` only.
- `dist/index.d.ts` / `dist/host-ui.d.ts` — author public API generated
  from the host `authorPublicApi.ts` barrel

The host ChatDock still owns the live agent loop and imports
`@/shared/playground3` locally. Do not import Amplify or platform executor
sources into an author app.

## Peer dependencies

Your app should already depend on React 18+, MUI 7, and Emotion. This bundle
treats those as externals.

## Build from the platform tree

Types and JS are generated from `web/dev/dev-playground-authorSDK`. This
package does not keep a second copy of `shared/` implementations.

This repo commits `dist/` so GitHub Release installs work without the
platform checkout. To rebuild:

```bash
npm run build
```

That shells out to `web/dev/dev-playground-authorSDK` plus `ui-lib/ui-dev`
(FlowMap is compiled from ui-dev source, not from the published ui-lib barrel).
The host build writes `dist/host-ui.js` (and `dist/host-ui.d.ts`) when
`PLAYGROUND3_SDK_PACKAGE_ROOT` points at this package. Widgets are not
authored in this repo; do not substitute a stub for the host widget chunk.

## Publish

GitHub Actions (`.github/workflows/publish.yml`) runs on `v*` tags and via
**Run workflow**. It `npm pack`s the package and creates a GitHub Release
for that tag, attaching the `.tgz` and `dist/host-ui.js`. The job fails if
`dist/host-ui.js` is missing so a tarball that cannot resolve `./host-ui`
is never shipped.

This workflow does not `npm publish`. There is no npmjs registry, token,
or Trusted Publisher setup.
