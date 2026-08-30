---
title: はじめに
description: ドキュメントスターターをOSSプロジェクト向けに設定します。
publishedAt: 2026-08-30
updatedAt: 2026-08-30
tags:
  - セットアップ
  - 初心者
sidebar:
  order: 1
---

このスターターは意図的に小さく保たれています。プロジェクト情報とアクセントカラーを設定してから、読者が必要とする導線に合わせてサンプルを置き換えてください。

:::note[公開前の確認]
リポジトリURLとプロジェクト名はプレースホルダーです。デプロイ前に必ず変更してください。
:::

## 依存関係をインストールする

このプロジェクトは [pnpm](https://pnpm.io/) と、Astroがサポートする現行のNode.jsを使用します。

```sh title="ターミナル"
pnpm install
pnpm dev
```

開発サーバーはバックグラウンドで動作します。状態確認、ログ表示、停止には `pnpm dev:status`、`pnpm dev:logs`、`pnpm dev:stop` を使います。

## プロジェクト情報を設定する

`astro.config.mjs` を開き、`project` オブジェクトの値を変更します。

```js title="astro.config.mjs"
const project = {
  title: 'Acme CLI Docs',
  description: 'Command-line tools for dependable release automation.',
  repository: 'https://github.com/acme/acme-cli',
  site: 'https://docs.acme.example',
};
```

これらの値は、ブラウザーのタイトル、説明メタデータ、正規URL、サイトマップ、GitHubリンク、編集リンクに使われます。

## アクセントカラーを選ぶ

`src/styles/theme.css` の先頭付近にある `--project-accent-hue` だけを変更します。

```css title="src/styles/theme.css"
:root {
  --project-accent-hue: 215; /* blue */
}
```

ライト・ダーク両方の配色、ナビゲーションのハイライト、リンク、ランディングページの装飾が、この色相から生成されます。

## サンプルコンテンツを置き換える

英語はサイトのルートで公開されます。日本語は `src/content/docs/ja/` 内に同じ相対パスで配置します。

```text title="対応する翻訳ページ"
src/content/docs/guides/installation.md
src/content/docs/ja/guides/installation.md
```

通常のコンテンツには `.md`、StarlightやAstroのコンポーネントが必要なページには `.mdx` を使います。言語切り替えで対応ページを結べるよう、ファイル名を揃えてください。

## 公開前にビルドする

```sh title="ターミナル"
pnpm build
```

静的な出力は `dist/` に生成されます。本番ビルドでは、両言語の検索インデックスも作成されます。

:::tip[表示をまとめて確認する]
置き換える前に[コンポーネントとコードの表示サンプル](/ja/guides/showcase/)を開いてください。文字組み、余白、ナビゲーション、シンタックステーマ、よく使う記法を1ページで確認できます。
:::
