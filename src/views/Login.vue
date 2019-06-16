<template>
  <v-container fill-height>
    <v-layout
      fill-height
      justify-center
      align-center
    >
      <v-btn @click="loginWithGoogle">
        Login with Google
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  methods: {
    loginWithGoogle () {
      this.$firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          if (res) return this.$router.replace('/')
        })
        .catch(err => console.error('not logged in', err.message))
    }
  }
}
</script>
