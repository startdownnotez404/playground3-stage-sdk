# @startdownnotez404/playground3-stage-sdk

Opaque Playground3 Stage SDK for author apps. Install from the public GitHub
repo (no npmjs org, no GitHub Packages token):

```bash
npm install github:startdownnotez404/playground3-stage-sdk
```

```ts
import { mountPlayground3StageApp } from "@startdownnotez404/playground3-stage-sdk";
```

`/playground3/author` installs a **pinned tag tarball** inside WebContainer:

```json
"@startdownnotez404/playground3-stage-sdk": "https://github.com/startdownnotez404/playground3-stage-sdk/archive/refs/tags/v0.1.0.tar.gz"
```

## What this package is

Author apps own UI, tools/checkpoint, and the LLM/MCP graph. This package
mounts the iframe app, StageBridge provider, optional in-process turn runner,
whiteboard/ontology toolkits, and a FlowMap subset.

The host ChatDock still owns the live agent loop. Do not import Amplify or
platform executor sources into an author app.

## Peer dependencies

Your app should already depend on React 18+, MUI 7, and Emotion. This bundle
treats those as externals.

## Build from the platform tree

This repo commits `dist/` so GitHub installs work without the platform
checkout. To rebuild:

```bash
npm run build
```

That shells out to `web/dev/dev-playground-authorSDK` plus `ui-lib/ui-dev`
(FlowMap is compiled from ui-dev source, not from the published ui-lib barrel).
