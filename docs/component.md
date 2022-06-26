# カードをコンポーネント化する

現在は商品のカードを表示しているだけですが、ヘッダーの情報が増えたり、フッターなどのコンテンツを足していくと `template` のコードはどんどん肥大化していきます。それだけでなく、例えば商品に複数写真を表示、個数によって表示金額の変更、といった機能を追加していくと `script` のコードも肥大化していきます。肥大化するとコードの見通しも悪くなり、メンテナンスも大変になってきます。そのような状況に陥らないため、Vue.js では機能の一部をモジュールとして切り出すことができるので、カードのコンポーネント化をしてみましょう。

### 前回までのコードの確認

現在のコードは以下のようになっています。

#### template

<<< @/../examples/event/src/App.vue#template

#### script

<<< @/../examples/event/src/App.vue#script

## 一部をモジュールとして切り出す
モジュールとして切り出す時、どの範囲で切り出すか迷うかもしれません。そのような場合は、再利用可能という観点で考えてみてもよいかもしれません。今回の場合、商品のカードの部分は、`v-for` の中で何度も呼ばれているので、この範囲で切り出してみるのが良さそうです。

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

<<< @/../examples/event/src/App.vue#template{17-26}
<<< @/../examples/event/src/App.vue#script{47-53}
<<< @/../examples/event/src/App.vue#style{54-81}

移し替えて出来上がった `Card.vue` は下記のようになります。

```html
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

```html
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
```html
<script setup>
import { ref } from 'vue'
import Card from './components/Card.vue'
```

`Card` コンポーネントを `import` して、`template` 内で呼び出しています。しかし現状エラーがでて動きません。作成した `Card` コンポーネントは `item` のデータを持っていないためです。そのため、`Card` コンポーネントでも `item` のデータを使えるように、親のコンポーネント( `App.vue` )から `props` として渡す必要があります。

### 親のコンポーネント( App.vue )から値を受け取る準備をする

まず必要なデータを受け取るために準備をします。

現在 `item` オブジェクト内のデータを参照していますが、 シンプルに必要な値のみを受け取り、表示するようにするために、コードを書き換えます。

```html
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

```html
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
```
`defineProps` の中に受け取る `props` を書いていきます。`type` は型、`default` は初期値、`required` は必須要素を表しています。

::: tip ヒント
`defineProps` とこのあと紹介する `defineEmits` は`<script setup> `内でのみ使用可能なコンパイラマクロとなっているため、`import` する必要はありません。
:::

### App.vueから値を渡す準備をする

`Card.vue` の`defineProps` で定義した値を `template` 内で渡していきます。

```html
<template>
<!-- 省略 -->
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
## 親コンポーネントの関数を実行する

`Card` コンポーネントでは `pricePrefix` 関数を使用しています。このように、同じコンポーネント内で処理が完結している場合はよいですが、呼び出されている親のコンポーネントの関数を実行したい時があります。今回は例として、`Card` コンポーネントに「売り切れ」のボタンを作成し、クリックすると非表示になる、という処理を追加してみます。

### Card コンポーネントで emits の定義をする
Vue.js では `emits` オプションが使えます。`emits` オプションは、子のコンポーネント内で親のコンポーネントに発行できるイベントを定義できます。

今回では子のコンポーネントで「売り切れ」のイベントを発行して、親のコンポーネントで `items` を書き換える、という流れになります。現状では `Card` コンポーネントは渡された情報を表示するのみで、どの `item` か特定できる情報がないので、idも渡すように修正します。`defineProps` も忘れず修正しましょう。

#### App.vue
```html
<Card
  :id="item.id"
  :image="item.image"
  :name="item.name"
  :description="item.description"
  :price="item.price"
  @sold-out="changeSoldOut"/>
```

#### Card.vue
```html
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
```

`<script setup>` の中で `emits` を使用するためには `defineEmits` の API を使用します。`defineProps` と同様に `<script setup>` の中で自動的に使えるようになっているため、`import` は不要です。

```html
<script setup>
// 省略
function pricePrefix(price) {
  return price.toLocaleString()
}

const emit = defineEmits(['sold-out'])
</script>
```

次に `template` に売り切れのボタンを作成します。

```html
<template>
  <!-- 省略 -->
  <button type="button" @click="() => emit('sold-out',id)">売り切れ</button>
</template>
```

売り切れのボタンをクリックすると `defineEmits` を実行します。

### App.vue で実行する関数を定義

`Card` コンポーネントからの `emits` を受け取り、実行される関数を定義していきます。

```html
<Card
  :image="item.image"
  :name="item.name"
  :description="item.description"
  :price="item.price"
  @sold-out="changeSoldOut"/>
```

`Card` コンポーネントには `sold-out` の`emits` を受け取った場合に `changeSoldOut` が実行されるように設定しました。次に、実行される `changeSoldOut` を定義します。

```html
<script setup>
// 省略
function changeSoldOut(id) {
  const pickElm = items.value.find(item => item.id == id)
  pickElm.soldOut = true
}
</script>
```

子のコンポーネントの売り切れのボタンをクリックすると、該当の `soldOut` プロパティを変更し、カードを非表示にすることができました。
