# spec-driven-codex

A lightweight, specification-driven development workflow tailored for the Codex CLI. Run `npx spec-driven-codex init` to scaffold the `.sdd` workspace and install Codex prompts that guide you from discovery to delivery.

- **Single command setup** – `init` bootstraps everything you need
- **Codex-ready prompts** – English by default, Japanese with `--locale ja`
- **Always in sync** – Spec artifacts live under `.sdd/` for the entire flow

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

## CLI Command

| Command | Description |
| --- | --- |
| `npx spec-driven-codex init [--locale ja]` | Creates `.sdd/` scaffolding, localized templates, and installs Codex prompts (with overwrite confirmation). |

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
