# ステアリング（プロジェクト理解）

## 準備
`.sdd/steering/` の既存ファイル確認:
- product.md、tech.md、structure.md
- 存在時: 更新モード / 不在時: 新規作成モード

## 分析
読込対象:
- 設定ファイル (package.json, requirements.txt, Cargo.toml, go.mod等)
- README.md、AGENTS.md、CHANGELOG.md、docs/
- ディレクトリ構造とソースファイル配置

原則:
- セキュリティ情報を含めない
- 事実のみ記載
- 既存内容は保持（更新時）

## 生成

### `.sdd/steering/product.md`
- プロダクト概要
- 主要機能
- 対象ユースケース
- 価値提案

### `.sdd/steering/tech.md`
- アーキテクチャ
- 使用技術（言語、フレームワーク、依存関係）
- 開発環境（ツール、コマンド）
- 環境変数

### `.sdd/steering/structure.md`
- ルートディレクトリ構成
- コード構成パターン
- ファイル命名規則
- 主要な設計原則

## 完了
「ステアリング完了。プロジェクトの基本情報を `.sdd/` に保存しました。
次は `.sdd/description.md` に実現したい機能や開発の内容を書いてください。
その後、`/sdd-requirements` で仕様駆動開発プロセスを開始できます。」
