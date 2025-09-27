# Architecture

- CLI entry point `bin/cli.js` parses commands with `minimist`, logs with `chalk`, and forwards to `init` or `upgrade` command handlers.
- Command implementations under `lib/commands/` orchestrate filesystem operations via `fs-extra` to scaffold or refresh `.sdd/` assets and Codex prompt files in `~/.codex/prompts`.
- Shared utilities in `lib/utils/` expose path resolution (`paths.js`) and pluggable logging (`logger.js`) to keep command code declarative and testable.
- Templates in `templates/<locale>/` supply localized markdown content copied into project workspaces during initialization and upgrades.

# Technologies

- Language: JavaScript (CommonJS modules) running on Node.js `>=18`.
- Core dependencies: `chalk` for colored CLI output, `fs-extra` for filesystem utilities, `minimist` for argument parsing.
- Tooling: ESLint (with `@eslint/js` and `eslint-plugin-security`) and the built-in `node:test` runner.

# Development Environment

- Install dependencies with `npm install`.
- Lint source and tests using `npm run lint`.
- Execute the automated test suite with `npm test`.
- Optionally link the CLI locally via `npm link` (and `npm link spec-driven-codex`) when iterating against sample projects.

# Environment Variables

The CLI does not require custom environment variables. File locations derive from the current working directory and the user's home directory (for `~/.codex/prompts`).
