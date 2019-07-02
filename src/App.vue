<template>
  <v-app
    :style="{ backgroundColor: theme.primary, backgroundImage: siteBg ? `url(${siteBg})` : null }"
    :class="`${siteBg ? 'app-custom': null}`"
  >
    <v-toolbar
      app
      :color="lightenOrDarken(theme.primary)"
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
            <v-list-tile @click="changeColor.dialog = true">
              <v-list-tile-content>
                <v-list-tile-title>Change color</v-list-tile-title>
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
          <v-flex shrink>
            <v-icon color="error darken-4">
              warning
            </v-icon>
          </v-flex>
          <v-flex>
            <span class="headline pl-2">
              No network!
            </span>
          </v-flex>
        </v-layout>
      </v-snackbar>

      <v-snackbar
        color="error"
        :value="saveError.value"
        top
      >
        <v-layout
          align-center
          grid-list-lg
        >
          <v-flex shrink>
            <v-icon color="error darken-4">
              warning
            </v-icon>
          </v-flex>
          <v-flex>
            <span class="headline pl-2">
              {{ saveError.msg }}
            </span>
          </v-flex>
        </v-layout>
      </v-snackbar>

      <v-snackbar
        :value="isSaved"
        top
      >
        <div class="font-weight-thin headline">
          Saved changes!
        </div>
      </v-snackbar>
      <router-view />
    </v-content>
    <v-dialog
      v-model="changeColor.dialog"
      persistent
      width="500"
    >
      <v-card>
        <v-form @submit.prevent="handleChangeColor">
          <v-toolbar
            :color="theme.primary"
            flat
          >
            <v-card-title
              class="title"
              :style="{ color: theme.text }"
            >
              Customize
            </v-card-title>
          </v-toolbar>
          <v-container grid-list-lg>
            <v-layout grid-list-lg>
              <v-flex xs8>
                <v-layout column>
                  <v-flex grow>
                    <m-color-picker
                      v-model="newTheme.primary"
                      label="Background"
                    />
                  </v-flex>
                  <v-flex grow>
                    <m-color-picker
                      v-model="newTheme.text"
                      label="Text"
                    />
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex
                xs4
                :style="{ pointerEvents: 'none', userSelect: 'none' }"
              >
                <m-site-preview v-model="newTheme" />
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-spacer />
            <v-btn
              depressed
              type="submit"
              :color="theme.primary || 'primary'"
              :style="{ color: theme.text }"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import lightenOrDarken from '@/utils/lighten-darken';

export default {
  data() {
    return {
      newTheme: {
        primary: '#000000',
        text: '#000000',
      },

      isSaved: false,
      saveError: {
        value: false,
        msg: null,
      },

      isConnected: false,
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
    handleChangeColor() {
      this.$database(`${this.$firebase.auth().currentUser.uid}/theme`)
        .update(this.newTheme)
        .then(() => {
          this.isSaved = true;
        })
        .catch((err) => {
          this.saveError = {
            value: true,
            msg: err.message,
          };
        });

      this.changeColor.dialog = false;
      this.newTheme = {
        primary: '#000000',
        text: '#000000',
      };
    },
    logoutFromGoogle() {
      this.$firebase.auth().signOut()
        .then(() => this.$router.go());
    },
    lightenOrDarken(color) {
      if (color) {
        return lightenOrDarken(color, -30);
      }
      return color;
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
