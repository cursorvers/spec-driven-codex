# タスク分解

## 準備
1. `.sdd/target-spec.txt` からspec名を取得
2. `.sdd/specs/[spec名]/` の存在確認
   不在時: 利用可能なspecを表示して案内
3. ステアリング読込:
   - `.sdd/steering/product.md`
   - `.sdd/steering/tech.md`
   - `.sdd/steering/structure.md`

## 実行
1. 読込:
   - `.sdd/specs/[spec名]/requirements.md`
   - `.sdd/specs/[spec名]/design.md`

2. `.sdd/specs/[spec名]/tasks.md` 作成:
   - 1-3時間単位のタスクに分解
   - 順序: データモデル → ビジネスロジック → インターフェース → テスト
   - design.md対応を明記
   - チェックボックス形式: `- [ ] タスク内容`

3. 完了:
   「タスクリスト完了。実装を開始するには `/sdd-implement` を実行してください。」
