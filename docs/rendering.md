# data を定義し、商品をレンダリングする

## VS Code の起動

まず、VS Code で先ほど作成したプロジェクトを開きましょう。プロジェクトの開き方は 2 通りありますので、使いやすい方で起動して下さい。

#### コマンドから起動する方法

カレントディレクトリ（プロジェクトのディレクトリ、今回の例では `vue3-lab`）で以下のコマンドを実行します

```bash
code .
```

#### GUI で起動する方法

アプリケーションのメニューで Visual Studio Code を起動し、「ファイル」-「フォルダーを開く」で自分の環境のプロジェクトディレクトリを選択します。

![vscode](./images/vscode.png)


## 画像ファイルの配置

次に、ハンズオンで使う商品の画像を用意しましょう。ハンズオン用の画像ファイル（[vue3-lab-handson-images.zip](./vue3-lab-handson-images.zip 'vue3-lab-handson.zip')）をダウンロードおよび解凍します。

あらかじめ作成しておいた Vue.js プロジェクトを開き、 `public` ディレクトリの下に `images` ディレクトリを新しく作成します。作成した `images` ディレクトリの中に、先ほど解凍した画像ファイルをすべてコピーします。

## コード変更の準備

ここからは、デフォルトで生成された Vue のプロジェクトを独自のコードに置き換えていきます。まず、今後のステップで利用しない不要なコードやファイルを削除していきましょう。

まず、`src/main.js` を以下のように編集します。具体的には 4 行目のコードを削除します（今回はこの css を利用しないため）。

変更前（`src/main.js`）

<<< @/../examples/overview/src/main.js

変更後（`src/main.js`）

<<< @/../examples/rendering/src/main.js

次に、今後のステップで利用しないファイルをディレクトリごと削除します。削除する対象は以下のディレクトリです。

- `src/assets/` 以下すべて
- `src/components/` 以下すべて

## Mustache 構文

::: v-pre
Vue.js では、`{{ }}` のような `Mustache` 構文を使ってテキストをレンダリングできます。以下の例では script 部分の message を表示しています。message の内容が変更されると、それに応じて表示も更新されます。
:::

```vue
<template>
  <div>{{ message }}</div>
</template>

<script setup>
import { ref } from 'vue'
const message = ref('Welcome to Vue Handson!')
</script>
```

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

出力例

```
Welcome to Vue Handson!
```

::: tip ヒント
::: v-pre
mustache とは口髭を指す英語で、二重中括弧 `{{ }}` が口髭のように見えることから命名されました。
:::

## 商品をレンダリング

プロジェクトのファイルを書き換えて、商品をレンダリングしていきましょう。まず、`src/App.vue` ファイルの template を次のように変更します。

変更前（template）

<<< @/../examples/overview/src/App.vue#template

変更後（template）

<<< @/../examples/rendering/src/App.vue#template

次に、`src/App.vue` ファイルの script を次のように変更します。

変更前（script）

<<< @/../examples/overview/src/App.vue#script

変更後（script）

<<< @/../examples/rendering/src/App.vue#script

見た目を設定するために style タグの中身を以下のように置き換えます。

<<< @/../examples/rendering/src/App.vue#style

これで、商品を 1 つレンダリングできました。

---

::: tip +1 チャレンジ
ここまでの学習が完了した人は、以下の内容にも挑戦してみましょう。
:::

## 商品の内容を変更
商品の内容を変更し、表示に反映されることを確認してみましょう。商品名 `name`、概要文 `description`、価格 `price` をそれぞれ適当に変更します。

```diff
<script setup>
import { ref } from 'vue'
const item = ref({
-  name: "アボカドディップバケット",
-  description: "刻んだ野菜をアボカドと混ぜてディップに。こんがり焼いたバゲットとお召し上がりください。",
-  price: 480,
+  name: "アボカドソースバケット",
+  description: "刻んだ野菜をアボカドと混ぜ、優しい味のソースに。こんがり焼いたバゲットとお召し上がりください。",
+  price: 320,
   image: "/images/item1.jpg"
})
</script>
```

このようにデータを更新したとき、自動的に表示が更新される状態のことを、「リアクティブ」と言います。
