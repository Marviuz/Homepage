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

    <v-dialog
      v-model="dialog"
      persistent
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline">
          Error
        </v-card-title>
        <v-card-text>text</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            @click.native="dialog = false"
          >
            Reload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data () {
    return {
      dialog: false,
      message: null
    }
  },
  methods: {
    loginWithGoogle () {
      this.$firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          if (res) return this.$router.replace('/')
        })
        .catch(err => {
          this.message = `An unexpected error occured, ${err.message}!`
          this.dialog = true
        })
    }
  }
}
</script>
