# v-for で繰り返しを表現する（商品複数）

## 繰り返しで DOM 表示を制御する v-for

新しい商品が入荷したので、複数の商品を販売することになりました。
商品を複数表示するようにしてみましょう。

## v-for 構文 
Vue.js では、配列からデータを取り出してデータを繰り返しで表示する、`v-for` というディレクティブが用意されています。以下の例では data 部分の items からデータが取り出され表示されます。

```html
<div id="app">
  <ol>
    <li v-for="item in items">
  </ol>
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    return {
      items [
        'itemA',
        'itemB',
        'itemC',
      ]
    }
  }
})
```

出力例
```
itemA
itemB
itemC
```

## 複数の商品をレンダリング
プロジェクトのファイルを書き換えて、複数の商品をレンダリングしていきましょう。`App.vue` ファイルを次のように変更します。

まずは、 data に表示したい商品を設定します。

```diff
<script>
export default {
  name: 'App',
  data() {
    return {
-    item: {
-       name: 'アボガドディップバケット',
-       description:
-         '刻んだ野菜をアボカドと混ぜてディップに。こんがり焼いたバゲットとお召し上がりください。',
-       price: 480,
-       image: '/images/item1.jpg'
-      }
+     items: [
+       {
+         id: 1,
+         name: 'アボガドディップバケット',
+         description:
+           '刻んだ野菜をアボカドと混ぜてディップに。こんがり焼いたバゲットとお召し上がりください。',
+         price: 480,
+         image: '/images/item1.jpg'
+       },
+       {
+         id: 2,
+         name: 'あの日夢見たホットケーキ',
+         description:
+           '子供のころに食べたかった、あのホットケーキを再現しました。素朴でどこか懐かしい味をどうぞ。',
+         price: 1180,
+         image: '/images/item2.jpg'
+       },
+       {
+         id: 3,
+         name: 'HOP WTR',
+         description:
+           'ロサンゼルス生まれのスパークリングウォーター。ノンカロリー、ノンアルコールの新感覚飲料です。',
+         price: 320,
+         image: '/images/item3.jpg'
+       },
+       {
+         id: 4,
+         name: 'チーズフレンチフライ',
+         description:
+           'イタリア産チーズをたっぷりかけたアツアツのフレンチフライ。みんな大好きな一品です。',
+         price: 670,
+         image: '/images/item4.jpg'
+       }
+     ]
    }
  }
}
</script>
```

次に、 v-for を使い各商品の名前 name 、 説明 description 、価格 price を表示します。
v-for ディレクティブを template タグに使っているのが紛らわしいですが、 HTML のコンテンツテンプレート要素で、 Vue.js における template とは別物です。

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
+    <template v-for="item in items" :key="item.id">
+      <div class="item">
+         <div class="thumbnail">
+            <img :src="item.image" alt="" />
+      </div>
+      <div class="description">
+        <h2>{{ item.name }}</h2>
+        <p>{{ item.description }}</p>
+        <span>¥<span class="price">{{ item.price }}</span></span>
+      </div>
+    </template>
  </main>
```

これで、商品を 複数レンダリングすることができました。

---

[Previous](step04.md) | [Next](v-if.md)

