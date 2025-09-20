# Specification-Driven Development: Implementation

Execute the planned tasks, keep tests green, and document outcomes.

## Step 1: Implementation Loop
For each task:
1. Write or update tests (RED).
2. Implement the minimal code to pass them (GREEN).
3. Refactor for clarity while keeping tests passing (REFACTOR).

Record progress in commit messages and keep changes small and reviewable.

## Step 2: Quality Checklist
Before declaring the task complete, ensure:
- Tests cover success and failure paths
- Linting passes (`npm run lint`)
- No secrets or credentials are hard-coded
- Documentation or comments are updated if necessary

## Step 3: Update Spec Artifacts
Capture notable decisions or deviations in the relevant spec files. If the design changed, reflect it in `/sdd-design`.

## Step 4: Handoff
Prepare for review by summarizing what changed, how it was tested, and any follow-up work. Then proceed to `/sdd-archive`.
