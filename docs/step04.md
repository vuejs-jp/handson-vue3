# data を定義し、商品をレンダリングする

## 画像ファイルの配置
まず、ハンズオンで使う商品の画像を用意しましょう。ハンズオンのファイル([vue3-lab-handson-images.zip](./vue3-lab-handson-images.zip "vue3-lab-handson.zip")) をダウンロード及び解凍し、`images` ディレクトリを丸ごと `public` ディレクトリ配下に配置します。

## Mustache 構文 
Vue.js では、`{{  }}` のような `Mustache` 構文を使ってテキストをレンダリングできます。以下の例では data 部分の message を表示しています。message の内容が変更されると、それに応じて表示も更新されます。

```html
<div id="app">
  {{ message }}
</div>
```

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Welecome Vue Handson!'
  }
})
```

出力例
```
Welecome Vue Handson!
```

ちなみに mustache とは口髭を指す英語で、二重中括弧 `{{ }}` が口髭のように見えることから命名されました。

## 商品をレンダリング
プロジェクトのファイルを書き換えて、商品をレンダリングしていきましょう。`App.vue` ファイルを次のように変更します。

```diff
<template>
-  <img alt="Vue logo" src="./assets/logo.png">
-  <HelloWorld msg="Welcome to Your Vue.js App"/>
+  <header class="header">
+    <img src="/images/logo.svg" alt="" />
+    <h1>Vue.js ハンズオン</h1>
+  </header>
+  <main class="main">
+    <div class="item">
+      <div class="thumbnail">
+        <img :src="item.image" alt="" />
+      </div>
+      <div class="description">
+        <h2>{{ item.name }}</h2>
+        <p>{{ item.description }}</p>
+        <span>¥<span class="price">{{ item.price }}</span></span>
+     </div>
+   </div>
+  </main>
</template>
```

```diff
<script>
- import HelloWorld from './components/HelloWorld.vue'
 export default {
  name: "App",
+  data(){
+    return {
+      item: {
+        name: "アボカドディップバケット",
+        description: "刻んだ野菜をアボカドと混ぜてディップに。こんがり焼いたバゲットとお召し上がりください。",
+        price: 480,
+        image: "/images/item1.jpg"
+      }
+    }
+  }
+}
</script>
```

見た目を設定するために `</script>` タグの下に、以下の style タグを追加しましょう。
```html
<style>
.header {
  display: flex;
  align-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
}

.header > img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.header > h1 {
  font-size: 80px;
  font-weight: bold;
  line-height: 80px;
  margin-top: 0;
  margin-bottom: 0;
}

.main {
  display: grid;
  grid-template-columns: 3fr 3fr 3fr 3fr;
  column-gap: 24px;
  row-gap: 24px;
}

.item {
  padding: 10px;
  cursor: pointer;
}

.item:hover {
  transition: 0.2s transform ease-out;
  transform: scale(1.05);
}

.item > div.thumbnail > img {
  width: 100%;
  height: calc(width);
  object-fit: cover;
}

.item > div.description {
  text-align: left;
  margin-top: 20px;
}

.item > div.description > p {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 18px;
  line-height: 25px;
}

.item > div.description > span {
  display: block;
  margin-top: 10px;
  font-size: 20px;
}

.item > div.description > span > .price {
  font-size: 28px;
  font-weight: bold;
}
</style>
```

これで、商品を 1 つレンダリングすることができました。


[Previous](step03.md) | [Next](step05.md)

