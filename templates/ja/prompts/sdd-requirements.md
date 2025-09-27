# 要件定義

## 準備
1. 必須ファイル確認:
   - `.sdd/description.md`
   - `.sdd/steering/product.md`
   - `.sdd/steering/tech.md`
   - `.sdd/steering/structure.md`

2. spec設定:
   - `.sdd/target-spec.txt` 確認
   - 不在時: description.mdからspec名生成、ディレクトリ作成、target-spec.txt記録
   - 存在時: spec名のディレクトリ確認

3. ステアリング読込

## 実行
`.sdd/specs/[spec名]/requirements.md` (タイムスタンプ無し) を作成し、以下を含む:
- 機能概要（description.md基準）
- ユーザーストーリー
- 機能要件と受入基準
- 非機能要件（必要時）

完了:
「要件定義完了。内容を確認したら `/sdd-design` へ進むか、設計から実装まで一気に進めたい場合は `/sdd-highway` を実行してください」
