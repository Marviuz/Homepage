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
      <v-toolbar-items v-if="$firebase.auth().currentUser">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              flat
              v-on="on"
            >
              <v-avatar
                :size="40"
                class="mr-2"
              >
                <img
                  :src="$firebase.auth().currentUser.photoURL"
                  :alt="$firebase.auth().currentUser"
                >
              </v-avatar>
              {{ $firebase.auth().currentUser.displayName }}
            </v-btn>
          </template>
          <v-list>
            <v-list-tile @click="logoutFromGoogle">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
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
