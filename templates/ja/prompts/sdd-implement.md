# 実装

## 準備
1. `.sdd/target-spec.txt` からspec名を取得
2. `.sdd/specs/[spec名]/` の存在確認
3. ステアリング読込

## 実行
1. spec文書読込:
   - requirements.md
   - design.md
   - tasks.md

2. タスク順次実行:
   - テスト先行 (RED)
   - 最小実装 (GREEN)
   - リファクタリング (REFACTOR)
   - tasks.md更新: `- [x]`

3. 完了:
   - テスト成功確認
   - ドキュメント更新
   - 「完了。アーカイブするには `/sdd-archive` を実行してください。」
