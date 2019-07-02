<template>
  <v-app
    :dark="darkMode"
    :style="siteBg ? { backgroundImage: `url(${siteBg})` } : null"
    :class="`${siteBg ? 'app-custom': null}`"
  >
    <v-toolbar
      app
      :color="theme.primary"
    >
      <v-toolbar-title>
        <v-icon
          class="mr-2"
          :style="{ color: theme.text }"
        >
          home
        </v-icon>
        <span :style="{ color: theme.text }">I'm Home!</span>
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
              <span :style="{ color: theme.text }">
                {{ $firebase.auth().currentUser.displayName }}
              </span>
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
        color="error"
        :value="!isConnected['.value']"
        :timeout="0"
        top
      >
        <v-layout
          align-center
          grid-list-lg
        >
          <v-flex>
            <v-icon color="error darken-4">
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
        <v-toolbar
          color="primary"
          flat
        >
          <v-toolbar-title class="headline">
            Set colors
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-layout>
            <v-flex xs4>
              <m-color-picker label="Background" />
            </v-flex>
            <v-flex xs4>
              <m-color-picker label="Text" />
            </v-flex>
            <v-flex xs4>
              <m-color-picker label="Something" />
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isConnected: false,
      darkMode: false,
      changeColor: {
        dialog: false,
      },
    };
  },
  computed: {
    ...mapState({
      siteBg(state) {
        return state.database.obj.bgImage;
      },
      theme(state) {
        return state.database.obj.theme || {};
      },
    }),
  },
  firebase() {
    return {
      isConnected: this.$database('.info/connected'),
    };
  },
  methods: {
    logoutFromGoogle() {
      this.$firebase.auth().signOut()
        .then(() => this.$router.go());
    },
  },
};
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
