# 商品をコンポーネント化する

## 本章の概要とゴール
本章では、一つ一つの商品を表示するコードをコンポーネントとして分離し、再利用できるようにプログラムを改修していきます。
本章を実践すると、プログラムの一部を再利用できるコンポーネントとして切り出したり、 `props` を使ってコンポーネントに必要な情報を渡すことができるようになります。

## コンポーネントとは

Vue.js ではテンプレート、ロジック、そしてスタイルを 1 つのファイルにまとめることで、単一ファイルコンポーネント（`Single File Components`、略称 `SFC`）として利用することができます。`SFC` は `<script setup>` 内で `import` することで、テンプレートで直接使用することが可能となります。

```vue{2,6}
<template>
  <MyComponent />
</template>

<script setup>
import MyComponent from './MyComponent.vue'
</script>
```

現在は商品を表示しているだけですが、ヘッダーの情報が増えたり、フッターなどのコンテンツを足していくと `template` のコードはどんどん肥大化していきます。それだけでなく、例えば商品に複数写真を表示、個数によって表示金額の変更、といった機能を追加していくと `script` のコードも肥大化していきます。肥大化するとコードの見通しも悪くなり、メンテナンスも大変になってきます。そのような状況に陥らないために、商品をコンポーネントに変更してみましょう。

### 前回までのコードの確認

現在のコードは以下のようになっています。

#### template

<<< @/../examples/event/src/App.vue#template

#### script

<<< @/../examples/event/src/App.vue#script

## 一部をモジュールとして切り出す
モジュールとして切り出す時、どの範囲で切り出すか迷うかもしれません。そのような場合は、再利用可能という観点で考えてみてもよいかもしれません。今回の場合、商品の部分は、`v-for` の中で何度も呼ばれているので、この範囲で切り出してみるのが良さそうです。

### コンポーネントの作成

`Card` コンポーネントとして切り出しますが、`src` ディレクトリの下に新たに `components` ディレクトリを作成し、そこに `Card.vue` ファイルを作成します。今後コンポーネントを新たに作っていく場合は、`components`  ディレクトリに格納していくとよいでしょう。作成後は下記のようなディレクトリ構成になっていると思います。

```
src
┣━ components
┃  ┗━ Card.vue
┣━ App.vue
┗━ main.js
```

次にいよいよモジュールを切り出す作業に入ります。以下のハイライト部分を `Card.vue` に移します。また、`pricePrefix()` や関連する `style` も一緒に移します。

#### template

<<< @/../examples/event/src/App.vue#template{17-26}

#### script

<<< @/../examples/event/src/App.vue#script{47-53}

#### style

<<< @/../examples/event/src/App.vue#style{54-82}

移し替えて出来上がった `Card.vue` は下記のようになります。

#### Card.vue

```vue
<template>
  <div class="thumbnail">
    <img
      :src="item.image"
      alt="">
  </div>
  <div class="description">
    <h2>{{ item.name }}</h2>
    <p>{{ item.description }}</p>
    <span>¥<span class="price">{{ pricePrefix(item.price) }}</span></span>
  </div>
</template>

<script setup>
/**
 * 価格を3桁ごとのカンマ付きで返す
 * @param {number} price 価格
 */
function pricePrefix(price) {
  return price.toLocaleString()
}
</script>

<style>
.item > div.thumbnail > img {
  width: 100%;
  height: calc(100%);
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

## Card コンポーネントを使用する
切り出しができたので、作成したコンポーネントを `App.vue` で使えるようにしましょう。

#### App.vue / template

```vue{14}
<template>

  <!-- 省略 -->

  <main class="main">
    <template
      v-for="item in items"
      :key="item.id">
      <div
        v-if="!item.soldOut"
        class="item"
        :class="{ 'selected-item': item.selected }"
        @click="item.selected = !item.selected">
        <Card />
      </div>
    </template>
  </main>
</template>
```

#### App.vue / script

```vue{3}
<script setup>
import { ref } from 'vue'
import Card from './components/Card.vue'

// 省略

</script>
```

`Card` コンポーネントを `import` して、`template` 内で呼び出しています。しかし現状エラーがでて動きません。作成した `Card` コンポーネントは `item` のデータを持っていないためです。そのため、`Card` コンポーネントでも `item` のデータを使えるように、親のコンポーネント（`App.vue`）から `props` として渡す必要があります。

### 親のコンポーネント( App.vue )から値を受け取る準備をする

まず必要なデータを受け取るために準備をします。

現在 `item` オブジェクト内のデータを参照していますが、 シンプルに必要な値のみを受け取り、表示するようにするために、コードを書き換えます。

#### Card.vue / template

```vue{4,8-10}
<template>
  <div class="thumbnail">
    <img
      :src="image"
      alt="">
  </div>
  <div class="description">
    <h2>{{ name }}</h2>
    <p>{{ description }}</p>
    <span>¥<span class="price">{{ pricePrefix(price) }}</span></span>
  </div>
