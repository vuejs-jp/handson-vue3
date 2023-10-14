# 開発環境の構築

## 前提とする環境

- エディタ: Visual Studio Code（以下、VS Code）
  - VS Code の拡張機能：Vue Language Features (Volar)
- 開発言語: JavaScript
- 利用するツール: Node.js

## ターミナルの準備

このハンズオンでは、主にターミナルを使ってコマンドを実行していきます。

::: tip ヒント
ターミナルとは、コマンドと呼ばれる命令文を用いて OS やアプリケーションの操作や設定を行うツールです。
:::

### Mac でのターミナル利用方法

- `アプリケーション - ユーティリティ` 内に標準でインストールされている `ターミナル.app` を起動します
- 利用方法の詳細は Google 検索で "Mac ターミナル 使い方" 等で検索してください

### Windows でのターミナル利用方法

- スタートメニューから `Windows Terminal` を選択して起動します
- なければ、Microsoft Store からインストールします
- 利用方法の詳細は [公式ドキュメント](https://docs.microsoft.com/ja-jp/windows/terminal/) を参照してください

## Node.js のインストール

### 既にインストールされているかどうかの確認

ターミナルに以下のコマンドを入力し、return キーで実行します。

```sh
node -v
```

バージョン番号が表示されたら、Node.js はインストールされていますので、セットアップの手順は飛ばして構いません。

```sh
v18.18.0
```

::: warning 注意
表示されるバージョンはインストールするタイミングによって異なります。

[Vue アプリケーションの作成 - 前提条件](https://ja.vuejs.org/guide/quick-start.html#creating-a-vue-application)より、Node.js のバージョンは 16.0 より最新バージョンをインストールする必要があります。
:::

### セットアップ

Node.js がインストールされていない場合は、 以下のページから各 OS 用のインストーラーをダウンロードして、セットアップしてください。

- [Node.js 公式サイトのダウンロードページ](https://nodejs.org/ja/download/)

なお、ダウンロードページでは `LTS` と `最新版` が選択できるようになっていますが、このハンズオンでは安定版である `LTS` を使うことを推奨します。

::: tip ヒント
LTS は、Long-term Support の略で、長期間サポートされる安定バージョンです。
:::

もし、Node.js のバージョンを切り替えて使いたい場合は、バージョンマネージャーの利用を検討してください。以下は主要なバージョンマネージャーへのリンクです。セットアップについては、それぞれのドキュメントを参照してください。

#### Mac でよく使われるバージョンマネージャー

- [Volta](https://volta.sh/)
- [nodenv](https://github.com/nodenv/nodenv)

#### Windows でよく使われるバージョンマネージャー

- [Volta](https://volta.sh/)
- [nvm-windows](https://github.com/coreybutler/nvm-windows)

## VS Code のセットアップ

このハンズオンでは、VS Code を使って開発していきます。

::: tip ヒント
VS Code を既にお使いの場合はこのセクションは飛ばしてください。
:::

### VS Code のインストール

1. [VS Code 公式ダウンロードページ](https://code.visualstudio.com/download) からお使いの OS に合わせたインストーラーをダウンロードします
1. インストーラーの指示に従ってインストールします
   - インストールの詳細は [公式ドキュメント](https://code.visualstudio.com/docs/setup/setup-overview) を確認してください

### Vue Language Features (Volar) 拡張機能のインストール

`Vue Language Features (Volar)` は Vue.js の開発をサポートする VS Code の拡張機能です。`.vue` ファイルのシンタックスハイライトやインテリセンスによる補完ができるようになります。詳細は、[language-tools の GitHub リポジトリ](https://github.com/vuejs/language-tools) を参照してください。

Volar をインストールするには、VS Code が入っているマシンで、 [Vue Language Features (Volar) - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Vue.volar) にアクセスし Install ボタンをクリックします。
