---
title: テンプレート設定
description: スターター導入時に変更するファイルと設定の一覧です。
publishedAt: 2026-08-30
updatedAt: 2026-08-30
tags:
  - 設定
  - リファレンス
sidebar:
  order: 1
---

プロジェクト固有の選択肢は、見つけやすい少数のファイルにまとめています。生成結果やパッケージ内部を上書きせず、以下のファイルを変更してください。

## プロジェクト設定

| 設定 | 場所 | 反映先 |
| --- | --- | --- |
| プロジェクト名 | `astro.config.mjs` | ヘッダー、メタデータ、ブラウザータイトル |
| リポジトリURL | `astro.config.mjs` | GitHubリンク、ページ編集リンク |
| サイトURL | `astro.config.mjs` | 正規URLとサイトマップのURL |
| アクセント色相 | `src/styles/theme.css` | ライト・ダーク両モードのアクセント配色 |
| レイアウト規則 | `src/styles/site.css` | 文字組み、余白、ナビゲーション、ランディングページ |
| ナビゲーション | `astro.config.mjs` | サイドバーのグループとラベル |
| ページメタデータ | `src/content.config.ts` | 公開日、更新日、タグ |

## 言語ごとの配置

英語はルート言語、日本語は `ja` ディレクトリを使います。翻訳されたページは、言語部分より後ろのパスを揃えます。

```text
/guides/getting-started/     → src/content/docs/guides/getting-started.md
/ja/guides/getting-started/  → src/content/docs/ja/guides/getting-started.md
```

Starlightがインターフェースの日本語表示と、言語選択における対応ページの接続を行います。

## シンタックスハイライト

コードブロックでは、次のExpressive Code設定を使用します。

```js title="astro.config.mjs"
expressiveCode: {
  themes: ['slack-ochin', 'tokyo-night'],
  useStarlightUiThemeColors: true,
  styleOverrides: { borderRadius: '0.75rem' },
}
```

ライトモードでは `slack-ochin`、ダークモードでは `tokyo-night` を使います。StarlightのUIカラーを利用することで、フレームや操作ボタンがページ全体になじみます。

## ページのfrontmatter

すべてのページにタイトルと、検索結果向けの簡潔な説明を書きます。公開日、更新日、タグ、サイドバーの表示順は任意です。

```yaml
---
title: CLIをインストールする
description: macOS、Linux、WindowsにCLIをインストールします。
publishedAt: 2026-08-20
updatedAt: 2026-08-28
tags:
  - インストール
  - CLI
sidebar:
  order: 2
---
```

`publishedAt` と `updatedAt` にはISO形式の日付を指定します。日付とタグは画面に表示されないページメタデータとして出力されるため、通常のドキュメントページに日付やタグの行は追加されません。

ヘッダーの「タグ」から `/ja/tags/` を開くと、日本語のタイトル、説明、タグを検索できます。英語コンテンツは `/tags/` で別に検索され、2言語の一覧が混ざることはありません。タグは短くし、同じ言語内で表記揺れが生まれないように再利用してください。

`template: splash` は、ランディングページのように横幅が必要なページだけに使います。通常のドキュメントページは、左右のナビゲーションを利用できる標準レイアウトのままにします。
