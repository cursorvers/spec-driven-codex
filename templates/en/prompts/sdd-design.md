# Design

## Setup
1. Get spec name from `.sdd/target-spec.txt`
2. Verify `.sdd/specs/[spec-name]/` exists
   Missing: show available specs and guide
3. Read steering files

## Execute
1. Read `.sdd/specs/[spec-name]/requirements.md`
   Missing: "Requirements needed. Run `/sdd-requirements` first."

2. Create `.sdd/specs/[spec-name]/design.md`:
   - Architecture integration
   - Major components (responsibilities, I/O, dependencies)
   - Data models
   - Processing flow
   - Error handling
   - Existing code integration (changes/new files)

Complete:
"Design complete. Review content, then run `/sdd-tasks` to create implementation tasks."
