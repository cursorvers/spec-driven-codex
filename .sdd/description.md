# 実装したい機能

## 概要
`/sdd-highway` というコマンドを追加する。

これは、`/sdd-requirements` の後、`/sdd-design` と `/sdd-tasks` と `/sdd-implement` を一気に実行するものである。
これは、GPT-5-Codex の特性を活かし、細かい設計・タスク分解・実装については GPT-5-Codex に任せてしまい、ユーザーは要件定義に集中する、という使い方を想定している。
もしくは、要件定義が非常に明確で、設計・タスク分解・実装を一気に進めたい場合にも有用である。
`highway` という名前は、高速道路を一気に走り抜けるイメージから。

すでに `templates/en/prompts/sdd-highway.md` と `templates/ja/prompts/sdd-highway.md` は用意されている。

あとは、各種ドキュメント（README.md、README.ja.md、.sdd/README.md、INTRODUCTION.md）を更新し、`npx spec-driven-codex init` や `npx spec-driven-codex upgrade` で新しいプロンプトがインストールされるようにする。
