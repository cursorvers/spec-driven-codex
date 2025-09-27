# Implementation

## Setup
1. Get spec name from `.sdd/target-spec.txt`
2. Verify `.sdd/specs/[spec-name]/` exists
3. Read steering files

## Execute
1. Read spec documents:
   - requirements.md
   - design.md
   - tasks.md

2. Execute tasks sequentially:
   - Write test first (RED)
   - Minimal implementation to pass (GREEN)
   - Refactor for quality (REFACTOR)
   - Update checkbox in tasks.md: `- [x]`

3. Complete:
   - Verify all tests pass
   - Update documentation
   - "Complete. Run `/sdd-archive` to close spec."
