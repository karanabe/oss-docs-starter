---
title: テンプレート設定
description: スターター導入時に変更するファイルと設定の一覧です。
publishedAt: 2026-08-30
updatedAt: 2026-09-13
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
| Notes機能 | `astro.config.mjs` | Notesのヘッダーナビゲーション、ルート、検索対象 |
| ページメタデータ | `src/content.config.ts` | 公開日、更新日、タグ |

ページ内の目次には、日英ともにH2からH4までの見出しを表示します。表示する範囲は、`astro.config.mjs` 内のStarlight設定にある `tableOfContents.minHeadingLevel` と `tableOfContents.maxHeadingLevel` で指定します。モバイルの目次にも同じ見出しを表示します。

## 言語ごとの配置

英語はルート言語、日本語は `ja` ディレクトリを使います。翻訳されたページは、言語部分より後ろのパスを揃えます。

```text
/guides/getting-started/     → src/content/docs/guides/getting-started.md
/ja/guides/getting-started/  → src/content/docs/ja/guides/getting-started.md
```

Starlightがインターフェースの日本語表示と、言語選択における対応ページの接続を行います。

## Notes

Notesは、日付付きの近況、判断、実験を残すための任意機能です。通常のMarkdownページを `src/content/docs/notes/YYYY-MM/` に整理し、対応する日本語ファイルを `src/content/docs/ja/notes/YYYY-MM/` に置きます。各言語のランディングページで概要を説明し、公開済みメモを月ごとに新しい順で表示します。Notesはヘッダーから開き、ドキュメントの左サイドバーには表示しません。

`astro.config.mjs` の `project.features` オブジェクトで、機能の有効・無効を切り替えます。

```js title="astro.config.mjs"
const project = {
  // プロジェクト情報...
  features: {
    notes: true,
  },
};
```

`notes` を `false` にすると、Notesのヘッダーリンク、コンテンツルート、専用タグ検索、Pagefindの対象が開発・本番ビルドから除外されます。ソースファイルはそのまま残るため、`true` に戻すだけで再び有効にできます。

メモを追加するには、11組の英日サンプルのいずれか、例えば `notes/2026-09/welcome.md` を適切な `YYYY-MM` ディレクトリへコピーし、frontmatterと本文を更新します。日本語ページも同じ相対パスに作成してください。ファイル名に日付を含める必要はありません。Notes一覧の並びと月分けは、ソースディレクトリではなく `publishedAt` を基準に決まります。公開URLからソースの月を省きたい場合は任意の `slug` を指定し、公開済みメモの意味を変更した場合は `updatedAt` を追加します。

各Notesランディングページの右サイドバーには、コンパクトな `YYYY-MM (件数)` 形式で公開月を表示します。月を展開すると、その月の全記事への直接リンクを確認できます。1言語のメモが11件以上になると、メイン一覧の下に「前へ」と「次へ」が現れ、現在位置をURLの `?page=` パラメーターに保存します。JavaScriptが無効なブラウザーには全件を表示します。件数を変更する場合は、`src/components/NotesIndex.astro` の `NOTES_PER_PAGE` を編集してください。

ドキュメントのタグは `/tags/` と `/ja/tags/` で検索し、Notesは結果から除外します。Notesのタグは `/notes/tags/` と `/ja/notes/tags/` で検索し、ガイドとリファレンスを結果から除外します。各Notesランディングページから、対応する専用タグ検索を開けます。

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

ヘッダーの「タグ」から `/ja/tags/` を開くと、日本語ドキュメントのタイトル、説明、タグを検索できます。英語ドキュメントは `/tags/` で別に検索され、言語やNotesの一覧が混ざることはありません。タグは短くし、同じ言語内で表記揺れが生まれないように再利用してください。

モバイルでは、ドキュメント、任意のNotes、タグへのリンクをナビゲーションメニュー内に表示します。サイドバーのないページにも、テーマと言語の切り替えを含むコンパクトなメニューがあります。

`template: splash` は、ランディングページのように横幅が必要なページだけに使います。通常のドキュメントページは、左右のナビゲーションを利用できる標準レイアウトのままにします。

## 文字組みと補足欄

`src/styles/site.css` は、プロジェクトドキュメントと解説記事に共通の見た目を管理します。日本語の見出しには専用の字間と行高を設定し、ローカルのシステムフォントを使います。`hero.title` に任意で `<wbr>` を入れると、画面幅に応じて折り返せる自然な文節の区切りを指定できます。

英日で共通のフォント指定を使い、Inter Variable、Inter、OSのUIフォント、Segoe UI Variable、Segoe UIの順に探します。日本語の本文はブラウザーとOSのフォールバックに任せます。太さも英日共通で、本文は通常のウェイト、記事の主要な見出しは `650` を使います。

引用は少し小さい斜体と、ごく薄い無彩色の背景で表示します。日本語の引用サイズは `--sl-text-sm` です。Source Han Code JPがインストールされている場合、引用内の日本語にはローカルの通常体・太字体を選び、ブラウザーによる斜体の合成を許可します。このフォントのItalic書体では日本語の字形が直立したままになるためです。それ以外の文字と、このフォントがない環境では共通のフォント指定を使います。この例外は引用内に限られ、フォントのダウンロードは行いません。

コードには独立した等幅フォント指定を使い、SFMono-Regular、Consolas、Liberation Mono、Menlo、`monospace` の順に探します。そのため、コードを含む要素を開発者ツールで調べるとConsolasが表示される場合があります。実際の書体はインストール済みフォント、ブラウザー設定、調査対象のテキストに依存します。サイト側でフォントを同梱・ダウンロードしません。

補足欄は角丸と淡い背景を共通にしています。注記とヒントにはプロジェクトのアクセント色を使い、注意と危険には警告の色・ラベル・アイコンを維持します。アクセント色は `src/styles/theme.css` の `--project-accent-hue` で変更してください。
