# プロジェクトの作成

## Vue CLI でのプロジェクト新規作成

1. アプリケーションを作成するディレクトリを決めておきます（この例では `vue3-lab` としています）。Vue CLI でプロジェクトを作成すると、決めたディレクトリの配下にファイル群が生成されます。

1. ターミナルで、プロジェクトのディレクトリを作成する親ディレクトリに移動します。もし、ホームディレクトリの直下にプロジェクトを作成するのであれば、ターミナルで以下のコマンドを使って移動しておきます。

   > ホームディレクトリとは、ユーザー固有のファイルやフォルダを保存できる領域であり、通常ユーザー名でディレクトリが作成されています

   ```sh
   cd ~
   ```

1. Vue CLI でプロジェクトを新規作成します。ターミナルで以下のコマンドを実行します（コマンド実行後はそのまま待機しておいてください）。プロジェクトのディレクトリは Vue CLI によって自動的に作成されます。

   > なお、このハンズオンでは `Vue CLI v4.5.13` を使用して説明しています。

```sh
vue create vue3-lab
```

1. 実行後のプロンプト `Please pick a preset` では、このワークショップでは以下のように `Default (Vue 3) ([Vue 3] babel, eslint) ` を選択します。

   > プロンプト内では、矢印キーで移動、Space キーで選択、Enter キーで確定ができます

   ```sh
   Vue CLI v4.5.13
   ? Please pick a preset:
     Default ([Vue 2] babel, eslint)
   ❯ Default (Vue 3) ([Vue 3] babel, eslint)
     Manually select features
   ```

1. 次のプロンプト `Pick the package manager to use when installing dependencies:` では、好みのパッケージマネージャーを選んでください。（このハンズオンでは、npm を前提に説明を進めますので、適宜読み替えてください）

   ```sh
   Vue CLI v4.5.13
   ? Please pick a preset: Default (Vue 3) ([Vue 3] babel, eslint)
   ? Pick the package manager to use when installing dependencies: 
     Use Yarn 
   ❯ Use NPM 
   ```

## プロジェクトの起動

1. `vue create` の処理が完了したら、カレントディレクトリを作成したプロジェクトのディレクトリに移動し（この例では `vue3-lab`）、プロジェクトを起動します。

   ```sh
   cd vue3-lab
   npm run serve
   ```

1. `npm run serve` の実行が完了したら、ブラウザで `http://localhost:8080/` にアクセスします。

1. ブラウザに「Welcome to Your Vue.js App」等と表示されていれば、無事にプロジェクトの作成が成功しています。

   ![vue-app](./images/vue-app.png)

   `vue create` コマンドの詳細は [Creating a Project \| Vue CLI](https://cli.vuejs.org/guide/creating-a-project.html) を確認してください。

---

[Previous](setup.md) | [Next](overview.md)
