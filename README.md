# @startdownnotez404/playground3-stage-sdk

Opaque Playground3 Stage SDK for author apps. Source lives on GitHub.
Install the Release tarball (this repo is not published to npmjs):

```bash
npm install https://github.com/startdownnotez404/playground3-stage-sdk/releases/download/v0.1.3/startdownnotez404-playground3-stage-sdk-0.1.3.tgz
```

Pin style:

```json
"@startdownnotez404/playground3-stage-sdk": "https://github.com/startdownnotez404/playground3-stage-sdk/releases/download/v0.1.3/startdownnotez404-playground3-stage-sdk-0.1.3.tgz"
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

GitHub Actions does that checkout and build on every `v*` tag and on
**Run workflow**. You do not need to run a local build script on a laptop
before tagging.

Widgets are not authored here. The job prefers a
`startdownnotez404/ui` checkout when the host script supports it; without
that repo it may fall back to in-repo `@/ele`. Do not substitute a stub
`host-ui.js`. The job refuses to ship a tarball that cannot resolve
`./host-ui`.

Optional local rebuild if you already have a sibling platform tree:

```bash
npm run build
```

That wrapper (`scripts/build.mjs`) is not used by CI.

## Publish (GitHub Release only)

`.github/workflows/publish.yml` never runs `npm publish` and does not use
the npmjs registry. Permissions are `contents: write` only.

### Triggers

- Push a `v*` tag (after this workflow is on the tagged commit).
- **Actions → Publish GitHub Release → Run workflow** with an existing
  tag (for example `v0.1.3`). Dispatch always uses the workflow file on
  the default branch, then checks out the package at that tag.

Optional dispatch input `monorepo_ref`: a monorepo branch/tag/SHA you have
verified exists and defines `build:stage-sdk`. Leave empty to use the
monorepo default branch. Do not paste a stale cloud-agent branch name.

### Secret

| Name | Required | Purpose |
| --- | --- | --- |
| `MONOREPO_READ_TOKEN` | Yes | PAT or GitHub App token with **Contents: Read** on private `startdownnotez404/monorepo`. Also grant `startdownnotez404/ui` if you want the real widget chunk. |

`GITHUB_TOKEN` can create Releases here; it cannot clone the private
monorepo. If the secret is missing, the job exits with setup instructions.

If the checked-out monorepo ref has no `build:stage-sdk` script, the job
exits and tells you to merge monorepo PR #5 first (or pass a verified
`monorepo_ref`). This workflow does not silently pin a cloud-agent branch.

### Fill or re-cut the existing v0.1.3 Release

The `v0.1.3` Release already exists and has no tarball (the old npm
publish job failed `ENEEDAUTH`). After this workflow is on `master` and
`MONOREPO_READ_TOKEN` is set:

1. Merge monorepo PR #5 if the monorepo default branch still lacks
   `build:stage-sdk`.
2. **Run workflow** with tag `v0.1.3` (and `monorepo_ref` only if you
   must point at a verified ref that already has the script).
3. The job compiles `dist/index.js` + `dist/host-ui.js` into the tagged
   package, `npm pack`s, checks that `package/dist/host-ui.js` is inside
   the tarball, and `gh release upload --clobber` onto the existing
   Release (notes are left intact).

To re-cut the same tag later, run the workflow again; `--clobber`
replaces the `.tgz` and `dist/host-ui.js` assets.

To cut a new version: bump this package, push a new `v*` tag, and let
the tag trigger do the same build + Release. Still no npmjs.
