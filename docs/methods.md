# methods で価格にカンマを入れる

## Vue.js でデータを操作する

今度は、商品価格の表示を変更してみましょう。価格の表示は、例えば `1,180円` のように 3 桁ごとにカンマを入れた表示が一般的です。しかし、`data` の `price` にはカンマのない価格が格納されています。

このようなとき、`price` に格納する値を数値から文字列に変更し、カンマを追加するのも 1 つの手です。しかし価格のデータを文字列にしてしまうと、今度は足したり引いたりといった数値計算ができなくなってしまいます。

そこで、`data` の中身は変更せず、データを加工して表示のみを変更してみましょう。

### 前回までのコードの確認

現在の `<template>` 内のコードは以下のようになっています。

```html
<template>
  <header class="header">
    <img src="/images/logo.svg" alt="" />
    <h1>Vue.js ハンズオン</h1>
  </header>
  <main class="main">
    <template v-for="item in items" :key="item.id">
      <div v-if="!item.soldOut" class="item">
        <div class="thumbnail">
          <img :src="item.image" alt="" />
        </div>
        <div class="description">
          <h2>{{ item.name }}</h2>
          <p>{{ item.description }}</p>
          <!-- コード1 価格の表示 -->
          <span>¥<span class="price">{{ item.price }}</span></span>
        </div>
      </div>
    </template>
  </main>
</template>
```

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

## 独自の関数を定義できる `methods` オプション

::: v-pre
このように、`{{ }}` の中に直接実行したい処理を記述できますが、処理が長くなると可読性が下がってしまいます。そこで、実行したい処理を関数にして登録し、`{{ }}` にはその関数を記述するとよりスマートです。
:::

関数を定義するときに使うのが、`methods` オプションです。

`item.price` を引数として渡し、`toLocaleString()` の結果を返す関数を作成してみましょう。

### `methods` オプションを追加する

まず、`<script>` 内に `methods` オプションを追加します。

```html
<script>
export default {
  name: 'App',
  data() {
    return {
      // 省略
    }
  },
  // 以下を追加
  methods: {}
}
</script>
```

### `methods` オプションに関数を定義する

引数を 3 桁ごとにカンマを入れた値として返す関数として、`pricePrefix()` という関数を定義してみましょう。

```html
<script>
export default {
  name: 'App',
  data() {
    return {
      // 省略
    }
  },
  methods: {
    // pricePrefix()を定義
    pricePrefix(price) {
      return price.toLocaleString()
    }
  }
}
</script>
```

### 定義した関数を使用する

::: v-pre
`pricePrefix()` が定義できたら、実際に `{{ }}` の中で使用してみましょう。
:::

```html
<span>¥<span class="price">{{ pricePrefix(item.price) }}</span></span>
```

関数を使って、価格のデータはそのままで、表示を加工できました。また、他の箇所で同じ処理を行いたい場合に使い回すこともできるようになりました。このように、Vue.js でデータの操作や処理を行う関数は `methods` オプションを使用するようにしましょう。

## 算出プロパティ `computed` との違い

Vue.js には関数を扱う `methods` オプションの他に、算出プロパティを扱う `computed` オプションがあります。この 2 つのオプションの違いについて説明していきます。

まず、`methods` オプションと `computed` オプションの違いを知るために、`template` でどのように扱うのかをそれぞれ確認してみましょう。

#### `methods` オプションで商品数を表示する

確認の準備として、`methods` オプションで商品数を表示する関数を定義していきます。

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
<script>
  // 省略
  methods: {
    /**
     * 価格を3桁ごとのカンマ付きで返す
     * @param {number} price 価格
     */
    pricePrefix(price) {
      return price.toLocaleString()
    },
    /**
     * 在庫のある商品数を返す
     */
    stockQuantity() {
      return this.items.filter(item => item.soldOut === false ).length
    }
  }
