# data を定義し template で商品を描画する

## 画像ファイルの配置
まず、ハンズオンで使う商品の画像を用意しましょう。ハンズオンのファイル([vue3-lab-handson-images.zip](./vue3-lab-handson-images.zip "vue3-lab-handson.zip")) をダウンロード及び解凍し、`iamges` ディレクトリを `public` ディレクトリ配下に配置します。

## moustache構文 
Vue.js では、`{{` ~ `}}` のような `moustache` 構文を使ってデータを描画することが可能です。以下の例では data 部分の message を表示しています。ちなみに、 `moustache` とは口髭をさす英語です。

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

## コンポーネントへの書き換え
では、プロジェクトのファイルを書き換えて、商品を描画していきましょう。`App.vue` ファイルを次のように変更します。

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
+        name: "アボガドディップバケット",
+        description: "刻んだ野菜をアボカドと混ぜてディップに。こんがり焼いたバゲットとお召し上がりください。",
+        price: 480,
+        image: "/images/item1.jpg"
+      }
+    }
+  }
+}
</script>
```

これで、商品を 1 つ表示することができました。


[Previous](step03.md) | [Next](step05.md)

