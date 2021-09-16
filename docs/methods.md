# methods で価格にカンマを入れる

## Vue コンポーネントの中でデータを操作する

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

### `<template>` の中で直接表示を操作する

`{{ }}` の中には、値だけではなく処理を記述できます。

```html
<span>¥<span class="price">{{ item.price.toLocaleString() }}</span></span>
```

JavaScript がもともと持っている `toLocaleString()` 関数を用いて、3 桁ごとにカンマを入れた表示にすることができました。

- [ `toLocaleString()` に関する詳細](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)

## 独自の関数を定義できる `methods` オプション

このように、`{{ }}` の中に直接実行したい処理を記述できますが、処理が長くなると可読性が下がってしまいます。そこで、実行したい処理を関数にして登録し、`{{ }}` にはその関数を記述するとよりスマートです。

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

`pricePrefix()` が定義できたら、実際に `{{ }}` の中で使用してみましょう。

```html
<span>¥<span class="price">{{ pricePrefix(item.price) }}</span></span>
```

関数を使用することで、可読性が向上しました。また、他の箇所で同じ処理を行いたい場合に使い回すこともできるようになりました。このように、Vue コンポーネントの中でデータの操作や処理を行う関数は `methods` オプションを使用するようにしましょう。

---

[Previous](v-if.md) | [Next](event.md)
