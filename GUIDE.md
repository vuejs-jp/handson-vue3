# Vue3.x ハンズオン執筆ガイド

本ドキュメントは、本ハンズオンを執筆する人（コントリビューター）のためのガイドです。どう書いたらいいか迷った時に参考にしてください。また、ガイドにないことで悩んだら [新規 Issue を作成](https://github.com/vuejs-jp/handson-vue3-examples/issues/new) してご相談ください。

## 主題と関係が薄い話題について
JavaScript のビルトインクラスや正規表現など、主題と関係が薄い話題を書く時は、本文と区別が付きやすいように対応します。

- 文章で説明したいとき
    - 適切なレベルで見出しを付け、冒頭に「参考：」を記載します。
        ```md
        ### 本文用の見出し1
        本文があります。本文があります。本文があります。
        
        ### 参考：正規表現について
        正規表現とは、正規な表現のことです。説明つらつら。
        
        ### 本文用の見出し2
        本文があります。本文があります。本文があります。
        ```
- 外部リンクを表示したいとき
    - 引用 `> ` でリンクを表現します。
        ```md
        本文があります。
        
        > [String() に関する詳細](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/String)
        
        本文があります。
        ```

## 外部リンク先について
- 原則として、リンク先は公式ドキュメントとします
- 例えば、Vue.js 本体に関しては Vue.js 公式ドキュメント（[V3](https://v3.ja.vuejs.org/guide/introduction.html) 、 [V2](https://jp.vuejs.org/v2/guide/)）にリンクします
- HTML、CSS、JavaScript の仕様に関しては　[MDN Web Docs](https://developer.mozilla.org/ja/docs/Web) にリンクします

## 改行について
マークダウンでは、原則では改行されないためひとつの文章内では改行させない。改行したい場合は明示的に空行を入れて改行させるようにする

## 文章の校正( textlint )について

ドキュメントは、 [textlint](https://github.com/textlint/textlint) を使って校正を行います。校正のチェックルールは、Vue.js 日本ユーザーグループが翻訳プロジェクト等で利用している [プリセット](https://github.com/vuejs-jp/textlint-rule-preset-vuejs-jp) を参照しています。

### Pull Request 時の自動チェック

Pull Request を発行すると、GitHub Actions によって自動的に textlint によるルール評価が行われます。ルールに合わない問題が見つかった場合は、Pull Request のステータスチェックがエラー表示になるので、対応する PR の `Checks` タブで GitHub Actions のログから `Run textlint` の詳細を展開してエラー内容を確認してください。

### ローカルでのチェック方法

Pull Request で textlint のエラーが出た場合や、PR 前に事前にチェックをしたい場合は、ローカルで以下のコマンドを実行して確認することができます。

```bash
npm run textlint {チェックしたいファイル名}
```

エラーが無い場合は何も表示されませんが、エラーが見つかった場合はログに問題の箇所と内容が表示されるので、ログに従って修正してください。

```bash
✓ vuejs-jp/ja-space-between-half-and-full-width: 原則として、全角文字と半角文字の間にスペースを入れます。
/Users/miyake/repos/handson-vue3-examples/GUIDE.md:45:22
                              v
    44. 
    45. Pull Request でtextlintのエラーが出た場合や、PR 前に事前にチェックをしたい場合は、ローカルで以下のコマンドを実行して確認することができます。
    46. 
```
