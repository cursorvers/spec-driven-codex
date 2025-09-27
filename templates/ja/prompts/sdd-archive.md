# アーカイブ

## 確認
1. `.sdd/target-spec.txt` からspec名取得
2. `.sdd/specs/[spec名]/tasks.md` の全タスクが [x] か確認
   未完了時: 「未完了タスクあり。完了後に再実行してください」

## 実行
1. `.sdd/specs/archives/` 作成（不在時）
2. `.sdd/specs/[spec名]/` → `.sdd/specs/archives/YYYYMMDD_[spec名]/` 移動
3. `.sdd/target-spec.txt` クリア

## 完了
「spec '[spec名]' をアーカイブしました。
保存先：.sdd/specs/archives/YYYYMMDD_[spec名]/

次の機能を開発する場合：
1. `.sdd/description.md` を更新
2. `/sdd-requirements` を実行」
