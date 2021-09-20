# @click でイベントを処理する（クラスの切り替え）

## クリックで商品を選択する実装をする

今度は、購入する商品をクリックで選択できるようにしてみましょう。どの商品を選択しているのかがわかるよう、選択中の商品は背景の色を変化させてみます。

### 実装の考え方

クリックすることで商品が選択され、背景の色が変わるということは、クリックした時にその商品の状態が変化して CSS が変わるということです。

複数のことが同時に起こり複雑に感じるかもしれませんが、どのように実装していけば良いか 1 つずつ分解して考えてみると、以下のようになります。

1. 選択状態を表す style を用意する
2. クリックすると商品が"選択状態"になるようにする
3. "選択状態"の時にだけ、1 の style を適用する

1 つ 1 つの処理は難しくありません。順番に実装してみましょう。

### 前回までのコードの確認

現在のコードは以下のようになっています。

```html
<template>
  <header class="header">
    <img src="/images/logo.svg" alt="" />
    <h1>Vue.js ハンズオン</h1>
  </header>
  <main class="main">
    <div v-for="item in items" :key="item.id">
      <div v-if="!item.soldOut" class="item">
        <div class="thumbnail">
          <img :src="item.image" alt="" />
        </div>
        <div class="description">
          <h2>{{ item.name }}</h2>
          <p>{{ item.description }}</p>
          <span>¥<span class="price">{{ pricePrefix(item.price) }}</span></span>
        </div>
      </div>
    </div>
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
          name: 'アボカドディップバケット',
          description:
            '刻んだ野菜をアボカドと混ぜてディップに。こんがり焼いたバゲットとお召し上がりください。',
          price: 480,
          image: '/images/item1.jpg',
          soldOut: false
        },
        {
          id: 2,
          name: 'あの日夢見たホットケーキ',
          description:
            '子供のころに食べたかった、あのホットケーキを再現しました。素朴でどこか懐かしい味をどうぞ。',
          price: 1180,
          image: '/images/item2.jpg',
          soldOut: false
        },
        {
          id: 3,
          name: 'HOP WTR',
          description:
            'ロサンゼルス生まれのスパークリングウォーター。ノンカロリー、ノンアルコールの新感覚飲料です。',
          price: 320,
          image: '/images/item3.jpg',
          soldOut: false
        },
        {
          id: 4,
          name: 'チーズフレンチフライ',
          description:
            'イタリア産チーズをたっぷりかけたアツアツのフレンチフライ。みんな大好きな一品です。',
          price: 670,
          image: '/images/item4.jpg',
          soldOut: false
        },
        {
          id: 5,
          name: '商品５',
          description: '商品５の説明です',
          price: 500,
          image: '/images/item4.jpg',
          selected: false,
          soldOut: true
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

<style>
/* 省略 */
</style>
```

## 1.選択状態を表す style を用意する

まず、選択中の商品に適用する style を用意しましょう。`<style>` タグに以下の `class` を追加します。

```css
.selected-item {
  background-color: #e3f2fd;
}
```

`selected-item` という `class` を追加しました。選択中の商品は背景の色を変化させたいため、この `class` には `background-color` プロパティを定義しています。

## 2. クリックすると商品が"選択状態"になるようにする

次は、クリックして商品を"選択状態"にする部分の実装です。

### "選択状態"を表すプロパティの追加

以前、`data` の `items` に、"売り切れかどうか"という情報を表す `soldOut` というプロパティを追加しました。今回も同様に、"選択状態か"という情報をプロパティとして追加しましょう。

`selected` というプロパティを追加し、値を `true` (選択状態) / `false` (非選択状態)とすることで、選択されているかどうか判別できるようにします。

初期状態は何も選択されていない状態であるため、すべての商品を `selected: false` にしておきましょう。

```html
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
          image: '/images/item1.jpg',
          soldOut: false,
          selected: false //selectedプロパティ追加
        },
        {
          id: 2,
          name: 'あの日夢見たホットケーキ',
          description:
            '子供のころに食べたかった、あのホットケーキを再現しました。素朴でどこか懐かしい味をどうぞ。',
          price: 1180,
          image: '/images/item2.jpg',
          soldOut: false,
          selected: false //selectedプロパティ追加
        },
        {
          id: 3,
          name: 'HOP WTR',
          description:
            'ロサンゼルス生まれのスパークリングウォーター。ノンカロリー、ノンアルコールの新感覚飲料です。',
          price: 320,
          image: '/images/item3.jpg',
          soldOut: false,
          selected: false //selectedプロパティ追加
        },
        {
          id: 4,
          name: 'チーズフレンチフライ',
          description:
            'イタリア産チーズをたっぷりかけたアツアツのフレンチフライ。みんな大好きな一品です。',
          price: 670,
          image: '/images/item4.jpg',
          soldOut: false,
          selected: false //selectedプロパティ追加
        },
        {
          id: 5,
          name: '商品５',
          description: '商品５の説明です',
          price: 500,
          image: '/images/item4.jpg',
          soldOut: true,
          selected: false //selectedプロパティ追加
        }
      ]
    }
  },
  // 省略
}
</script>
```

