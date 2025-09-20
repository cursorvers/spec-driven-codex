#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $(basename "$0") [patch|minor|major]" >&2
  exit 1
}

LEVEL="${1:-patch}"

case "$LEVEL" in
  patch|minor|major)
    ;;
  "" )
    LEVEL="patch"
    ;;
  *)
    usage
    ;;
esac

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$BRANCH" != "main" ]]; then
  echo "✖ Please run this script on the main branch." >&2
  exit 1
fi

git update-index -q --refresh
if ! git diff-index --quiet HEAD --; then
  echo "✖ Working tree is dirty. Commit or stash changes before bumping the version." >&2
  exit 1
fi

echo "✔ Bumping npm version ($LEVEL)..."
npm version "$LEVEL"

echo "✔ Pushing commits and tags to origin/main..."
git push origin main --follow-tags

echo "🎉 Version bump complete. Publish with:\n  npm publish --access public"
