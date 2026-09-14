# @startdownnotez404/playground3-stage-sdk

Opaque Playground3 Stage SDK for author apps. Source lives on GitHub.
Install the Release tarball (this repo is not published to npmjs):

```bash
npm install https://github.com/startdownnotez404/playground3-stage-sdk/releases/download/v0.1.6/startdownnotez404-playground3-stage-sdk-0.1.6.tgz
```

Pin style:

```json
"@startdownnotez404/playground3-stage-sdk": "https://github.com/startdownnotez404/playground3-stage-sdk/releases/download/v0.1.6/startdownnotez404-playground3-stage-sdk-0.1.6.tgz"
```

That URL is a public GitHub Release asset. It is not a `github:` git dependency and does not need a token.

Mount, turn runner, and FlowMap come from the package root. Host ui-lib
widgets (`MuiModal`, `Markdown`, `Modal`) are a separate slim entry:

```ts
import { mountPlayground3StageApp, FlowMap } from "@startdownnotez404/playground3-stage-sdk";
import { MuiModal, Markdown } from "@startdownnotez404/playground3-stage-sdk/host-ui";
```

Do not import `MuiModal`, `Markdown`, or `Modal` from `"."`. Those names
may appear on the root TypeScript surface; the JavaScript values exist
only on `./host-ui`.

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

## How the JS is compiled

This repo does not author `dist/index.js` or `dist/host-ui.js`. Those files
are compiled by private `startdownnotez404/monorepo`
(`npm run build:stage-sdk` / `apps/web/scripts/buildPlayground3StageSdk.mjs`)
when `PLAYGROUND3_SDK_PACKAGE_ROOT` points at this package.

Optional local rebuild if you already have a sibling platform tree:

```bash
npm run build
```

That wrapper (`scripts/build.mjs`) is for a laptop checkout only.

## Releases

This repository has no publish CI and does not check out the private
monorepo. Auto-deploy belongs on `startdownnotez404/monorepo`: bumping
`packages/stage-sdk` there runs **Deploy Stage SDK Release**, which builds
with `STAGE_SDK_RELEASE_TOKEN` (write to this public repo) and uploads the
GitHub Release tarball here.

Do not tag this repo to trigger a build. Do not add `MONOREPO_READ_TOKEN`
or any other monorepo-checkout secret here. This package is not published
to npmjs.
