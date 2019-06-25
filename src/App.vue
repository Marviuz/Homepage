<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title>
        <v-icon class="mr-2">
          home
        </v-icon>
        <span>I'm Home!</span>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          v-if="$firebase.auth().currentUser"
          depressed
          @click="logoutFromGoogle()"
        >
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-snackbar
        color="red"
        :value="!isConnected['.value']"
        :timeout="0"
        top
      >
        <v-layout
          align-center
          grid-list-lg
        >
          <v-flex>
            <v-icon color="red darken-4">
              warning
            </v-icon>
          </v-flex>
          <v-flex>
            <span class="headline">
              No network!
            </span>
          </v-flex>
        </v-layout>
      </v-snackbar>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      isConnected: false
    }
  },
  firebase () {
    return {
      isConnected: this.$database('.info/connected')
    }
  },
  methods: {
    logoutFromGoogle () {
      this.$firebase.auth().signOut()
        .then(() => this.$router.replace('login'))
    }
  }
}
</script>
