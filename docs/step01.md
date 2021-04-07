# Step 1 - 開発環境の構築

## 前提とする環境

- エディタ: Visual Studio Code (以下、VSCode)
- 開発言語: JavaScript
- 利用するツール: Node.js, Vue CLI, Vetur

## ターミナルの準備

このハンズオンでは、主にターミナルを使ってコマンドを実行していきます。

> ターミナルとは、コマンドと呼ばれる命令文を用いて OS やアプリケーションの操作や設定をおこなうためのツールです

### Mac でのターミナル利用方法

- `アプリケーション - ユーティリティ` 内に標準でインストールされている `ターミナル.app` を起動します
- 利用方法の詳細は Google 検索で "Mac ターミナル 使い方" 等で検索して下さい

### Windows でのターミナル利用方法

- スタートメニューから `Windows Terminal` を選択して起動します
- なければ、Microsoft Store からインストールします
- 利用方法の詳細は [公式ドキュメント](https://docs.microsoft.com/ja-jp/windows/terminal/) を参照してください。

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

なお、ダウンロードページでは `LTS` と `最新版` が選択できるようになっていますが、このハンズオンでは安定版である `LTS` を使うことを推奨します。

> LTS は、Long-term Support の略で、長期間サポートされる安定バージョンです

- [Node.js 公式サイトのダウンロードページ](https://nodejs.org/ja/download/)

もし、Node.js のバージョンを切り替えて使いたい場合は、バージョンマネージャの利用を検討してください。以下は主要なバージョンマネージャへのリンクです。セットアップについては、それぞれのドキュメントを参照して下さい。

#### Mac でよく使われるバージョンマネージャ

- [nodenv](https://github.com/nodenv/nodenv)
- [nvm](https://github.com/nvm-sh/nvm)

#### Windows でよく使われるバージョンマネージャ

- [nvm-windows](https://github.com/coreybutler/nvm-windows)
- [nodist](https://github.com/nullivex/nodist)

## Vue CLI のインストール

Vue.js を使った開発を始めるにはいくつかの方法があります。ここでは、最も広く普及しており、かつ簡単な方法である [Vue CLI](https://cli.vuejs.org/) を利用した開発方法を紹介します。（[Vite](https://vitejs.dev/) を利用する方法もありますがここでは割愛します）。

ターミナルから以下のコマンドを実行して `Vue CLI` をインストールします。

```sh
npm install -g @vue/cli
```

`Vue CLI` が正しくインストールされた場合は以下のコマンドでバージョン番号を確認できます。

```sh
vue --version
```

この方法は、npm の環境に `Vue CLI` がグローバルインストールされます。グローバルインストールをせずに、`npx` を利用する方法もあります。詳細は [Vue CLI 公式ドキュメント](https://cli.vuejs.org/guide/cli-service.html#using-the-binary) を参照して下さい。

## VS Code のセットアップ

このハンズオンでは、VS Code を使って開発していきます。

> VS Code を既にお使いの場合はこのセクションは飛ばしてください。

### VS Code のインストール

1. [VS Code 公式ダウンロードページ](https://code.visualstudio.com/download) からお使いの OS に合わせたインストーラーをダウンロードしてください。
1. インストーラーの指示に従ってインストールします
   - インストールの詳細は [公式ドキュメント](https://code.visualstudio.com/docs/setup/setup-overview) を確認してください

### Vetur 機能拡張のインストール

Vetur は Vue.js の開発をサポートする VS Code の拡張です。`.vue` ファイルのシンタックスハイライトやインテリセンスによる補完ができるようになります。詳細は、[Vetur 公式ドキュメント](https://vuejs.github.io/vetur/) を参照して下さい。

Vetur をインストールするには、VSCode が入っているマシンで、 [Vetur - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=octref.vetur) にアクセスし `Install` ボタンをクリックします。

---

[Next](step02.md)
