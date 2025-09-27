# 設計

## 準備
1. `.sdd/target-spec.txt` からspec名を取得
2. `.sdd/specs/[spec名]/` の存在確認
   不在時: 利用可能なspecを表示して案内
3. ステアリング読込:
   - `.sdd/steering/product.md`
   - `.sdd/steering/tech.md`
   - `.sdd/steering/structure.md`

## 実行
1. `.sdd/specs/[spec名]/requirements.md` 読込
   不在時: 「要件定義が必要です。/sdd-requirements を先に実行してください」

2. `.sdd/specs/[spec名]/design.md` 作成:
   - アーキテクチャ統合方法
   - 主要コンポーネント（責務・I/O・依存）
   - データモデル
   - 処理フロー
   - エラーハンドリング
   - 既存コード統合（変更/新規ファイル）

3. 完了:
   「設計書完了。内容を確認して、次は `/sdd-tasks` を実行して実装タスクを作成してください」
