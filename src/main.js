import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'

import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

// TODO: add manufest file (progressive web app)
// https://developer.mozilla.org/en-US/docs/Web/Manifest

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
