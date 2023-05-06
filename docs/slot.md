# コンポーネントにスロットを使用する

商品をコンポーネント化したことで、`Card` コンポーネントに必要な情報を `props` で渡すだけとなり、コードが見やすくなりました。

```vue
<template>
  <header class="header">
    <img
      src="/images/logo.svg"
      alt="">
    <h1>Vue.js ハンズオン</h1>
  </header>
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
          :id="item.id"
          :image="item.image"
          :name="item.name"
          :description="item.description"
          :price="item.price"/>
      </div>
    </template>
  </main>
</template>
```

しかし、例えば「タグ情報を追加したい」「リンク情報を追加したい」という場合に、`props` に定義されていないため渡すことができません。そこで、汎用的に `Card` コンポーネントを利用できるように、スロットを使用してみましょう。

## スロットについて

### スロットとは

Vue.js のスロットでは、親コンポーネントから子コンポーネントにコンテンツを渡してレンダリングすることが可能です。スロットを使用すると、コンポーネントの `props` を変更することなく、表示するコンテンツを変更できるため、コンポーネントの再利用性と柔軟性が高まります。スロットには、**スロットコンテンツ**と**スロットアウトレット**という仕組みがあるので、説明していきます。

#### スロットコンテンツ
スロットコンテンツとは、スロットを使用して子コンポーネントへ渡すコンテンツのことを指します。

コンテンツを渡す方法は、子コンポーネントの要素でレンダリングしたいコンテンツを、親コンポーネントで定義します。スロットコンテンツとして、プレーンテキスト、HTML 要素、他のコンポーネントなど、さまざまなタイプを渡すことができます。

#### 親コンポーネント

```vue
<ChildComponent>
  スロットコンテンツ
</ChildComponent>
```

#### スロットアウトレット

親コンポーネントでスロットコンテンツを定義しましたが、子コンポーネント側では、スロットコンテンツを受け取るためのスロットアウトレットを用意する必要があります。

コンテンツを受け取る方法は、スロットコンテンツをレンダリングしたい場所に `slot` 要素を定義します。

#### 子コンポーネント

```vue
<div>
  <slot />
</div>
```

スロットコンテンツで紹介した親コンポーネントのコードと、スロットアウトレットの子コンポーネントを組み合わせると、最終的に表示されるコードは以下のようになります。

#### DOM
```vue
<div>
  <!-- スロットコンテンツがスロットアウトレットにレンダリングされている -->
  スロットコンテンツ
</div>
```

### 名前付きスロット

コンポーネントに複数のスロットを渡したい場合や、コンテンツを識別しやすいように特定の名前を付けたい場合があります。このような場合、名前付きスロットを使用することができます。

名前付きスロットを定義するには、`name` 属性で名前を付ける必要があります。

#### 子コンポーネント

```vue
<template>
  <div>
    <h2>Child Component</h2>
    <slot name="contents" />
    <slot name="footer" />
  </div>
</template>
```

上の例では、コンポーネントのテンプレートに、コンテンツ用とフッター用の 2 つの名前付きスロットを定義しています。親コンポーネント側では、スロットアウトレットの `name` 属性で定義した名前を、`v-slot` ディレクティブを使用して、スロットコンテンツに指定します。

#### 親コンポーネント

```vue
<template>
  <div>
    <ChildComponent>
      <template v-slot:contents>
        <p>コンテンツ</p>
      </template>
      <template v-slot:footer>
        <p>フッター</p>
      </template>
    </ChildComponent>
  </div>
</template>
```

また、`v-slot` には専用の省略表記があり、`<template v-slot:contents>` は `<template #contents` と書くことができます。

```vue
<template>
  <div>
    <ChildComponent>
      <template #contents>
        <p>コンテンツ</p>
      </template>
      <template #footer>
        <p>フッター</p>
      </template>
    </ChildComponent>
  </div>
</template>
```

## Cardコンポーネントでスロットを利用する

実際に `Card` コンポーネントにスロットを実装していきましょう。

### `description` をスロットに置き換える

現在、`Card` コンポーネントは、`id`、`image`、`name`、`description`、`price`、 5 つの `props` を受け付けています。今回は、`props` から `description` を削除し、汎用的に使用可能な `body` という名前付きスロットに置き換えていきます。まずは、親コンポーネントである `App.vue` を修正していきます。

#### App.vue / template

```vue{17-25}
<template>
  <header class="header">
    <img
      src="/images/logo.svg"
      alt="">
    <h1>Vue.js ハンズオン</h1>
  </header>
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
          :id="item.id"
          :image="item.image"
          :name="item.name"
          :price="item.price">
          <template #body>
            {{ item.description }}
          </template>
        </Card>
      </div>
    </template>
  </main>
</template>
```

## スロットを利用し、コンテンツを表示する

 `App.vue` の修正が終わったら、次は `Card` コンポーネントを修正します。

### スロットを利用し、テキストを挿入する

`Card` コンポーネントでは、`name` 属性に `body` を指定したスロットアウトレットを定義します。同時に、`props` から `description` を削除しておきます。

#### Card.vue / template

```vue{9}
<template>
  <div class="thumbnail">
    <img
      :src="image"
      alt="">
  </div>
  <div class="description">
    <h2>{{ name }}</h2>
    <p><slot name="body" /></p>
    <span>¥<span class="price">{{ pricePrefix(price) }}</span></span>
  </div>
</template>
```

#### Card.vue / script

```vue
<script setup>
defineProps({
  name: {
    type: String,
    default: '',
    required: false
  },
  price: {
    type: Number,
    default: null,
    required: false
  },
  image: {
    type: String,
    default: '',
    required: false
  },
});
//省略
</script>
```

これで `body` のスロットを表示することができました。

::: tip +1 チャレンジ
ここまでの学習が完了した人は、以下の内容にも挑戦してみましょう。
:::

### スロットを利用し、HTML 要素を挿入する

`description` の `props` を `body` の名前付きスロットに変更して表示することができましたが、スロットに置き換えてテキストを渡しているだけなので、見た目上の変化はありません。冒頭でも紹介したように、スロットの用途はテキストだけにとどまりません。スロットに変更したことで、コンポーネントの柔軟性が高まり、HTML 要素をコンポーネントに挿入することができるようになっているので、試してみましょう。

#### App.vue / template

```vue{23}
<template>
  <header class="header">
    <img
      src="/images/logo.svg"
      alt="">
    <h1>Vue.js ハンズオン</h1>
  </header>
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
          :id="item.id"
          :image="item.image"
          :name="item.name"
          :price="item.price">
          <template #body>
            <span>{{ item.description }}</span>
          </template>
        </Card>
      </div>
    </template>
  </main>
</template>
```

#### Card.vue / style

```vue{10-12}
<style>
/* 省略 */
.item > div.description > p {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 18px;
  line-height: 25px;
}

.item > div.description > p > span{
  color: red;
}

.item > div.description > span {
  display: block;
  margin-top: 10px;
  font-size: 20px;
}
/* 省略 */
</style>
```

`description` をスロットで渡す時に `span` 要素で囲み、スタイルの定義も行いました。確認してみると `color: red` が適用されています。このように、`Card` コンポーネントを修正しなくても、親コンポーネントでスロットコンテンツの中身を変更できるため、再利用しやすく、柔軟性の高いコンポーネントになったと思います。

