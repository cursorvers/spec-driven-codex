# アーキテクチャ統合

`sdd-highway` は既存 CLI コマンド群に新しいプロンプト（markdown テンプレート）を追加する機能であり、アプリケーションロジックは既存 `init` / `upgrade` ワークフローに統合する。主な統合点は以下:

- テンプレート配布ルールを定義している `templates/<locale>/prompts/` に `sdd-highway.md` を追加し、`init` と `upgrade` がコピー対象に含める。
- `/sdd-requirements` の完了メッセージを管理するテンプレートへ高速ルート案内文を追加。
- README / INTRODUCTION 等のドキュメント（英語・日本語双方）に新プロンプトの存在と利用方法を追記。

これらは現行アーキテクチャの「テンプレート → コピー → ドキュメント反映」という責務分離を保つ。

# 主要コンポーネント

- `templates/en/prompts/sdd-highway.md` / `templates/ja/prompts/sdd-highway.md`
  - **責務**: `/sdd-highway` コマンド実行時に Codex CLI が読み込むプロンプト本文。
  - **入出力**: ローカルファイル → `init`/`upgrade` 実行時に `~/.codex/prompts/` へコピー。
  - **依存**: 既存のテンプレート構造（`templates/<locale>/prompts`）。
- `lib/commands/init.js`
  - **責務**: 新規テンプレートの検出とコピー。特別な対応は不要だが、テストで期待値を更新する。
  - **入出力**: テンプレートファイル → プロンプトディレクトリ。
  - **依存**: `resolvePaths` が返すテンプレート一覧。
- `lib/commands/upgrade.js`
  - **責務**: 既存プロンプトの上書きコピー。`sdd-highway` も他と同様に扱う。
- `test/init.test.js`
  - **責務**: プロンプト配布とスキップ挙動の検証。プロンプト数の期待値を +1 し、特定ファイルが含まれることを確認。
- 各種ドキュメント (`README*.md`, `.sdd/README.md`, `INTRODUCTION*.md`)
  - **責務**: コマンド一覧やフロー説明に `/sdd-highway` を追加し、英語・日本語の整合性を確保。
- `/sdd-requirements` 完了メッセージテンプレート
  - **責務**: 高速ルート案内を追記し、ユーザーが次のアクションとして `/sdd-highway` を認識できるようにする。

# データモデル

- 新しいテンプレートは単なるファイル（Markdown）であり、既存データモデルに変更はない。
- `init` / `upgrade` の結果オブジェクトには既に `prompts.installed` / `overwritten` / `skipped` があり、新ファイルも既存配列に追加されるだけであるため構造変更は不要。

# 処理フロー

1. ユーザーが `npm install` 済み環境で `npx spec-driven-codex init` を実行。
2. `resolvePaths` が `templates/<locale>/prompts` を列挙し、新規 `sdd-highway.md` を含む全テンプレートをコピー対象として返す。
3. `init` コマンドが `~/.codex/prompts/` にファイルが無ければコピー、あればスキップ。
4. `upgrade` コマンドは強制的にコピーし直す。
5. CLI ドキュメントおよび `.sdd/README.md` が `/sdd-highway` を案内し、ユーザーは要件定義完了後に新プロンプトを活用。
6. `/sdd-requirements` 完了メッセージが高速ルートの活用を提案することで、ユーザーが次のステップを明確に把握。

# エラーハンドリング

- 既存 `init` / `upgrade` の例外処理を踏襲。`fs-extra` 操作で例外が発生した場合はトップレベルでキャッチされ、CLI がエラーを表示して終了する。
- 新規テンプレート追加では特別なエラーチェックは不要。ただしファイル欠如やパス設定ミスがないようテンプレート配置とテストで検証する。

# 既存コード統合

- 既存 `init` / `upgrade` コードへの直接的な変更は不要だが、テスト (`test/init.test.js`) の期待値更新が必要。
- ドキュメント (`README.md`, `README.ja.md`, `INTRODUCTION.md`, `INTRODUCTION.ja.md`, `.sdd/README.md`) に `/sdd-highway` を追加。
- `.sdd/description.md` テンプレートや関連ガイドに変更が必要か確認し、必要なら同期更新。
- `/sdd-requirements` 完了メッセージテンプレート（英語・日本語双方）へ高速ルート案内を追加。
