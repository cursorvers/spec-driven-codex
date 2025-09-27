---
allowed-tools: Read(*), Write(CHANGELOG.md), Bash(git log:*), Bash(git diff:*), Bash(date:*)
description: Automatically update CHANGELOG.md based on version.txt and recent changes
---

# CHANGELOG 自動更新

version.txt から新しいバージョン番号を読み取り、git履歴から変更内容を分析してCHANGELOGに追加します。

## 処理内容

1. **バージョン情報の取得**
   - `scripts/version.txt` から新バージョンを読み取る
   - 現在日付を取得（YYYY-MM-DD形式）

2. **変更内容の分析**
   - 前回のタグから現在までのコミットログを分析
   - git diffから主要な変更ファイルを特定
   - 変更をカテゴリごとに分類

3. **CHANGELOGエントリの生成**
   - Keep a Changelog形式に従う
   - Added / Changed / Fixed / Removed などのセクション構成
   - 技術的な変更は Technical Notes に記載

4. **CHANGELOGファイルの更新**
   - 既存のCHANGELOGを読み込み
   - 新エントリを適切な位置に挿入（## の後、既存エントリの前）
   - 重複チェック（同じバージョンが既にある場合はスキップ）

## コンテキスト情報
- 現在のバージョン: !`cat scripts/version.txt`
- 今日の日付: !`date +%Y-%m-%d`
- 最新のタグ: !`git describe --tags --abbrev=0 2>/dev/null || echo "no tags"`
- 最近のコミット（詳細）: !`git log --pretty=format:"%h %s (%an)" -20`
- package.jsonの変更: !`git diff HEAD~10 package.json 2>/dev/null | head -50`
- ソースコードの主要変更: !`git diff --stat HEAD~10 2>/dev/null | head -30`

## 変更カテゴリの判定基準

- **Added**: 新機能、新コマンド、新ファイル
- **Changed**: 既存機能の変更、Breaking Changeは明記
- **Fixed**: バグ修正、エラー修正
- **Removed**: 削除された機能、非推奨機能の削除
- **Technical Notes**: 内部実装の変更、パフォーマンス改善、リファクタリング

## 出力フォーマット
```markdown
## [バージョン] - YYYY-MM-DD

### セクション名
- 変更内容の説明（簡潔かつ具体的に）
- Breaking Changeの場合は **Breaking:** を先頭に付ける

### Technical Notes
- 技術的な詳細（必要な場合のみ）
