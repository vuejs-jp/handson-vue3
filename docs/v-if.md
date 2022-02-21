# v-if で表示・非表示を切り替える

購入しようと思った商品が売り切れで購入できないと、せっかく購入しようとしたユーザーをがっかりさせてしまいます。そこで、売り切れの商品は非表示にしてみましょう。

## v-if の書き方

Vue.js では特定の条件の時だけ DOM を生成し表示できる、`v-if` というディレクティブが用意されています。以下のように、表示・非表示を制御したい DOM 要素に `v-if` を追加します。`v-if` の値が `true` の場合は表示され、 `false` の場合は表示されません。

```html
<!-- 表示される -->
<div v-if="true">something</div>

<!-- 表示されない -->
<div v-if="false">something</div>
```

## プロパティの追加

それでは、`v-if` を使用して、売り切れの商品を非表示にしましょう。

まず、"売り切れかどうか"という情報を、`data` の商品情報に `soldOut` というプロパティで持たせてみましょう。今回は `id` が `3` の商品を売り切れ状態にしてみます。`id` が `3` の商品に `soldOut` というプロパティを追加し、 `true` を設定します。

```html
<template>
  <!-- 省略 -->
</template>

<script>
  export default {
    name: 'App',
    data: () => {
      return {
        items: [
          // id 1, 2, 4 省略
          {
            id: 3,
            name: 'HOP WTR',
            description:
              'ロサンゼルス生まれのスパークリングウォーター。ノンカロリー、ノンアルコールの新感覚飲料です。',
            price: 320,
            image: '/images/item3.jpg',
            // 売り切れかどうかを判断するプロパティを追加
            soldOut: true
          }
        ]
      }
    }
  }
</script>
```

## DOM 要素に v-if を追加

次に、DOM 要素に `v-if` を追加して、非表示にします。1 つ 1 つの商品を表示している要素は以下の部分です。

```html
<div class="item">
  <div class="thumbnail">
    <img :src="item.image" alt="" />
  </div>
  <div class="description">
    <h2>{{ item.name }}</h2>
    <p>{{ item.description }}</p>
    <span>¥<span class="price">item.price</span></span>
  </div>
</div>
```

この `<div>` 要素に `v-if` を記述していきます。`item.soldOut` が `true` の場合は、売り切れであることを示しています。

売り切れではない時、つまり `item.soldOut` が `false` の時だけ表示をさせたいため、ひと工夫必要です。`v-if="item.soldOut"` としてしまうと、売り切れの場合のみ表示させることになってしまうため、`!` を使用して真偽値を逆転させて使用しましょう。

```html
<!-- <div>要素に v-if を追加 -->
<div v-if="!item.soldOut" class="item">
  <div class="thumbnail">
    <img :src="item.image" alt="" />
  </div>
  <div class="description">
    <h2>{{ item.name }}</h2>
    <p>{{ item.description }}</p>
    <span>¥<span class="price">item.price</span></span>
  </div>
</div>
```

これで `id` が `3` の商品は非表示になりました。

::: tip ヒント
ここでは省略していますが、売り切れの状態を明示するため、`id` が `3` 以外の商品は `soldOut` プロパティを `false` にしておくとよいでしょう。
:::

## v-else や v-else-if の使い方

JavaScript の条件分岐の構文に `else` があるように、Vue.js にも同様のディレクティブが用意されています。`else` と同様の働きをするのが `v-else` です。

例えば、売り切れの場合は非表示にするのではなく"売り切れです"というメッセージを表示させたい場合は以下のように使用できます。

```html
<div v-if="!item.soldOut">
  <!-- 省略 -->
</div>
<div v-else>売り切れです</div>
```

また、JavaScript の `else if` と同様の働きをする `v-else-if` も用意されています。`v-if` の評価が `false` の時に、さらに条件を指定したい時に使用できます。

## v-showとの違い
`v-if` に似た `v-show` というディレクティブが用意されています。
以下のように、表示・非表示を制御したい DOM 要素に `v-show` を追加します。`v-show` の値が `true` の場合は表示され、 `false` の場合は表示されません。

```html
<!-- 表示される -->
<div v-show="true">something</div>

<!-- 表示されない -->
<div v-show="false">something</div>
```

ただし、 `v-show` ディレクティブの場合、 `v-if` が DOM 要素ごと削除しているのに対して、 スタイル属性に `display:none` を付与して非表示にしています。

ブラウザ上での描画
```html
<!-- 表示されない -->
<div style="display:none;">something</div>
```

::: tip ヒント
 `v-if` は、表示の切り替えのコストが高く、 `v-show` は、それより高い初期描画のコストが高いです。そのため、頻繁に表示の切り替えを行うのであれば、  `v-show` を使用し、それ以外では `v-if` の使用を推奨します。
:::

::: tip ヒント
`v-show` は `<template>` 要素に使用できないことに気をつけましょう。また、 `v-else` や `v-else-if` も使用できません。
:::

## v-for との併用について

`v-if` と `v-for` を同時に使うことは推奨されていません。
なぜなら、同じ要素において `v-for` は `v-if` より優先度が高く `v-if` の評価に関わらず `v-for` の表示処理が行われるためです。
以下の例のように、別の要素に分けることを推奨します。

```html
<div v-if="!item.soldOut">
   <template
      v-for="item in items"
      :key="item.id">
      <div class="item">
      <!-- 省略 -->
      </div>
   </template>
</div>
<div v-else>売り切れです</div>
```