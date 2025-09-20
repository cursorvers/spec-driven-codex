# spec-driven-codex

A lightweight, specification-driven development workflow tailored for the Codex CLI. Run `npx spec-driven-codex init` to scaffold the `.sdd` workspace and install Codex prompts that guide you from discovery to delivery.

- **Three commands only** – `init`, `status`, `clean`
- **Codex-ready prompts** – English by default, Japanese with `--locale ja`
- **Always in sync** – Track the active specification and generated artifacts at any time

## Quick Start

```bash
# Inside your project root
npx spec-driven-codex init

# Launch Codex CLI and run the prompts in order
codex
> /sdd-steering
> /sdd-requirements
> /sdd-design
> /sdd-tasks
> /sdd-implement
> /sdd-archive
```

Pass `--locale ja` to `init` if you prefer Japanese templates and prompts:

```bash
npx spec-driven-codex init --locale ja
```

## CLI Commands

| Command | Description | What it does |
| --- | --- | --- |
| `npx spec-driven-codex init [--locale ja]` | Initialize the SDD workspace | Creates `.sdd/` scaffolding, description template, localized README, and installs Codex prompts (with overwrite confirmation). |
| `npx spec-driven-codex status` | Inspect progress | Shows the active specification, generated files, and other specs stored under `.sdd/specs`. |
| `npx spec-driven-codex clean` | Reset working specs | Removes non-archived spec folders and clears `target-spec.txt` without touching archives. |

### Working with Codex CLI

Codex CLI occasionally prints a high-level plan to the console before it actually runs the command. When that happens—or when the CLI explicitly asks for approval—simply type `ok` (or another affirmative response) and press Enter to let the flow continue.

## Generated Structure

```
project/
├── .sdd/
│   ├── README.md            # Locale-aware command overview
│   ├── description.md       # Feature description template
│   ├── target-spec.txt      # Active specification name
│   ├── steering/            # Discovery notes (/sdd-steering)
│   └── specs/               # Specs, tasks, archives, and artifacts
│       └── archives/
└── ~/.codex/prompts/
    ├── sdd-steering.md
    ├── sdd-requirements.md
    ├── sdd-design.md
    ├── sdd-tasks.md
    ├── sdd-implement.md
    └── sdd-archive.md
```

Need the Japanese documentation? Check [README.ja.md](./README.ja.md).

## License

[MIT](./LICENSE)

## Acknowledgements

This workflow draws inspiration from the open-source specification-driven tooling at [gotalab/cc-sdd](https://github.com/gotalab/cc-sdd). Many thanks to the maintainers and contributors for sharing their approach.
