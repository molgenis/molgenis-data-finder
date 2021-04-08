import Vue from 'vue'
import App from './App.vue'

import '@molgenis-ui/components-library/dist/components-library.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
