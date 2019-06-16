<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title>My Homepage</v-toolbar-title>
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
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  methods: {
    logoutFromGoogle () {
      this.$firebase.auth().signOut()
        .then(() => this.$router.replace('login'))
    }
  }
}
</script>
