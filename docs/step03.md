# Step 3 - ハンズオンの概要と準備

## 作成するもの
　このハンズオンでは、簡単な商品の一覧を表示し、購入する商品を選択できるプログラムを作成します。プログラムを作成する過程で、 Vue.js の基本を学ぶことができます。実際に動く物は <a href="hogehoge">こちら</a> から見れます。

   ![vue-app](images/sample.png)

## 作成の流れ
- 1 章 ハンズオンの概要と準備
- 2 章 コンポーネントへの書き換え
- 3 章 data を定義し template で商品を描画する
- 4 章 v-for で繰り返しを表現する（商品複数）
- 5 章 v-if を使用した表示・非表示の切り替え
- 6 章 methods で価格にカンマを入れる
- 7 章 @click でイベントを処理する（クラスの切り替え）

## Vue.js を使わない場合
　Vue.js でのハンズオンに入る前に Vue.js を使わないで実装した場合のプログラムを見てみましょう。実際に動く物は <a href="hogehoge">こちら</a> から確認できます。

index.html
```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
    <link rel="stylesheet" href="./style.css">
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div>
      <header class="header">
        <img src="./images/logo.svg" alt="" />
        <h1>Vue.js ハンズオン</h1>
      </header>
      <main class="main">
        <div class="item">
          <div class="thumbnail">
            <img src="./images/item1.jpg" alt="" />
          </div>
          <div class="description">
            <h2>アボガドディップバケット</h2>
            <p>
              刻んだ野菜をアボカドと混ぜてディップに。こんがり焼いたバゲットとお召し上がりください。
            </p>
            <span>￥<span class="price">480</span></span>
          </div>
        </div>
        <div class="item">
          <div class="thumbnail">
            <img src="./images/item2.jpg" alt="" />
          </div>
          <div class="description">
            <h2>あの日夢見たホットケーキ</h2>
            <p>
              子供のころに食べたかった、あのホットケーキを再現しました。素朴でどこか懐かしい味をどうぞ。
            </p>
            <span>￥<span class="price">1,180</span></span
            >
          </div>
        </div>
        <div class="item">
          <div class="thumbnail">
            <img src="./images/item3.jpg" alt="" />
          </div>
          <div class="description">
            <h2>HOP WTR</h2>
            <p>
              ロサンゼルス生まれのスパークリングウォーター。ノンカロリー、ノンアルコールの新感覚飲料です。
            </p>
            <span
              >￥<span class="price">320</span></span>
          </div>
        </div>
        <div class="item">
          <div class="thumbnail">
            <img src="./images/item4.jpg" alt="" />
          </div>
          <div class="description">
            <h2>チーズフレンチフライ</h2>
            <p>
              イタリア産チーズをたっぷりかけたアツアツのフレンチフライ。みんな大好きな一品です。
            </p>
            <span
              >￥<span class="price">670</span></span>
          </div>
        </div>
      </main>
    </div>
  </body>
</html>
```

style.css
```css
body {
  font-family: sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 90%;
  margin: 0 5%;
  text-align: center;
  color: #242424;
}

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

.item > div.description > h3, .item > div.description > p {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 18px;
  line-height: 25px;
}

.item > div.description > h3 {
  font-weight: bold;
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

.selected-item {
  background: #E3F2FD;
}
```

## 商品表示部分の説明
　簡単ですが、商品表示部分を説明します。  

`<div class="thumbnail">~</div>` の部分ではサムネイル画像を表示しています。  
 `<div class="description">~<div>` の部分では商品の名前と商品の説明を表示しています。

  `<div class="price">~<div>` の部分では商品の値段を表示しています。

```html
<div class="item">
   <div class="thumbnail">
   <img src="./images/item1.jpg" alt="" />
   </div>
   <div class="description">
   <h2>アボガドディップバケット</h2>
   <p>
      刻んだ野菜をアボカドと混ぜてディップに。こんがり焼いたバゲットとお召し上がりください。
   </p>
   <span>￥<span class="price">480</span></span>
   </div>
</div>
```

## Vue.js を使わない場合の問題点
　Vue.js を使わない場合、例えば次のような問題が発生します。
   - 商品の情報と HTML のタグが混ざっていて見通しが悪い。
   - 新しい商品を追加するときに HTML タグを追加する手間がかかる。
   - 売り切れの商品は非表示を手動でタグを必要する必要がある。
   - 商品の金額が一定以上の時にを手動でタグを必要する必要がある。
   - 商品情報を外部サービスから json を受け取って表示することが難しい。

## Vue.js を使った場合のプログラム
　記述の意味はハンズオンで順を追って説明していきますが、 Vue.js に変更後のコードをみてみましょう。  

Example.Vue
```html
<template>
  <header class="header">
    <img src="/images/logo.svg" alt="" />
    <h1>Vue.js ハンズオン</h1>
  </header>
  <main class="main">
    <template v-for="item in items" :key="item.id">
      <div
        v-if="!item.soldOut"
        class="item"
        :class="{ 'selected-item': item.selected }"
        @click="item.selected = !item.selected">
        <div class="thumbnail">
          <img :src="item.image" alt="" />
        </div>
        <div class="description">
          <h2>{{ item.name }}</h2>
          <p>{{ item.description }}</p>
          <span>¥<span class="price">{{ pricePrefix(item.price) }}</span></span>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'アボガドディップバケット',
          description:
            '刻んだ野菜をアボカドと混ぜてディップに。こんがり焼いたバゲットとお召し上がりください。',
          price: 480,
          image: '/images/item1.jpg',
          soldOut: false,
          selected: false
        },
        {
          id: 2,
          name: 'あの日夢見たホットケーキ',
          description:
            '子供のころに食べたかった、あのホットケーキを再現しました。素朴でどこか懐かしい味をどうぞ。',
          price: 1180,
          image: '/images/item2.jpg',
          soldOut: false,
          selected: false
        },
        {
          id: 3,
          name: 'HOP WTR',
          description:
            'ロサンゼルス生まれのスパークリングウォーター。ノンカロリー、ノンアルコールの新感覚飲料です。',
          price: 320,
          image: '/images/item3.jpg',
          soldOut: false,
          selected: false
        },
        {
          id: 4,
          name: 'チーズフレンチフライ',
          description:
            'イタリア産チーズをたっぷりかけたアツアツのフレンチフライ。みんな大好きな一品です。',
          price: 670,
          image: '/images/item4.jpg',
          soldOut: false,
          selected: false
        },
        {
          id: 5,
          name: '商品５',
          description: '商品５の説明です',
          price: 500,
          image: '/images/item4.jpg',
          soldOut: true,
          selected: false
        }
      ]
    }
  },
  methods: {
    /**
     * 価格を3桁ごとのカンマ付きで返す
     * @param {number} price 価格
     */
    pricePrefix(price) {
      return price.toLocaleString()
    }
  }
}
</script>

<style scoped>
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
.selected-item {
  background: #e3f2fd;
}
</style>
```

`<template>~</template>` 部分は見た目の表示が記述されています。 
冗長な記述が減っていて Vue.js を使わない場合に比べてとても短いですね。

`<script>~<script>` 部分は商品の情報や動作等が記述されています。  
特に `items` では商品の情報や状態だけのデータで HTML のタグがなくなっています。「見た目、処理、商品のデータ」が綺麗に別れており、見通しがよくなっているのが、既に感じられるかと思います。

他にも Vue.js の強力な力はありますが、実際にハンズオンを進めていく中で体験していきましょう！

---

[Previous](step02.md) | [Next](step04.md)
