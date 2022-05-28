# 関数で価格にカンマを入れる

## Vue.js でデータを操作する

今度は、商品価格の表示を変更してみましょう。価格の表示は、例えば `1,180円` のように 3 桁ごとにカンマを入れた表示が一般的です。しかし、`items` の `price` にはカンマのない価格が格納されています。

このようなとき、`price` に格納する値を数値から文字列に変更し、カンマを追加するのも 1 つの手です。しかし価格のデータを文字列にしてしまうと、今度は足したり引いたりといった数値計算ができなくなってしまいます。

そこで、`items` の中身は変更せず、データを加工して表示のみを変更してみましょう。

### 前回までのコードの確認

現在の `<template>` 内のコードは以下のようになっています。

<<< @/../examples/v-if/src/App.vue#template

価格の表示を行なっている部分は、コード 1 の部分です。

```html
<span>¥<span class="price">{{ item.price }}</span></span>
```

この部分のコードを改修して、`item.price` を 3 桁ごとにカンマを入れた表示に変えてみましょう。

### Mustache 構文の中で直接表示を操作する

::: v-pre
`{{ }}` の中には、値だけではなく処理を記述できます。
:::

```html
<span>¥<span class="price">{{ item.price.toLocaleString() }}</span></span>
```

JavaScript がもともと持っている `toLocaleString()` 関数を用いて、3 桁ごとにカンマを入れた表示にできました。

- [ `toLocaleString()` に関する詳細](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)

## 独自の関数を定義

::: v-pre
このように、`{{ }}` の中に直接実行したい処理を記述できますが、処理が長くなると可読性が下がってしまいます。そこで、実行したい処理を関数にして登録し、`{{ }}` にはその関数を記述するとよりスマートです。
:::

通常の JavaScript のように関数宣言で定義することで、関数を追加することができます。

`item.price` を引数として渡し、`toLocaleString()` の結果を返す関数を作成してみましょう。

### 関数を定義する

`<script setup>` 内に関数を定義していきます。

まず、引数を 3 桁ごとにカンマを入れた値として返す関数として、`pricePrefix()` という関数を定義してみましょう。以下のハイライトしている箇所（`pricePrefix()` 以下）を追加します。

<<< @/../examples/methods/src/App.vue#script{43-49}

### 定義した関数を使用する

::: v-pre
`pricePrefix()` が定義できたら、実際に `{{ }}` の中で使用してみましょう。
:::

```html
<span>¥<span class="price">{{ pricePrefix(item.price) }}</span></span>
```

関数を使って、価格のデータはそのままで、表示を加工できました。また、他の箇所で同じ処理を行いたい場合に使い回すこともできるようになりました。このように、Vue.js でデータの操作や処理を行う場合は関数を使用するようにしましょう。

---

::: tip +1 チャレンジ
ここまでの学習が完了した人は、以下の内容にも挑戦してみましょう。
:::

## 算出プロパティ `computed` との違い

Vue.js には関数の他に、算出プロパティを扱う `computed` プロパティがあります。この違いについて説明していきます。

まず、関数と `computed` プロパティの違いを知るために、`template` でどのように扱うのかをそれぞれ確認してみましょう。

#### 関数で商品数を表示する

確認の準備として、商品数を表示する関数を定義していきます。

```html
<template>
  <header class="header">
    <img src="/images/logo.svg" alt="" />
    <h1>Vue.js ハンズオン</h1>
  </header>
  <div>商品数：{{ stockQuantity() }}</div>
  <!-- 省略 -->
<template>
```
```html
<script setup>
// 省略

/**
 * 価格を3桁ごとのカンマ付きで返す
 * @param {number} price 価格
 */
const pricePrefix = (price) => {
  return price.toLocaleString()
}

/**
 * 在庫のある商品数を返す
 */
const stockQuantity = () => {
  return items.filter(item => item.soldOut === false ).length
}
</script>
```

新たな関数として `stockQuantity()` を定義し、`template` 内で使用しています。`stockQuantity()` では `filter()` 関数によって在庫がある商品を抽出し、`length` プロパティによって抽出した数を取得しています。

