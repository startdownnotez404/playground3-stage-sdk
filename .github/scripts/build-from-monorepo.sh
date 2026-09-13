#!/usr/bin/env bash
# Compile Stage SDK JS into PLAYGROUND3_SDK_PACKAGE_ROOT from a monorepo checkout.
# Used by .github/workflows/publish.yml. Do not npm publish.
set -euo pipefail

SDK_ROOT="${SDK_ROOT:?SDK_ROOT must be the playground3-stage-sdk package root}"
MONOREPO_ROOT="${MONOREPO_ROOT:?MONOREPO_ROOT must be the startdownnotez404/monorepo checkout}"
UI_ROOT="${UI_ROOT:-}"

fail_missing_script() {
  local ref="${MONOREPO_REF:-the checked-out monorepo ref}"
  cat <<EOF
startdownnotez404/monorepo (${ref}) does not define npm script "build:stage-sdk".

This package cannot honestly produce dist/index.js or dist/host-ui.js.
Those files are compiled by the host script
  apps/web/scripts/buildPlayground3StageSdk.mjs
when PLAYGROUND3_SDK_PACKAGE_ROOT points at this package.

The script / npm task currently live on monorepo PR #5
(Stage SDK 0.1.3 host-ui + PLAYGROUND3_SDK_PACKAGE_ROOT).
Merge that PR into the monorepo default branch, then re-run this workflow.

If PR #5 is merged only on a ref you have verified exists, re-run with
workflow input monorepo_ref set to that ref. Do not pin a stale
cloud-agent branch name in this repository.
EOF
  exit 1
}

pkg_has_script() {
  local pkg="$1"
  [[ -f "$pkg" ]] && jq -e '.scripts["build:stage-sdk"]' "$pkg" >/dev/null 2>&1
}

resolve_build_cwd() {
  if pkg_has_script "$MONOREPO_ROOT/package.json"; then
    BUILD_CWD="$MONOREPO_ROOT"
    return
  fi
  if pkg_has_script "$MONOREPO_ROOT/apps/web/package.json"; then
    BUILD_CWD="$MONOREPO_ROOT/apps/web"
    return
  fi
  fail_missing_script
}

detect_pm() {
  local dir="$1"
  local field
  field="$(jq -r '.packageManager // empty' "$dir/package.json" 2>/dev/null || true)"
  case "$field" in
    pnpm@*) echo pnpm; return ;;
    yarn@*) echo yarn; return ;;
    npm@*) echo npm; return ;;
    bun@*) echo bun; return ;;
  esac
  if [[ -f "$dir/pnpm-lock.yaml" ]]; then
    echo pnpm
  elif [[ -f "$dir/yarn.lock" ]]; then
    echo yarn
  elif [[ -f "$dir/bun.lockb" || -f "$dir/bun.lock" ]]; then
    echo bun
  else
    echo npm
  fi
}

install_deps() {
  local dir="$1"
  local pm
  if [[ ! -f "$dir/package.json" ]]; then
    echo "No package.json at $dir" >&2
    exit 1
  fi
  pm="$(detect_pm "$dir")"
  echo "Installing JavaScript dependencies in $dir with $pm"
  case "$pm" in
    pnpm)
      corepack enable
      (cd "$dir" && corepack prepare --activate && pnpm install --frozen-lockfile)
      ;;
    yarn)
      corepack enable
      (cd "$dir" && corepack prepare --activate && yarn install --frozen-lockfile)
      ;;
    bun)
      (cd "$dir" && bun install --frozen-lockfile)
      ;;
    npm)
      if [[ -f "$dir/package-lock.json" ]]; then
        npm ci --prefix "$dir"
      else
        echo "No package-lock.json at $dir; using npm install"
        npm install --prefix "$dir"
      fi
      ;;
    *)
      echo "Unknown package manager: $pm" >&2
      exit 1
      ;;
  esac
}

find_host_script() {
  if [[ -f "$MONOREPO_ROOT/apps/web/scripts/buildPlayground3StageSdk.mjs" ]]; then
    echo "$MONOREPO_ROOT/apps/web/scripts/buildPlayground3StageSdk.mjs"
    return
  fi
  find "$MONOREPO_ROOT" -name 'buildPlayground3StageSdk.mjs' -print -quit
}

