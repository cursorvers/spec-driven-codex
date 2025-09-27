# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm test` - Run all tests using Node.js built-in test runner
- `npm run lint` - Run ESLint with security plugin
- `npm run release` - Run version bump script (scripts/bump-version.sh)

### Testing Single Files
```bash
node --test test/init.test.js
node --test test/upgrade.test.js
```

## Project Architecture

This is a CLI tool for specification-driven development workflows with the Codex CLI. It creates project scaffolding and installs Codex prompts for a structured development process.

### Core Components

- **bin/cli.js** - Main CLI entry point with minimist argument parsing
- **lib/commands/** - Command implementations (init, upgrade)
- **lib/utils/** - Shared utilities (paths, logger)
- **templates/** - Localized templates for both prompts and scaffolding

### Command Flow Architecture

1. **CLI Entry** (`bin/cli.js`) - Parses arguments and routes to commands
2. **Path Resolution** (`lib/utils/paths.js`) - Generates all file paths based on locale and options
3. **Command Execution** - Creates `.sdd/` structure and installs Codex prompts

### Key Design Patterns

- **Locale Support**: English and Japanese templates with automatic fallback to English
- **Safe Operations**: Existing prompt files are preserved, only `.sdd/README.md` is always overwritten
- **Template System**: Structured templates organized by locale and type (init vs prompts)
- **Path Abstraction**: All file paths computed through `resolvePaths()` utility

### File Structure Generated

The tool creates:
- `.sdd/` directory with steering/, specs/, description.md, README.md, target-spec.txt
- `~/.codex/prompts/` with 6 workflow prompts (sdd-steering.md through sdd-archive.md)

### Security Considerations

- ESLint security plugin is enabled
- Non-literal filesystem operations are explicitly approved with eslint-disable comments where template paths are used
- All user inputs are validated through path resolution

### Testing Strategy

- Node.js built-in test runner for unit tests
- Temporary directories for isolated test environments
- Tests verify both successful operations and edge cases (existing files, locale switching)