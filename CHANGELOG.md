# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2025-09-24
### Changed
- Documented that `.sdd/description.md` must be updated before running `/sdd-requirements` across README guides and distributed templates.

## [0.1.4] - 2025-09-23
### Added
- Introduced the `upgrade` command to force-refresh Codex prompts and the `.sdd/README.md` using the active locale.
- Created shared multilingual message catalog underpinning CLI status output.
- Added comprehensive tests for the new upgrade workflow and README refresh behaviour.

### Changed
- `init` now always refreshes `.sdd/README.md` while leaving existing Codex prompts untouched.
- Updated English/Japanese README guides and bundled templates to document the new workflows.

### Removed
- Retired the interactive overwrite prompt utility now that `init` is non-destructive.
