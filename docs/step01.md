# Step 1 - 開発環境の構築

## 前提とする環境

- エディタ: Visual Studio Code
- 開発言語: JavaScript
- 利用するツール: Node.js, Vue CLI, Vetur

## Node.js のインストール

### 既にインストールされているかどうかの確認

ターミナルから以下を実行してみます。

```sh
node -v
```

バージョン番号が返ってきたら、Node.js はインストールされていますので、以下の手順は飛ばして構いません。

```sh
$ node -v
v14.16.0
```

### セットアップ

Node.js がインストールされていない場合は、 以下のページから各 OS 用のインストーラーをダウンロードして、セットアップして下さい。

- [Node.js 公式サイトのダウンロードページ](https://nodejs.org/ja/download/)

もし、Node.js のバージョンを切り替えて使いたい場合は、バージョンマネージャの利用を検討してください。以下は主要なバージョンマネージャへのリンクです。セットアップについては、それぞれのドキュメントを参照して下さい。

#### Mac でよく使われるバージョンマネージャ

- [nodenv](https://github.com/nodenv/nodenv)
- [nvm](https://github.com/nvm-sh/nvm)

#### Windows でよく使われるバージョンマネージャ

- [nvm-windows](https://github.com/coreybutler/nvm-windows)
- [nodist](https://github.com/nullivex/nodist)

## Vue CLI のインストール

Vue.js のアプリケーション開発では、開発ツールである [Vue CLI](https://cli.vuejs.org/) を利用します（[Vite](https://vitejs.dev/) を利用する方法もありますがここでは割愛します）。

ターミナルから以下のコマンドを実行して `Vue CLI` をインストールします。

```sh
npm install -g @vue/cli
```

`Vue CLI` が正しくインストールされた場合は以下のコマンドでバージョン番号を確認できます。

```sh
vue --version
```

この方法は、npm の環境に `Vue CLI` がグローバルインストールされます。グローバルインストールをせずに、`npx` を利用する方法もあります。詳細は [Vue CLI 公式ドキュメント](https://cli.vuejs.org/guide/cli-service.html#using-the-binary) を参照して下さい。

## Vetur のインストール

Vetur は Vue.js の開発をサポートする VSCode の拡張です。`.vue` ファイルのシンタックスハイライトやインテリセンスによる補完ができるようになります。詳細は、[Vetur 公式ドキュメント](https://vuejs.github.io/vetur/) を参照して下さい。

Vetur をインストールするには、VSCode が入っているマシンで、 [Vetur - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=octref.vetur) にアクセスし `Install` ボタンをクリックします。

---
[Next](step02.md)