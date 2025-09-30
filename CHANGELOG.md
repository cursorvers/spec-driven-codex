# Changelog

All notable changes to this project will be documented in this file.

## [1.3.0] - 2025-09-30

### Changed
- **Reverted**: Restored all SDD command prompts to their v1.0.1 state to prioritize deliberate, user-approved workflows
  - Reverted `/sdd-steering`, `/sdd-requirements`, `/sdd-design`, `/sdd-tasks`, `/sdd-implement`, and `/sdd-archive` to detailed templates
  - Maintained `/sdd-highway` fast-track workflow introduced in v1.2.0
- The v1.1.0 optimizations inadvertently caused unintended behaviors that conflicted with the core specification-driven development philosophy
- Specification-driven development emphasizes step-by-step planning with explicit user approval at each stage
- The detailed prompts better support this methodical, approval-gated approach

### Rationale
The v1.1.0 "less is more" approach, while token-efficient, reduced the deliberate pacing and explicit approval checkpoints that are fundamental to specification-driven workflows. This version restores the balance between efficiency and control, allowing users to choose between the highway mode (fast) and the standard flow (deliberate).

## [1.2.0] - 2025-09-27

### Added
- `/sdd-highway` prompt for fast-tracking design, task planning, and implementation once requirements are approved.

### Changed
- `/sdd-requirements` completion messaging and SDD flow documentation (README, INTRODUCTION, `.sdd/README.md`) now highlight the highway route as an optional next step.

### Technical Notes
- Updated initialization and upgrade tests to exercise the additional prompt distribution.

## [1.1.0] - 2025-09-27

### Changed
- **Breaking**: Optimized all SDD command prompts for GPT-5-Codex following the "less is more" principle
  - `/sdd-steering`: Removed verbose explanations and markdown templates, reduced token usage by ~60%
  - `/sdd-requirements`: Simplified step structure, removed detailed templates
  - `/sdd-design`: Eliminated repetitive component examples and placeholder text
  - `/sdd-tasks`: Streamlined task breakdown instructions, removed excessive formatting
  - `/sdd-implement`: Condensed RED-GREEN-REFACTOR cycle instructions
  - `/sdd-archive`: Simplified completion verification and archival process
- Maintained essential file operations and user-facing messages in all prompts
- Applied consistent formatting across both English and Japanese versions
- Reduced overall prompt complexity to leverage GPT-5-Codex's built-in coding expertise

### Technical Notes
- All prompts now align with [GPT-5-Codex best practices](https://cookbook.openai.com/examples/gpt-5-codex_prompting_guide) documented in the OpenAI Cookbook
- Removed anti-patterns: preambles, over-prompting, excessive tool descriptions
- Trust model's ability to generate appropriate document structures without detailed templates

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
