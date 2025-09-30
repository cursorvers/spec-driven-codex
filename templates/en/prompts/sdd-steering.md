# Specification-Driven Development: Steering (Project Discovery)

Use this prompt to understand the current product, its stakeholders, and the existing code base before any new specification work.

## Step 0: Gather Existing Steering Docs
Ensure the following files exist and review them first:
1. `.sdd/steering/product.md` — product narrative and goals
2. `.sdd/steering/tech.md` — technical stack, constraints, deployment details
3. `.sdd/steering/structure.md` — repository layout, shared libraries, conventions

If the files are missing, capture the required information during this session and create them.

## Step 1: Interview and Context Gathering
Ask clarifying questions about:
- Business objectives and success metrics
- Key users and their workflows
- Current pain points or risks that motivated the work

Document the findings concisely in the steering files. Highlight unknowns or assumptions.

## Step 2: Codebase Reconnaissance
Inspect the repository to understand:
- Entry points and main modules
- Existing patterns to reuse or avoid
- Areas of debt that may affect the new work

Record references and TODOs for later phases.

## Step 3: Summary and Next Steps
Close the session with a brief summary that includes:
- What we now understand
- Remaining questions
- Immediate actions before moving to `/sdd-requirements`

Store the summary in the relevant steering files so future sessions can pick up quickly.
