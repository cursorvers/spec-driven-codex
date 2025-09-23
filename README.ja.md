# spec-driven-codex

シンプルで強力な、Codex CLI用の仕様駆動開発フレームワークです。デフォルトは英語テンプレートですが、`--locale ja` オプションで日本語版をインストールできます。テンプレートを最新化したいときは `npx spec-driven-codex upgrade` を実行してください。

```bash
npx spec-driven-codex init --locale ja
```

と実行すると `.sdd/` 配下のテンプレートと Codex プロンプトが日本語になります。

## ✨ 特徴

- **シンプル**: `init` コマンド一つでセットアップ完了
- **既存プロンプト保持**: `init` 再実行時も既存プロンプトは上書きされず、`.sdd/README.md` は毎回最新化
- **ワンステップ更新**: `upgrade` コマンドで最新プロンプトと `.sdd/README.md` を強制コピー
- **Codex CLI連携**: `~/.codex/prompts` に SDD フロー用プロンプトを自動配置
- **状態管理**: `.sdd` 配下にフロー成果物を体系的に保存

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

テンプレートを後から更新したい場合は次を実行します。

```bash
npx spec-driven-codex upgrade --locale ja
```

## 🛠 コマンド

| コマンド | 説明 |
| --- | --- |
| `npx spec-driven-codex init [--locale ja]` | `.sdd` 構造の生成、説明テンプレート作成、Codex プロンプト配布（既存プロンプトは保持しつつ `.sdd/README.md` を常に更新） |
| `npx spec-driven-codex upgrade [--locale ja]` | `~/.codex/prompts` に最新テンプレートを強制コピーし、`.sdd/README.md` も最新化（確認なしで上書き） |

## Codex CLIの進行について

Codex CLIはコマンドを実行する前に、これから行う作業計画だけをコンソールに表示したり、承認を求めて入力待ちになることがあります。その場合は `ok` などの承認メッセージを入力して Enter を押すと、処理が続行されます。

## 📚 Codex CLIで利用するプロンプト

`init` 完了後は、以下の順番で Codex CLI プロンプトを実行するとスムーズに進められます。

- `/sdd-steering` — プロジェクト全体のコンテキストを把握し、関係者や現状の課題を整理します。
- `/sdd-requirements` — 実装する機能の要求と受け入れ条件を明確化します。
- `/sdd-design` — 要求を満たすための設計方針や技術的な選択肢をまとめます。
- `/sdd-tasks` — 実装に必要なタスクを洗い出し、担当や順序を決めます。
- `/sdd-implement` — タスクを順番に実行し、テスト・リファクタリングも含めて完了させます。
- `/sdd-archive` — 完成した成果と振り返りをアーカイブし、将来の参照に備えます。

### プロンプトの再インストール

`init` を再実行すると既存の Codex プロンプトはスキップされますが、`.sdd/README.md` は常にテンプレートで更新されます。最新テンプレートへ入れ替えたい場合は `npx spec-driven-codex upgrade` を利用してください。`upgrade` は確認ダイアログなしでプロンプトと `.sdd/README.md` をすべて上書きします。

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

英語版ドキュメントは [README.md](./README.md) を参照してください。

## 📄 ライセンス

[MIT](./LICENSE)

## 🙏 謝辞

仕様駆動開発フローのアイデアは [gotalab/cc-sdd](https://github.com/gotalab/cc-sdd) から多くの示唆を得ています。メンテナの皆さまに感謝します。
