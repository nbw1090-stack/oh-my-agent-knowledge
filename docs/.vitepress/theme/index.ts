import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ResourceGrid from './components/ResourceGrid.vue'
import Timeline from './components/Timeline.vue'
import FreshnessBadge from './components/FreshnessBadge.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ResourceGrid', ResourceGrid)
    app.component('Timeline', Timeline)
    app.component('FreshnessBadge', FreshnessBadge)
  },
} satisfies Theme
