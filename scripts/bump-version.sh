#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VERSION_FILE="$SCRIPT_DIR/version.txt"

# Version file validation
if [[ ! -f "$VERSION_FILE" ]]; then
  echo "✖ Version file not found: $VERSION_FILE" >&2
  exit 1
fi

CURRENT_VERSION="$(cat "$VERSION_FILE")"
if [[ ! "$CURRENT_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "✖ Invalid version format in $VERSION_FILE: $CURRENT_VERSION" >&2
  echo "Expected format: X.Y.Z" >&2
  exit 1
fi

# Check if version already exists as a git tag
if git rev-parse "v$CURRENT_VERSION" >/dev/null 2>&1; then
  echo "✖ Version v$CURRENT_VERSION already exists as a git tag." >&2
  echo "Please update scripts/version.txt to a new version." >&2
  exit 1
fi

# Git branch validation
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$BRANCH" != "main" ]]; then
  echo "✖ Please run this script on the main branch." >&2
  exit 1
fi

# Working tree validation
git update-index -q --refresh
if ! git diff-index --quiet HEAD --; then
  echo "✖ Working tree is dirty. Commit or stash changes before release." >&2
  exit 1
fi

echo "🚀 Release Process Starting..."
echo "Current version: $CURRENT_VERSION"

# Update package.json version
echo "✔ Updating package.json version to $CURRENT_VERSION..."
npm version "$CURRENT_VERSION" --no-git-tag-version

# Create git tag
echo "✔ Creating git tag v$CURRENT_VERSION..."
git add package.json package-lock.json 2>/dev/null || git add package.json
git commit -m "chore: release v$CURRENT_VERSION"
git tag "v$CURRENT_VERSION"

# Push to remote
echo "✔ Pushing commits and tags to origin/main..."
git push origin main --follow-tags
echo "✅ Git operations complete."

# Publish to npm
echo "✔ Publishing to npm..."
npm publish --access public
echo "🎉 Release v$CURRENT_VERSION published successfully!"

echo ""
echo "🎯 Next steps:"
echo "  1. Update scripts/version.txt to next version"
echo "  2. Document release in CHANGELOG.md"
