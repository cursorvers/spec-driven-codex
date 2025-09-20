# Contributing

Thank you for considering contributing to **spec-driven-codex**! This project aims to make specification-driven development with Codex CLI simple and approachable. Contributions of all sizes are welcome—whether it's fixing a typo, filing an issue, or adding new features.

## How to Get Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/<your-username>/spec-driven-codex.git
   cd spec-driven-codex
   ```
3. **Install dependencies** and run the test suite to ensure everything is working:
   ```bash
   npm install
   npm test
   ```

## Making Changes

- Follow the existing code style; ESLint is configured to help:
  ```bash
  npm run lint
  ```
- Write tests for any new features or bug fixes when possible.
- Keep commits focused and descriptive. Conventional commit messages (e.g., `feat: ...`, `fix: ...`) are appreciated but not required.

## Testing Your Changes Locally

Use `npm link` to try the CLI in another directory:
```bash
npm link
mkdir -p ~/tmp/sdc-test
cd ~/tmp/sdc-test
npm link spec-driven-codex
spec-driven-codex init
```

## Submitting Changes

1. **Push** your branch to your fork.
2. **Open a pull request** against the main repository.
3. Provide a clear description of the change and any relevant context or screenshots.

## Reporting Issues

If you run into a problem or have a feature suggestion, please open an issue at:
```
https://github.com/tomada1114/spec-driven-codex/issues
```
Include as much detail as possible to help reproduce the issue.

## Code of Conduct

Please be respectful and constructive in all interactions. Let's build an open, welcoming, and supportive community around specification-driven development.

Thanks again for your interest in improving spec-driven-codex!
