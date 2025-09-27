# INTRODUCTION.md (English)

## spec-driven-codex: Start Specification-Driven Development Today

`spec-driven-codex` is a simple framework that brings the power of Specification-Driven Development (SDD) to Codex CLI.

No complex configuration needed.

Just run `npx spec-driven-codex init` and a systematic development process will be integrated into your project.

## Why Specification-Driven Development?

AI pair programming has become commonplace, but it brings new challenges.

"Relying too much on AI, losing sight of what we're building"

"Starting implementation with vague requirements, causing major rework later"

— Sound familiar?

Specification-driven development provides a clear answer to these problems.

Following the natural flow of requirements → design → implementation, humans and AI collaborate appropriately.

By inserting human approval at each phase, you can maximize AI productivity while preventing directional drift.

## Development Flow in 6 Steps (with an Optional Highway)

### 1. **Steering** `/sdd-steering`
Understand the overall picture of existing projects and automatically generate three foundational documents:
- Product overview (what we're building)
- Technology stack (how we're building it)
- Project structure (where everything is)

### 2. **Requirements** `/sdd-requirements`
Clarify feature requirements and acceptance criteria. Prevent ambiguous definitions of "done."

**Optional Highway** `/sdd-highway`
Let the CLI chain `/sdd-design`, `/sdd-tasks`, and `/sdd-implement` automatically when the requirements are ready. Choose this fast lane when you want to stay focused on discovery while Codex executes the build.

### 3. **Design** `/sdd-design`
Design architecture, data flow, and error handling. Clearly document integration with existing code.

### 4. **Tasks** `/sdd-tasks`
Break down into implementable task units. Progress is clear at a glance with checklist format.

### 5. **Implementation** `/sdd-implement`
Execute tasks in order. Progress with test-first approach to ensure quality.

### 6. **Archive** `/sdd-archive`
Archive completed specifications with dates. Promote knowledge accumulation and reuse.

## Surprisingly Simple Setup

```bash
# English version (default)
npx spec-driven-codex init

# Japanese version
npx spec-driven-codex init --locale ja
```

With just one command, the following is automatically prepared:
- Generation of `.sdd/` directory structure
- Placement of Codex CLI prompts (7 files)
- Creation of feature description templates

Works immediately with both existing and new projects.

## For Teams, For Individuals

### Startups & Small Teams
Solves the "no time to write specs" problem.

Specifications are naturally generated while developing, making it easier for new team members to understand context.

### Enterprise Development
With built-in approval flow from requirements → design → implementation, maintain development speed while ensuring governance.

Can also be used as audit trail.

### Individual Developers
Shift from "think while building" to "think before building" style.

Leave today's thoughts in `.sdd/` for your future self.

## Real Development Experience

```bash
# Understanding the project (for existing projects)
codex
> /sdd-steering

# Write new feature description
echo "Add user authentication feature" > .sdd/description.md

# Progress through development flow
> /sdd-requirements  # Define requirements
> /sdd-highway       # Optional: fast lane for design -> tasks -> implementation
> /sdd-design        # Create design (skip if highway already ran)
> /sdd-tasks         # Break into tasks (skip if highway already ran)
> /sdd-implement     # Implement (skip if highway already ran)
> /sdd-archive       # Complete!
```

Codex CLI guides you through each step, so you won't get lost.

When approval is needed, you'll be prompted for input — just type `ok` to proceed.

## All Artifacts in `.sdd/`

```
.sdd/
├── description.md        # What to build this time
├── target-spec.txt      # Working spec name
├── steering/            # Project memory
│   ├── product.md      # Product information
│   ├── tech.md         # Technical information
│   └── structure.md    # Structure information
└── specs/              # Specifications for each feature
    ├── user-auth/      # Example: Auth feature
    │   ├── requirements.md
    │   ├── design.md
    │   └── tasks.md
    └── archives/       # Completed specs
```

Specifications and implementation are managed in the same repository, naturally enabling Git version control.

## Safe for International Teams

English-speaking developers and Japanese-speaking teams can manage specifications with the same structure.

With the `--locale ja` option, prompts and templates become Japanese, enabling collaboration across language barriers.

## Why Start Now

- **Minimal learning cost**: No complex configuration or tool learning required
- **Leverage existing assets**: Can be introduced directly to current projects
- **Gradual adoption**: Start with small features, expand gradually
- **Open source**: Free to use and modify under MIT license

## Summary

`spec-driven-codex` is a tool that optimizes the established methodology of specification-driven development for modern AI pair programming environments.

Specifications first, implementation second.

This simple principle transforms your development into something more predictable and higher quality.

```bash
npx spec-driven-codex init
```

Why not run this command right now and start a new development experience?

---

**Repository**: [github.com/your-username/spec-driven-codex](https://github.com/your-username/spec-driven-codex)
**License**: MIT
**Acknowledgments**: The concept of specification-driven development draws significant inspiration from [AWS Kiro](https://kiro.dev) and [gotalab/cc-sdd](https://github.com/gotalab/cc-sdd).
