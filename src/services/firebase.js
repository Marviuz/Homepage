import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAXQNY541qpHzDuxxpwtvMn8cyCt4cKtYE',
  authDomain: 'my-homepage-1c702.firebaseapp.com',
  databaseURL: 'https://my-homepage-1c702.firebaseio.com',
  projectId: 'my-homepage-1c702',
  storageBucket: 'my-homepage-1c702.appspot.com',
  messagingSenderId: '732627148929',
  appId: '1:732627148929:web:4cf813ddb1fd29ec'
})

Vue.use({
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$firebase', {
      value: app
    })
  }
})

Vue.use({
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$database', {
      value: ref => app.database().ref(ref)
    })
  }
})

export default {
  database: app.database(),
  auth: app.auth()
}
