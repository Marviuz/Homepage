<template>
  <v-app
    :dark="darkMode"
    :style="$firebase.auth().currentUser && siteBg ? { backgroundImage: `url(${siteBg['.value']})` } : null"
    :class="$firebase.auth().currentUser && siteBg ? 'app-custom': null"
  >
    <v-toolbar app>
      <v-toolbar-title>
        <v-icon class="mr-2">
          home
        </v-icon>
        <span>I'm Home!</span>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items v-if="$firebase.auth().currentUser">
        <v-menu
          offset-y
          :close-on-content-click="false"
        >
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
            <v-list-tile>
              <v-list-tile-action>
                <v-switch
                  v-model="darkMode"
                  label="Dark Mode"
                />
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile @click="changeColor.dialog = true">
              <v-list-tile-content>
                <v-list-tile-title>Change color</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Help</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="logoutFromGoogle">
              <v-list-tile-content>
                <v-list-tile-title>Logout</v-list-tile-title>
              </v-list-tile-content>
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
    <v-dialog
      v-model="changeColor.dialog"
      width="500"
    >
      <v-card>
        <v-card-text>
          <m-color-picker />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      isConnected: false,
      darkMode: false,
      siteBg: null,
      changeColor: {
        dialog: false
      }
    }
  },
  firebase () {
    return {
      isConnected: this.$database('.info/connected'),
      siteBg: this.$database(`${this.$firebase.auth().currentUser.uid}/bgImage`)
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

<style lang="scss">
.app-custom {
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-attachment: fixed !important;

  & > * {
    opacity: .95;
  }
}
</style>