</script>
```

`methods` オプションへ新たに `stockQuantity()` 関数を定義し、`template` 内で使用しています。 `stockQuantity()` では `filter()` 関数によって在庫がある商品を抽出し、`length` プロパティによって抽出した数を取得しています。

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
<script>
  // 省略
  methods: {
    // 省略
    stockQuantity() {
      return this.items.filter(item => item.soldOut === false ).length
    },
    /**
     * 商品の在庫状況を変更する
     * @param {object} 商品情報
     */
    stockItem(item) {
      item.soldOut = false
    },
  }
</script>
```

入荷ボタンをクリックすると `stockItem()` 関数によって `items` 配列の中身が変更されます。`items` 配列が変更されたことにより `template` が更新されるので、 `stockQuantity()` 関数が実行され、商品数が 3 から 4 に更新されます。

#### `computed` オプションで商品数を表示する

`methods` オプションで商品数を表示しましたが、`computed` オプションでも商品数を表示してみます。

```html
<script>
  // 省略
  computed: {
    stockQuantityComputed() {
      return this.items.filter(item => item.soldOut === false ).length
    }
  }
</script>
```

コードの内容は `methods` オプションで商品数を取得した `stockQuantity()` 関数と同じです。それでは作成した `stockQuantityComputed` プロパティを `template` で使用してみましょう。

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
`methods` オプションはその名の通りメソッド（関数）ですが、`computed` オプションは算出プロパティです。その違いから、`computed` オプションで定義した算出プロパティを `template` で使うには `()` は不要です。
:::

#### `methods` オプションと `computed` オプションの違い

`methods` オプションでも `computed` オプションでも最終的に同じ値を取得することが可能ですが、2 つのオプションの違いはどこにあるのでしょうか。

#### キャッシュの違いについて
大きな違いとして `computed` オプションにはキャッシュ機能があるため、値の更新タイミングが異なります。

- `methods` オプション : `template` が更新された時
- `computed` オプション : `data` が更新された時

実際に値の更新タイミングを確認するために、現在時刻を表示する処理を追加していきます。

```html
<!-- 省略 -->
  <div>商品数：{{ stockQuantity() }}</div>
  <div>現在時刻：{{ getDate() }}</div>
```
```html
<script>
  // 省略
  methods: {
    // 省略
    stockItem(item) {
      item.soldOut = false
    },
    /**
     * 現在時刻を取得する
     */
    getDate() {
      return Date.now()
    }
  }
</script>
```

入荷ボタンをクリックすると商品数だけでなく、現在時刻も更新されます。`methods` オプションを更新すると `template` の更新処理が実行されるため、`methods` オプションに定義されている他の関数も更新されます。

次に `computed` オプションに現在時刻を取得する処理を追加してみましょう。

```html
<!-- 省略 -->
  <div>現在時刻：{{ getDate() }}</div>
  <div>現在時刻(computed)：{{ getDateComputed }}</div>
```
```html
<script>
  // 省略
  computed: {
    // 省略
    getDateComputed() {
      return Date.now()
    },
  }
</script>
```

`methods` オプションに定義されていた `getDate()` 関数では、入荷ボタンをクリックすると更新されましたが、`computed` オプションに定義した `getDateComputed` プロパティは更新されません。こちらは `computed` オプションの値の更新タイミングが `data` が更新された場合であり、`data` を扱っていないと自動的に値が更新されないことが理由です。

以上のように、`methods` オプションと `computed` オプションでは更新のタイミングが違うので注意が必要です。

::: tip ヒント
毎回自動的に更新がされるため、`methods` オプションの方が便利そうです。しかし、これには注意が必要です。例えば、巨大な配列をループして多くの計算が必要な処理があったとします。`methods` オプションで定義した場合 `template` が更新される度に、このループ処理が実行されてしまいます。しかし、`computed` オプションで定義していた場合はキャッシュが効いているので実行されません。
:::
