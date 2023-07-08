import Theme from 'vitepress/theme'
import PlusOne from '../components/PlusOne.vue'

export default {
  ...Theme,

  enhanceApp({ app }) {
    app.component('PlusOne', PlusOne)
  }
}
