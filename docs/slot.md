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

ここで、商品ページを充実するために、`drink` や `sidemenu` といった「タグ情報」であったり、商品詳細やアレルギー表示などの「リンク情報」といった機能を追加しようとした時はどうすればよいでしょうか。現在のコードでは、`props` に定義されておらず、情報を渡すことができないため、その度に `props` の修正を行う必要があります。そこで、`Card` コンポーネントを汎用的に利用できるように、スロットを使用してみましょう。

## スロットについて

### スロットとは

Vue.js のスロットでは、親コンポーネントから子コンポーネントにコンテンツを渡してレンダリングすることが可能です。スロットを使用すると、コンポーネントの `props` の修正に手を入れることなく、表示するコンテンツを変更できるため、コンポーネントの再利用性と柔軟性が高まります。スロットには、**スロットコンテンツ**と**スロットアウトレット**という仕組みがあるので、説明していきます。

#### スロットコンテンツ
スロットコンテンツとは、子コンポーネントへ渡すコンテンツのことを指します。

コンテンツを渡す方法は、親コンポーネントで子コンポーネントを呼び出し、子コンポーネントの要素へレンダリングしたいコンテンツを定義します。スロットコンテンツとして、プレーンテキスト、HTML 要素、他のコンポーネントなど、さまざまな種類を渡すことができます。

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
  <!-- 親要素のスロットコンテンツがslot要素へレンダリングされる -->
  <slot />
</div>
```

スロットコンテンツで紹介した親コンポーネントのコードと、スロットアウトレットの子コンポーネントを組み合わせると、最終的に表示されるコードは以下のようになります。

```vue
<div>
  <!-- スロットコンテンツがスロットアウトレットにレンダリングされている -->
  スロットコンテンツ
</div>
```

### 名前付きスロット

コンポーネントに複数のスロットを渡したい場合や、コンテンツを識別しやすいように特定の名前を付けたい場合があります。このような場合、名前付きスロットを使用することができます。

名前付きスロットを定義するには、`name` 属性を指定する必要があります。

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

スロットコンテンツには、`DOM` をそのまま記述することが可能なので、テキストを `p` 要素で囲って渡していることにも注目です。

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

::: tip ヒント
`name` 属性がない `<slot />` は暗黙的に `default` という `name` が設定されています。
つまり、 `<slot name="default" />` と同じ意味になります。もちろん親コンポーネントでも `<template #default>` と記述することが可能です。
:::


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
            <p>{{ item.description }}</p>
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
    <slot name="body" />
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

以上で、スロットの置き換えが完了です。見た目上の変化はありませんが、`body` のスロットコンテンツが表示されているかと思います。

::: tip +1 チャレンジ
ここまでの学習が完了した人は、以下の内容にも挑戦してみましょう。
:::

## スロットにコンポーネントを定義する

### スロットに複数要素を定義する

カードに表示する内容で、商品詳細ページのリンクを追加したいと考えたとします。`slot` には複数の HTML 要素を定義することもできるので、`a` 要素を追加してリンクを設定してみましょう。

商品ごとにリンクが異なっていたり、そもそも商品詳細ページがない商品もあるかもしれません。そのような時でも、`slot` を使用して柔軟に対応が可能です。まず、商品リストの定義に詳細ページのリンクを追加します。

#### App.vue / script

```vue{15}
<script setup>
import { ref } from 'vue'
import Card from './components/Card.vue'

const items = ref([
  {
    id: 1,
    name: 'アボカドディップバケット',
    description:
      '刻んだ野菜をアボカドと混ぜてディップに。こんがり焼いたバゲットとお召し上がりください。',
    price: 480,
    image: '/images/item1.jpg',
    soldOut: false,
    selected: false,
    link: 'https://handson.vuejs-jp.org/'
  },
  //省略
])
</script>
```

今回はダミーでハンズオンのリンクを設定しています。次に、スロットコンテンツの修正をします。

#### App.vue / template

```vue{10}
<template>
<!-- 省略-->
        <Card
          :id="item.id"
          :image="item.image"
          :name="item.name"
          :price="item.price">
          <template #body>
            <p>{{ item.description }}</p>
            <a v-if="item.link" :href="item.link">リンク</a>
          </template>
        </Card>
<!-- 省略-->
</template>
```

`a` 要素へ商品詳細ページのリンクを設定していますが、`v-if` を使用して、詳細ページのリンク情報が設定されていない場合は表示されないようにしています。

### スロットコンテンツをコンポーネント化する

スロットコンテンツへは、HTML 要素だけでなく、コンポーネントも定義することが可能です。スロットコンテンツをコンポーネント化して、表示されるか確認してみましょう。

まずは `components` 配下に `CardBody.vue` を新規で作成して、`props` の定義も行います。`props` では `description` と `link` を受け付けます。

#### CardBody.vue

```vue
<script setup>
defineProps({
  description: {
    type: String,
    default: '',
    required: false
  },
  link: {
    type: String,
    default: '',
    required: false
  },
});
</script>

<template>
  <p>{{ description }}</p>
  <a v-if="link" :href="link">リンク</a>
</template>
```

コンポーネントの作成ができたので、スロットコンテンツを置き換えます。また、`CardBody` コンポーネントを `import` することを忘れないようにしましょう。

#### App.vue

```vue{4,18-20}
<script setup>
import { ref } from 'vue'
import Card from './components/Card.vue'
import CardBody from './components/CardBody.vue';

//省略
</script>

<template>
<!-- 省略-->
        <Card
          :id="item.id"
          :image="item.image"
          :name="item.name"
          :description="item.description"
          :price="item.price">
          <template #body>
            <CardBody
              :description="item.description"
              :link="item.link"/>
          </template>
        </Card>
<!-- 省略-->
</template>
```

以上で、スロットコンテンツへのコンポーネントの定義が完了です。

+1 チャレンジでは、スロットコンテンツへの複数要素の定義と、コンポーネントの定義を行い、レンダリングされることが確認できたと思います。
