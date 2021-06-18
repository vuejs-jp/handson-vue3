# methodsで価格にカンマを入れる

## Vueコンポーネントの中でデータを操作する
今度は、商品の金額の表示を変更してみましょう。
金額の表示は、3桁ごとにカンマを入れた表示が一般的です。しかし、`data`の`price`にはカンマのない金額が格納されています。
このサンプルでは表示に使用する商品データを`data`に直接記述していますが、実際のアプリケーション運用の際には、データベースに格納されたデータを使用することがほとんどです。データベースに格納されたデータはコントロールすることが難しい場合が多いため、データ自体を変更せずに表示を制御することが求められます。
そこで、`data`の中身は変更せず、データを加工して表示のみを変更してみましょう。

### 前回までのコードの確認
現在の`<template>`内のコードは以下のようになっています。

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
          <!-- コード1 金額の表示 -->
          <span>￥<span class="price">{{ item.price }}</span></span>
        </div>
      </div>
    </template>
  </main>
</template>
```

金額の表示を行なっている部分は、コード1の部分です。

```html
<span>￥<span class="price">{{ item.price }}</span></span>
```

この部分のコードを改修して、`item.price`を3桁ごとにカンマを入れた表示を変えてみましょう。

### `<template>`の中で直接表示を操作する

`{{ }}`の中には、値だけではなく処理を記述することができます。
では、`{{ item.price }}`を書き換えて、`item.price`の値を3桁ごとにカンマを入れた値にする処理を記述してみましょう。

```html
<span>￥<span class="price">{{ String(item.price).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,") }}</span></span>
```

正規表現を用いて、3桁ごとにカンマを入れた表示にすることができました。

### 3桁ごとのカンマ表示を行うコードについての補足
`String(item.price).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,")`というコードについて、簡単に説明をしておきましょう。

まず、`String(item.price)`という部分で`item.price`を文字列型のデータに変換しています。`String()`は引数に渡されたデータを文字列を生成する関数です。

> [`String()`に関する詳細](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/String)

次に、`replace(/(\d)(?=(\d\d\d)+$)/g, "$1,")`の部分です。
文字列型のデータに変換された`item.price`に対し、`replace()`を使い、3桁ごとにカンマを入れた文字列に変換しています。
`replace()`は第一引数に渡された文字列と一致した文字を、第二引数に渡された文字列に変換する関数です。

> [`replace()`に関する詳細](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

今回の例では、第一引数に正規表現を使用して文字列の変換を行なっています。
第一引数の`/(\d)(?=(\d\d\d)+$)/g`は後ろに3桁の数字がある数字のパターンを表す正規表現です。末尾の`g`オプションによって、マッチした複数の文字列を変換することができます。
第二引数の`$1`はパターンにマッチした文字列が代入されます。今回第二引数には`"$1,"`が渡されていますので、後ろに3桁の数字がある数字を、その数字の後ろに`,`を入れた文字列に変換していることがわかります。

> [正規表現に関する詳細](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions)

## 独自の関数を定義できる`methods`オプション

このように、`{{ }}`に直接実行したい処理を記述することもできますが、処理が長くなってしまう場合は可読性が下がってしまいます。そこで、実行したい処理を関数にして登録し、`{{ }}`にはその関数を記述するようにしてみましょう。
そのような関数を定義する場合に使用するのが、`methods`オプションです。

実際に、`item.price`を引数に渡すと、`String(item.price).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,")`の値を返す関数を作成してみましょう。

### `methods`オプションを追加する
まず、`<script>`内に`methods`オプションを追加します。

```html
<script>
export default {
  name: "App",
  data: () => {
    return {
      // 省略
    }
  },
  // 以下を追加
  methods: {

  }
}
</script>
```

### `methods`オプションに関数を定義する
引数の値をを3桁ごとにカンマを入れた値を返す関数として、`pricePrefix()`という関数を定義してみましょう。

```html
<script>
export default {
  name: "App",
  data: () => {
    return {
      // 省略
    }
  },
  methods: {
    //pricePrefix()を定義
    pricePrefix(price){
      const priceStr = String(price).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,")
      return priceStr
    }
  }
}
</script>
```

### 定義した関数を使用する
`pricePrefix()`が定義できたら、実際に`{{ }}`の中で使用してみましょう。

```html
<span>￥<span class="price">{{ pricePrefix(item.price) }}</span></span>
```

関数を使用することで、可読性が向上しました。
このように、Vueコンポーネントの中でデータの操作や処理を行う関数は`methods`オプションを使用するようにしましょう。
