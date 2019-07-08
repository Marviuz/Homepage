<template>
  <v-app
    :style="{ backgroundColor: theme.primary, backgroundImage: siteBg ? `url(${siteBg})` : null }"
    :class="`${siteBg ? 'app-custom': null}`"
  >
    <div :style="{ display: 'flex', height: '100%', opacity: (opacity / 100).toFixed(2) }">
      <v-toolbar
        app
        :color="theme.primary && $tinycolor(theme.primary).darken().toString()"
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
        <v-layout
          justify-end
          mr-2
        >
          <v-flex
            :style="{ transition: 'all .3s ease' }"
            :grow="searchField.isFocused"
            :shrink="!searchField.isFocused"
          >
            <v-form @submit.prevent="handleGoogleSearch">
              <v-text-field
                v-if="$firebase.auth().currentUser"
                v-model="searchField.value"
                prepend-inner-icon="$vuetify.icons.google"
                append-icon="search"
                :solo="theme.primary ? $tinycolor(theme.primary).isLight() : true"
                :solo-inverted="theme.primary ? !$tinycolor(theme.primary).isLight() : false"
                label="Search Google"
                :background-color="theme.primary"
                autofocus
                hide-details
                @focus="searchField.isFocused = true"
                @focusout="searchField.isFocused = false"
              />
            </v-form>
          </v-flex>
        </v-layout>
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
              <v-list-tile>
                <v-list-tile-action>
                  <v-slider
                    v-model="opacity"
                    thumb-label
                    :color="theme.primary"
                    width="100%"
                    :max="100"
                    :min="0"
                  >
                    <template v-slot:thumb-label="props">
                      <span>
                        {{ props.value }}%
                      </span>
                    </template>
                  </v-slider>
                </v-list-tile-action>
                <v-list-tile-action v-if="theme.opacity !== opacity">
                  <v-btn
                    class="ml-auto"
                    flat
                    icon
                    :color="theme.primary"
                    @click="saveOpacity"
                  >
                    <v-icon>save</v-icon>
                  </v-btn>
                </v-list-tile-action>
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
          <v-btn
            icon
            @click="$router.go()"
          >
            <v-icon>refresh</v-icon>
          </v-btn>
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
              <v-spacer />
              <v-btn
                icon
                :color="theme.text"
                flat
                @click="handleColorReset"
              >
                <v-icon>close</v-icon>
              </v-btn>
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
    </div>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import validator from 'validator';

export default {
  data() {
    return {
      searchField: {
        value: null,
        isFocused: false,
      },

      newTheme: {
        primary: '#000000',
        text: '#000000',
      },

      opacity: 0,

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
  watch: {
    'theme.opacity': {
      immediate: true,
      handler(val) {
        if (val) this.opacity = val;
        else this.opacity = 100;
      },
    },
  },
  methods: {
    handleGoogleSearch() {
      if (validator.isURL(this.searchField.value, { require_protocol: true })) { // Has Protocol?
        window.open(this.searchField.value);
      } else if (validator.isURL(this.searchField.value)) { // Has not protocol
        window.open(`http://${this.searchField.value}`);
      } else { // Is not URL
        window.open(`http://google.com/search?q=${encodeURI(this.searchField.value)}`);
      }
      this.searchField.value = null;
    },
    saveOpacity() {
      this.$database(`${this.$firebase.auth().currentUser.uid}/theme`)
        .update({ opacity: this.opacity })
        .then(() => {})
        .catch((err) => {
          this.saveError = {
            value: true,
            msg: err.message,
          };
        });
    },
    handleChangeColor() {
      this.$database(`${this.$firebase.auth().currentUser.uid}/theme`)
        .update(this.newTheme)
        .then(() => {})
        .catch((err) => {
          this.saveError = {
            value: true,
            msg: err.message,
          };
        });

      this.handleColorReset();
    },
    handleColorReset() {
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
  },
};
</script>

<style lang="scss">
.app-custom {
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-attachment: fixed !important;
}

::-webkit-scrollbar {
  width: 3px;
  background-color: rgba(0, 0, 0, .1);

  &:hover {
    background-color: rgba(0, 0, 0, .3);
  }
}

::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background-color: rgba(0, 0, 0, .3);
}
</style>
