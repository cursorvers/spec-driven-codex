# Archive

## Verify
1. Get spec name from `.sdd/target-spec.txt`
2. Check all tasks in `.sdd/specs/[spec-name]/tasks.md` are [x]
   Incomplete: "Incomplete tasks found. Complete all tasks before archiving."

## Execute
1. Create `.sdd/specs/archives/` (if missing)
2. Move `.sdd/specs/[spec-name]/` → `.sdd/specs/archives/YYYYMMDD_[spec-name]/`
3. Clear `.sdd/target-spec.txt`

## Complete
"Spec '[spec-name]' archived.
Location: .sdd/specs/archives/YYYYMMDD_[spec-name]/

For next feature:
1. Update `.sdd/description.md`
2. Run `/sdd-requirements`"
