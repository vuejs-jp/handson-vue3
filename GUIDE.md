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
- 例えば、Vue.js 本体に関しては Vue.js 公式ドキュメント（ [V3](https://v3.ja.vuejs.org/guide/introduction.html) 、 [V2](https://jp.vuejs.org/v2/guide/) ）にリンクします
- HTML、CSS、JavaScript の仕様に関しては　[MDN Web Docs](https://developer.mozilla.org/ja/docs/Web) にリンクします
