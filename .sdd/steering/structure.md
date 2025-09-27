# Repository Layout

- `bin/` — CLI executable (`cli.js`) exposing `init` and `upgrade` commands.
- `lib/` — Command logic (`lib/commands/`) plus shared utilities (`lib/utils/`).
- `templates/` — Locale-specific assets copied into `.sdd/` and `~/.codex/prompts` during CLI runs.
- `test/` — `node:test` suites that validate initialization behavior, overwrite rules, and locale handling.
- Top-level documentation (`README*.md`, `CONTRIBUTING.md`, `DEVELOPMENT.md`, `AGENTS.md`) explains workflows and contributor practices.
- `.sdd/` — Generated workspace containing steering notes, specs, and active target metadata.

# Code Organization Patterns

- Commands expose `init` and `upgrade` entry points through `lib/commands/index.js`, enabling the CLI to import a single module.
- Reusable helpers (e.g., `resolvePaths`, `createLogger`) isolate environment-specific logic from command orchestration.
- Templates follow a `<locale>/<category>/` hierarchy so every locale ships parallel assets.
- Tests create isolated temporary directories to assert filesystem side effects without touching the real workspace.

# Naming Conventions

- JavaScript modules use lower-hyphen filenames (e.g., `init.js`, `paths.js`) within CommonJS modules.
- Prompt and template files follow the `sdd-*.md` pattern and remain lower-kebab-case.
- Locale folders are two-letter ISO codes (`en`, `ja`).
- Markdown docs keep two-space indentation and plain ASCII characters.

# Guiding Principles

- Preserve existing Codex prompt files on `init` re-runs while always refreshing `.sdd/README.md`.
- Keep the CLI non-destructive and idempotent so users can rerun commands safely.
- Maintain locale parity by updating both English and Japanese assets together.
- Enforce quality by running linting and tests before release, as documented in repository guidelines.
