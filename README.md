# @startdownnotez404/playground3-stage-sdk

Opaque Playground3 Stage SDK for author apps. Source lives on GitHub;
install the published package from the public npmjs registry:

```bash
npm install @startdownnotez404/playground3-stage-sdk
```

```ts
import { mountPlayground3StageApp } from "@startdownnotez404/playground3-stage-sdk";
```

`/playground3/author` pins the same registry version inside WebContainer
(`"@startdownnotez404/playground3-stage-sdk": "0.1.2"`).

## What this package is

Author apps own UI, tools/checkpoint, and the LLM/MCP graph. This package
publishes:

- `dist/index.js` — opaque esbuild bundle (mount, turn runner, whiteboard,
  ontology, FlowMap) built from the host
- `dist/index.d.ts` — author public API generated from the host
  `authorPublicApi.ts` barrel

The host ChatDock still owns the live agent loop and imports
`@/shared/playground3` locally. Do not import Amplify or platform executor
sources into an author app.

## Peer dependencies

Your app should already depend on React 18+, MUI 7, and Emotion. This bundle
treats those as externals.

## Build from the platform tree

Types and JS are generated from `web/dev/dev-playground-authorSDK`. This
package does not keep a second copy of `shared/` implementations.

This repo commits `dist/` so npm and GitHub installs work without the platform
checkout. To rebuild:

```bash
npm run build
```

That shells out to `web/dev/dev-playground-authorSDK` plus `ui-lib/ui-dev`
(FlowMap is compiled from ui-dev source, not from the published ui-lib barrel).

## Publish

GitHub Actions (`.github/workflows/publish.yml`) publishes on `v*` tags and
via **Run workflow**. After the package exists on npmjs, add a Trusted
Publisher (GitHub Actions → `startdownnotez404/playground3-stage-sdk` →
`publish.yml` → allow `npm publish`). Later tags need no npm token.

The first version still needs one Bypass-2FA granular token as repo secret
`NPM_TOKEN`, or a local `npm publish --access public --otp=…`.
