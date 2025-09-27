# Steering (Project Discovery)

## Setup
Check `.sdd/steering/` for existing files:
- product.md, tech.md, structure.md
- Exists: update mode / Missing: create mode

## Analysis
Read:
- Config files (package.json, requirements.txt, Cargo.toml, go.mod)
- README.md, AGENTS.md, CHANGELOG.md, docs/
- Directory structure and source files

Principles:
- No security info
- Facts only
- Preserve existing content (update mode)

## Generate

### `.sdd/steering/product.md`
- Product overview
- Key features
- Use cases
- Value proposition

### `.sdd/steering/tech.md`
- Architecture
- Tech stack (languages, frameworks, dependencies)
- Dev environment (tools, commands)
- Environment variables

### `.sdd/steering/structure.md`
- Root directory layout
- Code organization patterns
- Naming conventions
- Design principles

## Complete
"Steering complete. Project info saved to `.sdd/`.
Next: Write desired feature in `.sdd/description.md`.
Then run `/sdd-requirements` to start the SDD process."