### click イベントの設定

商品をクリックした時に `selected` プロパティの値を `true` にすれば、「クリックして選択する」という実装が可能になります。

商品に対して `click` イベントのイベントリスナーを実装していきましょう。

**イベントリスナーについての補足**  
ボタンがクリックされた、フォームに入力された、スクロールしたなど、Web ページや Web アプリケーション上でのさまざまな動きのことをイベントと言います。イベントが発生した時に実行される処理をイベントリスナーといい、イベントが発生する要素に対して設定することができます。

### v-on の使い方

Vue.js でイベントリスナーを登録するには `v-on` というディレクティブを使用し、以下のように記述します。

```html
<button type="button" v-on:click="イベント時の処理">***</button>
```

上記は `<button>` 要素をクリックした時に実行される `click` イベントを設定しています。`v-on:click=" "` の `" "` の中に、`click` イベントが発生した時に実行したい処理を記述できます。

`click` のほかにも、スクロールした時に実行される `scroll` イベントや、フォームが submit された時に実行される `submit` イベントなども用意されています。

`v-on:click` は、`@click` と省略して記述できます。習熟されたエンジニアは省略記法を使う方が多いようです。

```html
<button type="button" @click="イベント時の処理">***</button>
```

> [イベントに関する詳細](https://v3.ja.vuejs.org/guide/events.html)

### click イベントの実装

では実際に、商品に `click` イベントを登録していきましょう。

```html
<template>
  <header class="header">
    <img src="/images/logo.svg" alt="" />
    <h1>Vue.js ハンズオン</h1>
  </header>
  <main class="main">
    <div v-for="item in items" :key="item.id">
      <!--  @click="item.selected = !item.selected"を追加 -->
      <div
        v-if="!item.soldOut"
        class="item"
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
    </div>
  </main>
</template>
```

`v-for` の中の要素は 1 つ 1 つの商品を表しています。その要素に対し `@click` を追加しました。

`click` イベントで商品の選択をするためには、その商品の `selected` プロパティを `true` にすることが必要です。それだけを実現するには `@click="item.selected = true"` とすれば良さそうです。 しかしその場合、一度クリックして `true` にすると、 `false` に戻すことができない、つまり選択した商品をキャンセルできなくなってしまいます。

そこで、`click` イベントでの処理を、`selected` の値が `false` の時は `true` に、`true` の時は `false` にするようにしておけば、選択とキャンセルが可能になります。つまり、現時点での `selected` の値と反対の値を代入するようにすれば良いということです。これを実装すると、`item.selected = !item.selected` という処理になります(論理否定 (`!`)で `item.selected` の否定の値を使用できます)。

> [論理否定 (!)について](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_NOT)

## 3. "選択状態"の時にだけ、1 の style を適用する

最後に、1 で作成した `selected-item` という `class` を、`selected` の値が `true` の時にだけ適用すれば完成です。

### `v-bind` の使い方

今回のように、特定の条件の時にだけ `class` などの属性を適用させたい場合は、`v-bind` ディレクティブを使用します。`v-bind` は属性をバインディングするためのディレクティブであり、`class` や `style`、`src` などの属性の操作できます。

`class` の操作は、対象の要素に対して `v-bind:class="classの制御処理"` のように行います。また、`v-bind:class` は `:class` と省略して記述できます。

### `:class` の実装

では実際に `:class` を使って実装してみましょう。

```html
<template>
  <header class="header">
    <img src="/images/logo.svg" alt="" />
    <h1>Vue.js ハンズオン</h1>
  </header>
  <main class="main">
    <div v-for="item in items" :key="item.id">
      <!-- :class="{'selected-item': item.selected}"を追加 -->
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
    </div>
  </main>
</template>
```

商品要素に対して、`:class` を追加しました。処理の中身を確認していきましょう。

```js
:class="{ 'selected-item': item.selected }"
```

上記のように、適用したい `class` を条件式と一緒に記述することで、その条件式が `true` の場合のみ該当の `class` を適用できます。

`:class="{'selected-item': item.selected}"` の中の `selected-item` が、1 で作成した `class` です。`selected-item` は、`item.selected` が `true` の場合のみ適用されます。`item.selected` が `true` の場合とは、商品が選択されている状態を示しています。

これで、商品が選択状態の時に背景の色が変化するようになりました。

## 今回使用したディレクティブ

今回の実装では 2 つのディレクティブを使用しました。

- `v-on:click`(`@click`)を使用したイベントリスナーの登録
- `v-bind:class`(`:class`)を使用した属性の操作

このように、複数のディレクティブや処理を組み合わせて、さまざまな動きを実現できます。