wire_ui_checkout() {
  local script="$1"
  if [[ -z "$UI_ROOT" || ! -d "$UI_ROOT" ]]; then
    echo "No startdownnotez404/ui checkout. The host build may fall back to in-repo @/ele."
    echo "To emit the real ui-lib widget chunk, grant MONOREPO_READ_TOKEN Contents: Read on startdownnotez404/ui as well."
    return 0
  fi
  if [[ -z "$script" || ! -f "$script" ]]; then
    echo "Host build script not found; leaving UI_ROOT=$UI_ROOT in the environment."
    return 0
  fi

  echo "Using ui checkout at $UI_ROOT"
  local name
  while IFS= read -r name; do
    [[ -z "$name" ]] && continue
    case "$name" in
      *UI* | *ELE* | *UILIB*)
        if [[ -z "${!name:-}" ]]; then
          export "$name=$UI_ROOT"
          echo "Set $name=$UI_ROOT (referenced by $(basename "$script"))"
        fi
        ;;
    esac
  done < <(grep -oE 'process\.env\.[A-Z0-9_]+' "$script" 2>/dev/null | cut -d. -f3 | sort -u || true)

  if grep -q 'ui-lib/ui-dev' "$script" && [[ ! -e "$MONOREPO_ROOT/ui-lib/ui-dev" ]]; then
    mkdir -p "$MONOREPO_ROOT/ui-lib"
    ln -s "$UI_ROOT" "$MONOREPO_ROOT/ui-lib/ui-dev"
    echo "Symlinked $MONOREPO_ROOT/ui-lib/ui-dev -> $UI_ROOT"
  fi
}

run_build() {
  local pm
  pm="$(detect_pm "$BUILD_CWD")"
  echo "Running $pm run build:stage-sdk in $BUILD_CWD"
  echo "PLAYGROUND3_SDK_PACKAGE_ROOT=$SDK_ROOT"
  case "$pm" in
    pnpm) (cd "$BUILD_CWD" && pnpm run build:stage-sdk) ;;
    yarn) (cd "$BUILD_CWD" && yarn run build:stage-sdk) ;;
    bun) (cd "$BUILD_CWD" && bun run build:stage-sdk) ;;
    *) (cd "$BUILD_CWD" && npm run build:stage-sdk) ;;
  esac
}

require_dist() {
  local missing=0
  if [[ ! -s "$SDK_ROOT/dist/index.js" ]]; then
    echo "Build did not write $SDK_ROOT/dist/index.js" >&2
    missing=1
  fi
  if [[ ! -s "$SDK_ROOT/dist/host-ui.js" ]]; then
    echo "Build did not write $SDK_ROOT/dist/host-ui.js" >&2
    echo "Do not ship a tarball that cannot resolve ./host-ui." >&2
    echo "Do not invent a stub host-ui.js in this repo." >&2
    missing=1
  fi
  if [[ "$missing" -ne 0 ]]; then
    exit 1
  fi
  echo "Host build wrote dist/index.js ($(wc -c < "$SDK_ROOT/dist/index.js") bytes) and dist/host-ui.js ($(wc -c < "$SDK_ROOT/dist/host-ui.js") bytes)"
}

# Allow "source" for tests: skip main when BUILD_FROM_MONOREPO_LIB=1
if [[ "${BUILD_FROM_MONOREPO_LIB:-}" == "1" ]]; then
  return 0 2>/dev/null || exit 0
fi

resolve_build_cwd
echo "build:stage-sdk found in $BUILD_CWD/package.json"

install_deps "$MONOREPO_ROOT"
if [[ "$BUILD_CWD" != "$MONOREPO_ROOT" && ! -d "$MONOREPO_ROOT/node_modules" && ! -d "$BUILD_CWD/node_modules" ]]; then
  install_deps "$BUILD_CWD"
fi

HOST_SCRIPT="$(find_host_script || true)"
export PLAYGROUND3_SDK_PACKAGE_ROOT="$SDK_ROOT"
if [[ -d "$MONOREPO_ROOT/apps/web" && -z "${PLAYGROUND3_PLATFORM_ROOT:-}" ]]; then
  export PLAYGROUND3_PLATFORM_ROOT="$MONOREPO_ROOT/apps/web"
  echo "Set PLAYGROUND3_PLATFORM_ROOT=$PLAYGROUND3_PLATFORM_ROOT"
fi
wire_ui_checkout "${HOST_SCRIPT:-}"
run_build
require_dist
