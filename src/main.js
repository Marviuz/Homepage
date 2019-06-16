import Vue from 'vue'
import './components/_globals'
import App from './App.vue'
import firebase from './plugins/firebase'
import './plugins/vuefire'
import './plugins/grid'
import './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false

let app

firebase.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