</template>
```

次に親のコンポーネントから `props` を受け取る設定を記述します。

#### Card.vue / script

```vue{2-23}
<script setup>
defineProps({
  name: {
    type: String,
    default: '',
    required: false
  },
  description: {
    type: String,
    default: '',
    required: false
  },
  price: {
    type: Number,
    default: 0,
    required: false
  },
  image: {
    type: String,
    default: '',
    required: false
  },
});

// 省略

</script>
```

`defineProps` の中に受け取る `props` を書いていきます。`type` は型、`default` は初期値、`required` は必須要素を表しています。

::: tip ヒント
`defineProps` とこのあと紹介する `defineEmits` は `<script setup> ` 内でのみ使用可能なコンパイラマクロとなっているため、`import` する必要はありません。
:::

### App.vueから値を渡す準備をする

`Card.vue` の `defineProps` で定義した値を `template` 内で渡していきます。

#### App.vue / template

```vue{14-18}
<template>

  <!-- 省略 -->

  <main class="main">
    <template
      v-for="item in items"
      :key="item.id">
      <div
        v-if="!item.soldOut"
        class="item"
        :class="{ 'selected-item': item.selected }"
        @click="item.selected = !item.selected">
        <Card
          :image="item.image"
          :name="item.name"
          :description="item.description"
          :price="item.price"/>
      </div>
    </template>
  </main>
</template>
```

以上で、モジュールとして切り出す作業が完了です。`Card` コンポーネントに値が渡され、正しく表示されていれば成功です。

---

::: tip +1 チャレンジ
ここまでの学習が完了した人は、以下の内容にも挑戦してみましょう。
:::

## 親コンポーネントの関数を実行する

`Card` コンポーネントでは `pricePrefix` 関数を使用しています。このように、同じコンポーネント内で処理が完結している場合はよいですが、呼び出されている親のコンポーネントの関数を実行したい時があります。今回は例として、`Card` コンポーネントに「売り切れ」のボタンを作成し、クリックすると非表示になる、という処理を追加してみます。

### Card コンポーネントで emits の定義をする
Vue.js では `emits` オプションが使えます。`emits` オプションは、子のコンポーネント内で親のコンポーネントに発行できるイベントを定義できます。

今回では子のコンポーネントで「売り切れ」のイベントを発行して、親のコンポーネントで `items` を書き換える、という流れになります。現状では `Card` コンポーネントは渡された情報を表示するのみで、どの `item` か特定できる情報がないので、`id` も渡すように修正します。`defineProps` も忘れず修正しましょう。

#### App.vue / template

```vue{2}
<Card
  :id="item.id"
  :image="item.image"
  :name="item.name"
  :description="item.description"
  :price="item.price"/>
```

#### Card.vue / script

```vue{3-7}
<script setup>
defineProps({
  id: {
    type: Number,
    default: null,
    required: false
  },
  name: {
    type: String,
    default: '',
    required: false
  },

  // 省略

})

// 省略

</script>
```

`<script setup>` の中で `emits` を使用するためには `defineEmits` の API を使用します。`defineProps` と同様に `<script setup>` の中で自動的に使えるようになっているため、`import` は不要です。

```vue{9}
<script setup>

// 省略

function pricePrefix(price) {
  return price.toLocaleString()
}

const emit = defineEmits(['sold-out'])
</script>
```

次に `template` に売り切れのボタンを作成します。

```vue{5}
<template>

  <!-- 省略 -->

  <button type="button" @click="() => emit('sold-out',id)">売り切れ</button>
</template>
```

売り切れのボタンをクリックすると `defineEmits` を実行します。

### App.vue で実行する関数を定義

`Card` コンポーネントからの `emits` を受け取り、実行される関数を定義していきます。

```vue{7}
<Card
  :id="item.id"
  :image="item.image"
  :name="item.name"
  :description="item.description"
  :price="item.price"
  @sold-out="changeSoldOut"/>
```

`Card` コンポーネントには `sold-out` の `emits` を受け取った場合に `changeSoldOut` が実行されるように設定しました。次に、実行される `changeSoldOut` を定義します。

```vue{5-8}
<script setup>

// 省略

function changeSoldOut(id) {
  const pickElm = items.value.find(item => item.id == id)
  pickElm.soldOut = true
}
</script>
```

子のコンポーネントの売り切れのボタンをクリックすると、該当の `soldOut` プロパティを変更し、商品を非表示にすることができました。
