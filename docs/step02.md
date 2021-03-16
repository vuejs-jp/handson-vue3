# Step 2 - プロジェクトの作成

## Vue CLI でのプロジェクト新規作成

1. Vue CLI でプロジェクトを新規作成します。ターミナルでプロジェクトを作成する任意のディレクトリに移動して、以下のコマンドを実行します（コマンド実行後はそのまま待機しておいてください）。以下ではプロジェクト名を `vue3-lab` としています（プロジェクト名は任意です）。

    ```sh
    vue create vue3-lab
    ```

1. 実行後のプロンプト `Please pick a preset` では、このワークショップでは以下のように `Default (Vue 3 Preview)` を選択します。

    ```sh
    ? Please pick a preset:
      Default ([Vue 2] babel, eslint)
      ❯ Default (Vue 3 Preview) ([Vue 3] babel, eslint)
      Manually select features
    ```

1. 次のプロンプト `Pick the package manager to use when installing dependencies:` では、好みのパッケージマネージャーを選んでください。（このハンズオンでは、npm を前提に説明を進めますので、適宜読み替えてください）

    ```sh
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

1. ブラウザに 「Welcome to Your Vue.js App」 等と表示されていれば、無事にプロジェクトの作成が成功しています。

    ![vue-app](images/vue-app.png)

    `vue create` コマンドの詳細は [Creating a Project \| Vue CLI](https://cli.vuejs.org/guide/creating-a-project.html) を確認してください。

---

[Previous](step01.md) | [Next](step03.md)
