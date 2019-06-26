import Vue from 'vue'
import './components/_globals'
import App from './App.vue'
import firebase from './services/firebase'
import './plugins/vuefire'
import './components/grid'
import './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false

let app

firebase.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
