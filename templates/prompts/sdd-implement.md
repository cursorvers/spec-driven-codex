# 仕様駆動開発：実装

## 前提確認とspec特定
1. `.sdd/target-spec.txt` を読み込み、開発対象のspec名を取得
2. `.sdd/specs/[spec名]/` ディレクトリが存在するか確認
3. 存在しない場合：
   「spec '[spec名]' が見つかりません。

   利用可能なspec：
   [.sdd/specs/ 内のディレクトリ一覧（archivesを除く）]

   正しいspec名を `.sdd/target-spec.txt` に記載するか、
   新しい機能の場合は `.sdd/description.md` を更新して
   `/sdd-requirements` を実行してください」

## ステアリング情報の読み込み
以下を必ず読み込む：
1. `.sdd/steering/product.md`
2. `.sdd/steering/tech.md`
3. `.sdd/steering/structure.md`

## ステップ1：spec文書の読み込み
対象specディレクトリから以下を読み込み：
- requirements.md - 要件定義
- design.md - 設計書
- tasks.md - タスクリスト

## ステップ2：実装実行

tasks.md内の未完了タスク（[ ]のもの）を上から順番に実装：
1. 最初の未完了タスクを見つける
2. そのタスクを実装
3. 実装完了後、tasks.md内のチェックボックスを[x]に更新
4. 次の未完了タスクがあれば継続
5. すべて完了したら完了メッセージを表示

## ステップ3：実装後の処理
すべてのタスクが完了した場合：
「🎉 すべてのタスクが完了しました！
次のステップ：
- `/sdd-archive` でこの仕様をアーカイブ
- 新機能の場合は `.sdd/description.md` を更新して `/sdd-requirements` から開始」

未完了タスクが残っている場合：
「タスク[番号]の実装完了。残りタスク数：X個
続けて実装する場合は `/sdd-implement` を再実行してください」
