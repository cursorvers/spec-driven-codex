# spec-driven-codex

シンプルで強力な、Codex CLI用の仕様駆動開発フレームワークです。デフォルトは英語テンプレートですが、`--locale ja` オプションで日本語版をインストールできます。

```bash
npx spec-driven-codex init --locale ja
```

と実行すると `.sdd/` 配下のテンプレートと Codex プロンプトが日本語になります。

## ✨ 特徴

- **シンプル**: `init` / `status` / `clean` の3コマンドだけで導入からメンテナンスまで完結
- **日本語対応**: CLIメッセージとテンプレートがすべて日本語
- **Codex CLI連携**: `~/.codex/prompts` に SDD フロー用プロンプトを自動配置
- **状態管理**: `.sdd` 配下の状態をいつでも `status` で確認可能

## 🚀 クイックスタート

```bash
# プロジェクトルートで実行
npx spec-driven-codex init

# Codex CLI を起動してフローを進める
codex
> /sdd-steering
> /sdd-requirements
> /sdd-design
> /sdd-tasks
> /sdd-implement
> /sdd-archive
```

## 🛠 コマンド

| コマンド | 説明 | おもな処理 |
| --- | --- | --- |
| コマンド | 説明 | おもな処理 |
| --- | --- | --- |
| `npx spec-driven-codex init [--locale ja]` | プロジェクト初期化 | `.sdd` 構造の生成、説明テンプレート作成、Codex プロンプト配布（既存ファイルは上書き可否を確認） |
| `npx spec-driven-codex status` | 現在の仕様状態を確認 | `.sdd/target-spec.txt` を参照し、生成済みファイルや他の spec を一覧表示 |
| `npx spec-driven-codex clean` | 作業中の一時成果物を掃除 | `.sdd/specs` から `archives/` 以外を削除し、`target-spec.txt` をリセット |

### Codex CLIの進行について

Codex CLIはコマンドを実行する前に、これから行う作業計画だけをコンソールに表示したり、承認を求めて入力待ちになることがあります。その場合は `ok` などの承認メッセージを入力して Enter を押すと、処理が続行されます。

## 📚 Codex CLI で使う `/sdd-***` コマンド

`npx spec-driven-codex init` を実行すると、Codex CLI で以下のプロンプトが利用できるようになります。上から順に進めることで、仕様駆動開発の流れを自然に踏めます。

- `/sdd-steering` — プロジェクト全体のコンテキストを把握し、関係者や現状の課題を整理します。
- `/sdd-requirements` — 実装する機能の要求と受け入れ条件を明確化します。
- `/sdd-design` — 要求を満たすための設計方針や技術的な選択肢をまとめます。
- `/sdd-tasks` — 実装に必要なタスクを洗い出し、担当や順序を決めます。
- `/sdd-implement` — タスクを実行し、テストを含む実装作業を完了させます。
- `/sdd-archive` — 完成した成果と振り返りをアーカイブし、将来の参照に備えます。

### プロンプトの上書き確認

`init` 実行時に `~/.codex/prompts` に同名ファイルが存在すると、ファイルごとに `y/n` で上書きするか尋ねます。`y` を選ぶとテンプレートで置き換え、`n` を選ぶと既存ファイルをそのまま保持します。

## 📂 生成される構造

```
プロジェクト/
├── .sdd/
│   ├── description.md        # 実装したい機能の説明テンプレート
│   ├── target-spec.txt       # 現在作業中のspec名
│   ├── steering/             # /sdd-steering の成果物
│   └── specs/                # specごとの成果物
│       └── archives/         # アーカイブされたspec
└── ~/.codex/prompts/
    ├── sdd-steering.md
    ├── sdd-requirements.md
    ├── sdd-design.md
    ├── sdd-tasks.md
    ├── sdd-implement.md
    └── sdd-archive.md
```

## 📄 ライセンス

[MIT](./LICENSE)
