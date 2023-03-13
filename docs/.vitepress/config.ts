import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ja-JP',
  title: 'Vue3 Hands-on',
  description: 'Vue.js-jp Vue3 Hands-on',
  head: [['link', { rel: 'icon', href: '/images/favicon-32.png' }]],
  themeConfig: {
    siteTitle: 'Vue3 ハンズオン',
    sidebar: [
      {
        text: '準備編',
        items: [
          {
            text: '環境構築',
            link: '/setup'
          },
          {
            text: 'プロジェクトの作成',
            link: '/create'
          }
        ]
      },
      {
        text: '本編',
        items: [
          {
            text: 'ハンズオンの概要',
            link: '/overview'
          },
          {
            text: 'data を定義し、商品をレンダリングする',
            link: '/rendering'
          },
          {
            text: 'v-for で商品を複数表示する',
            link: '/v-for'
          },
          {
            text: 'v-if で表示・非表示を切り替える',
            link: '/v-if'
          },
          {
            text: '関数で価格にカンマを入れる',
            link: '/methods'
          },
          {
            text: '@click で商品を選択する',
            link: '/event'
          },
          {
            text: '商品をコンポーネント化する',
            link: '/component'
          }
        ]
      }
    ]
  }
})