ここに[v-else や v-else-if の使い方](https://handson.vuejs-jp.org/v-if.html#v-else-%E3%82%84-v-else-if-%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9)のコードを参考に、入荷のボタンを追加してみます。

```html
<div v-if="!item.soldOut">
  <!-- 省略 -->
</div>
<div v-else>
  売り切れです<button type="button" @click="stockItem(item)">入荷</button>
</div>
```
```html
<script setup>
// 省略
/**
 * 在庫のある商品数を返す
 */
const stockQuantity = () => {
  return items.filter(item => item.soldOut === false ).length
}

/**
 * 商品の在庫状況を変更する
 * @param {object} 商品情報
 */
const stockItem = (item) => {
  item.soldOut = false
}
</script>
```

入荷ボタンをクリックすると `stockItem()` によって `items` 配列の中身が変更されます。`items` 配列が変更されたことにより `template` が更新されるので、`stockQuantity()` が実行され、商品数が 3 から 4 に更新されます。

#### `computed` プロパティで商品数を表示する

関数で商品数を表示しましたが、`computed` プロパティでも商品数を表示してみます。

```html
<script setup>
import { reactive, computed } from 'vue'
// 省略
const stockQuantityComputed = computed(() => {
  return items.filter(item => item.soldOut === false ).length
})
</script>
```

コードの内容は 関数で商品数を取得した `stockQuantity()` と同じです。それでは作成した `stockQuantityComputed` を `template` で使用してみましょう。

```html
<template>
  <header class="header">
    <img src="/images/logo.svg" alt="" />
    <h1>Vue.js ハンズオン</h1>
  </header>
  <div>商品数：{{ stockQuantityComputed }}</div>
  <!-- 省略 -->
</template>
```

商品数には 3 が表示され、入荷ボタンをクリックすると 4 に更新されます。

::: tip ヒント
`computed` プロパティは関数と違って算出プロパティです。そのため、定義した `computed` プロパティを `template` で使う際には `()` は不要です。
:::

#### 関数と `computed` プロパティの違い

関数でも `computed` プロパティでも最終的に同じ値を取得することが可能ですが、2 つの違いはどこにあるのでしょうか。

#### キャッシュの違いについて
大きな違いとして `computed` プロパティにはキャッシュ機能があるため、値の更新タイミングが異なります。

- 関数 : `template` が更新された時
- `computed` プロパティ : `items` が更新された時

実際に値の更新タイミングを確認するために、現在時刻を表示する処理を追加していきます。

```html
<!-- 省略 -->
  <div>商品数：{{ stockQuantity() }}</div>
  <div>現在時刻：{{ getDate() }}</div>
```
```html
<script setup>
// 省略
const stockItem = (item) => {
  item.soldOut = false
}

/**
 * 現在時刻を取得する
 */
const getDate = () => {
  return Date.now()
}
</script>
```

入荷ボタンをクリックすると商品数だけでなく、現在時刻も更新されます。関数を更新すると `template` の更新処理が実行されるため、定義されている他の関数も更新されます。

次に `computed` プロパティに現在時刻を取得する処理を追加してみましょう。

```html
<!-- 省略 -->
  <div>現在時刻：{{ getDate() }}</div>
  <div>現在時刻(computed)：{{ getDateComputed }}</div>
```
```html
<script setup>
// 省略
const getDateComputed = computed(() => {
  return Date.now()
})
</script>
```

関数で定義されていた `getDate()` では、入荷ボタンをクリックすると更新されましたが、`computed` プロパティに定義した `getDateComputed` は更新されません。こちらは `computed` プロパティの値の更新タイミングが `items` が更新された場合であり、`items` を扱っていないと自動的に値が更新されないことが理由です。

以上のように、関数と `computed` プロパティでは更新のタイミングが違うので注意が必要です。

::: tip ヒント
毎回自動的に更新がされるため、関数の方が便利そうです。しかし、これには注意が必要です。例えば、巨大な配列をループして多くの計算が必要な処理があったとします。関数で定義した場合 `template` が更新される度に、このループ処理が実行されてしまいます。しかし、`computed` プロパティで定義していた場合はキャッシュが効いているので実行されません。
:::
