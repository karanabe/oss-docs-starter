---
title: テンプレート設定
description: スターター導入時に変更するファイルと設定の一覧です。
publishedAt: 2026-08-30
updatedAt: 2026-09-06
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

ページ内の目次には、日英ともにH2からH4までの見出しを表示します。表示する範囲は、`astro.config.mjs` 内のStarlight設定にある `tableOfContents.minHeadingLevel` と `tableOfContents.maxHeadingLevel` で指定します。モバイルの目次にも同じ見出しを表示します。

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

`description` は、ヒーローのないページでタイトルの下に表示されます。本文に入る前に内容が伝わる短い説明にしてください。

`publishedAt` と `updatedAt` にはISO形式の日付を指定します。通常のページでは、日付やタグがある場合に説明の下へ小さなメタデータ行を表示します。日付は `updatedAt` を優先し、未指定の場合は `publishedAt` を使います。ページの言語に合わせて表示し、タイムゾーンによる日付のずれを避けるためUTCで整形します。

タグは3件まで直接表示します。4件以上は件数の表示に折りたたみ、ポインターやキーボードで開いて確認できます。日付とタグがないページやsplashページでは、メタデータ行を表示しません。日付とタグはHTMLのメタデータにも出力します。

ヘッダーの「タグ」から `/ja/tags/` を開くと、日本語のタイトル、説明、タグを検索できます。英語コンテンツは `/tags/` で別に検索され、2言語の一覧が混ざることはありません。タグは短くし、同じ言語内で表記揺れが生まれないように再利用してください。

`template: splash` は、ランディングページのように横幅が必要なページだけに使います。通常のドキュメントページは、左右のナビゲーションを利用できる標準レイアウトのままにします。

## 文字組みと補足欄

英日で共通のフォント指定を使い、Inter Variable、Inter、OSのUIフォント、Segoe UI Variable、Segoe UIの順に探します。日本語の本文はブラウザーとOSのフォールバックに任せます。太さも英日共通で、本文は通常のウェイト、記事の主要な見出しは `650` を使います。

引用は少し小さい斜体と、ごく薄い無彩色の背景で表示します。日本語の引用サイズは `--sl-text-sm` です。Source Han Code JPがインストールされている場合、引用内の日本語にはローカルの通常体・太字体を選び、ブラウザーによる斜体の合成を許可します。このフォントのItalic書体では日本語の字形が直立したままになるためです。それ以外の文字と、このフォントがない環境では共通のフォント指定を使います。この例外は引用内に限られ、フォントのダウンロードは行いません。

コードには独立した等幅フォント指定を使い、SFMono-Regular、Consolas、Liberation Mono、Menlo、`monospace` の順に探します。そのため、コードを含む要素を開発者ツールで調べるとConsolasが表示される場合があります。実際の書体はインストール済みフォント、ブラウザー設定、調査対象のテキストに依存します。サイト側でフォントを同梱・ダウンロードしません。
