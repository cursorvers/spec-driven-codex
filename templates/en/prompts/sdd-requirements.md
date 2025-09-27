# Requirements

## Setup
1. Required files check:
   - `.sdd/description.md`
   - `.sdd/steering/product.md`
   - `.sdd/steering/tech.md`
   - `.sdd/steering/structure.md`

2. Spec setup:
   - Check `.sdd/target-spec.txt`
   - Missing: generate spec name from description.md, create directory, record in target-spec.txt
   - Exists: verify spec directory exists

3. Read steering files

## Execute
Create `.sdd/specs/[spec-name]/requirements.md`:
- Feature overview (from description.md)
- User stories
- Functional requirements with acceptance criteria
- Non-functional requirements (if needed)

Complete:
"Requirements complete. Review content, then run `/sdd-design`."
