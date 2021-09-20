# v-for を使用した要素の繰り返し

## 繰り返しで DOM 表示を制御する v-for

新しい商品が入荷したので、複数の商品を販売することになりました。商品を複数表示してみましょう。

## v-for 構文

Vue.js では、配列からデータを取り出し、繰り返しで表示する、`v-for` というディレクティブが用意されています。

`v-for` ディレクティブは、 `task in tasks` のような構文で書きます。 `tasks` はデータを取り出す元の配列で、あらかじめ用意した配列の名前を指定します。 `task` は配列から取り出した 1 つ 1 つの値にアクセスするエイリアスで、任意の名前を指定します。

::: v-pre
以下の例では `data` 部分の `tasks` からデータを取り出し `{{ task }}` で表示しています。
:::

```html
<div id="app">
  <ul>
    <li v-for="task in tasks">{{ task }}</li>
  </ul>
</div>
```

```js
var app = new Vue({
  el: '#app',
  data() {
    return {
      tasks: [
        'タスクA',
        'タスクB',
        'タスクC',
      ]
    }
  }
})
```

出力例
```
・タスクA
・タスクB
・タスクC
```

![v-for 構文の出力例](./images/v_for_result1.png)

## 複数の商品をレンダリング
プロジェクトのファイルを書き換えて、複数の商品をレンダリングしていきましょう。`App.vue` ファイルを次のように変更します。

まずは、 data に表示したい商品を設定します。 `item` から `items` に変更し商品のオブジェクトを持つ配列にします。

```
<script>
export default {
  name: 'App',
  data() {
    return {
      item: {
        name: 'アボカドディップバケット',
        description:
          '刻んだ野菜をアボカドと混ぜてディップに。こんがり焼いたバゲットとお召し上がりください。',
        price: 480,
        image: '/images/item1.jpg'
      }
    }
  }
}
</script>
```

のブロックを以下に変更します。

```
<script>
export default {
  name: 'App',
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'アボカドディップバケット',
          description:
            '刻んだ野菜をアボカドと混ぜてディップに。こんがり焼いたバゲットとお召し上がりください。',
          price: 480,
          image: '/images/item1.jpg'
        },
        {
          id: 2,
          name: 'あの日夢見たホットケーキ',
          description:
            '子供のころに食べたかった、あのホットケーキを再現しました。素朴でどこか懐かしい味をどうぞ。',
          price: 1180,
          image: '/images/item2.jpg'
        },
        {
          id: 3,
          name: 'HOP WTR',
          description:
            'ロサンゼルス生まれのスパークリングウォーター。ノンカロリー、ノンアルコールの新感覚飲料です。',
          price: 320,
          image: '/images/item3.jpg'
        },
        {
          id: 4,
          name: 'チーズフレンチフライ',
          description:
            'イタリア産チーズをたっぷりかけたアツアツのフレンチフライ。みんな大好きな一品です。',
          price: 670,
          image: '/images/item4.jpg'
        }
      ]
    }
  }
}
</script>
```

次に、 `v-for` を用いて、各商品の「名前 (name)」、「説明 (description)」、「価格 (price)」、「画像 (image)」を繰り返し表示します。

同時に指定している `key` 属性は、 `v-for` で取り出した各要素を一意（ユニーク）にするために推奨されているものです。一意にすることで、 Vue.js が要素の再利用や並び替えをする手助けになります。 詳細は Vue.js ドキュメントガイドを参照ください。  [Vue.jsドキュメントガイド 状態の維持](https://v3.ja.vuejs.org/guide/list.html#%E7%8A%B6%E6%85%8B%E3%81%AE%E7%B6%AD%E6%8C%81 "Vue.jsドキュメントガイド 状態の維持")

```diff
  <main class="main">
-    <div class="item">
-      <div class="thumbnail">
-        <img :src="item.image" alt="" />
-      </div>
-      <div class="description">
-        <h2>{{ item.name }}</h2>
-        <p>{{ item.description }}</p>
-        <span>¥<span class="price">{{ item.price }}</span></span>
-      </div>
-    </div>
+    <div v-for="item in items" :key="item.id">
+      <div class="item">
+         <div class="thumbnail">
+            <img :src="item.image" alt="" />
+         </div>
+      </div>
+      <div class="description">
+        <h2>{{ item.name }}</h2>
+        <p>{{ item.description }}</p>
+        <span>¥<span class="price">{{ item.price }}</span></span>
+      </div>
+    </div>
  </main>
```

![複数の商品をレンダリングの出力例](./images/v_for_result2.png)

これで、商品を複数レンダリングできました。

---

[Previous](rendering.md) | [Next](v-if.md)

