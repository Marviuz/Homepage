<template>
  <v-container
    fluid
    fill-height
    class="align-items-start"
    @contextmenu.self.prevent="handleContainerContextmenu"
  >
    <grid
      ref="grid"
      :key="JSON.stringify(items)"
      :draggable="editMode"
      :sortable="true"
      :items="items"
      :style="{ position: 'initial' }"
      :cell-height="350"
      :cell-width="300"
      center
      @sort="handleChange"
      @contextmenu.self.native.prevent="handleContainerContextmenu"
    >
      <template
        slot="cell"
        slot-scope="props"
      >
        <m-card-renderer
          :item-details="props.item"
          :editable="editMode"
          @contextmenu.native.prevent="evt => handleCardContextmenu(evt, props.item)"
        />
      </template>
    </grid>

    <v-menu
      v-model="contextMenu.isVisible"
      :min-width="250"
      :max-width="250"
      :position-x="contextMenu.position.x"
      :position-y="contextMenu.position.y"
      offset-y
      close-on-click
    >
      <v-list>
        <v-list-tile @click="addSite.dialog = true, addSite.mode = 'add'">
          <v-list-tile-title>Add Site</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-if="!editMode"
          @click="editMode = true"
        >
          <v-list-tile-title>Edit</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-if="editMode"
          @click="saveChangesTofirebase"
        >
          <v-list-tile-title>Save</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-menu
      v-model="cardContextMenu.isVisible"
      :min-width="250"
      :max-width="250"
      close-on-click
      :position-x="cardContextMenu.position.x"
      :position-y="cardContextMenu.position.y"
      offset-y
    >
      <v-list>
        <v-list-tile @click="addSite.dialog = true">
          <v-list-tile-title>Edit</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="$database(`/${$firebase.auth().currentUser.uid}/${addSite.key}`).remove()">
          <v-list-tile-title>Delete</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-dialog
      v-model="messageDialog.dialog"
      width="50%"
    >
      <v-card>
        <v-card-text>
          <v-layout
            justify-center
            align-center
          >
            <div class="font-weight-thin display-3 text-xs-center">
              {{ messageDialog.message }}
            </div>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar
      :value="editMode"
      top
      :timeout="0"
    >
      <div class="font-weight-thin headline">
        Edit mode
      </div>

      <v-btn
        flat
        @click="saveChangesTofirebase"
      >
        Save
      </v-btn>
    </v-snackbar>

    <v-snackbar
      :value="editSaved"
      top
    >
      <div class="font-weight-thin headline">
        Saved changes!
      </div>
    </v-snackbar>

    <v-dialog
      v-model="addSite.dialog"
      width="50%"
      persistent
    >
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>{{ addSite.mode.toUpperCase() }} Site</v-toolbar-title>
          <v-spacer />
          <v-btn
            icon
            @click="reset()"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <form @submit.prevent="addSiteToFirebase">
          <v-card-text>
            <v-text-field
              v-model="addSite.name"
              label="Name"
              required
            />
            <v-text-field
              v-model="addSite.link"
              label="Link"
              required
            />
            <v-text-field
              v-model="addSite.logo"
              label="Logo"
              required
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              depressed
              color="red"
              @click="reset"
            >
              Cancel
            </v-btn>
            <v-btn
              flat
              type="submit"
            >
              {{ addSite.mode === 'add' ? 'Add' : 'Save' }}
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      editMode: false,
      editSaved: false,

      messageDialog: {
        dialog: false,
        message: null
      },

      addSite: {
        mode: 'add',
        dialog: false,
        link: null,
        logo: null,
        name: null
      },

      contextMenu: {
        isVisible: false,
        position: {
          x: 0,
          y: 0
        }
      },
      cardContextMenu: {
        isVisible: false,
        position: {
          x: 0,
          y: 0
        }
      },
      items: [],
      newOrder: []
    }
  },
  firebase () {
    return {
      items: this.$database(this.$firebase.auth().currentUser.uid)
    }
  },
  methods: {
    addSiteToFirebase () {
      const { link, logo, name, mode, key } = this.addSite

      if (mode === 'add') {
        this.$database(this.$firebase.auth().currentUser.uid)
          .push({
            site: link,
            logo,
            name
          })
          .then(() => {
            this.editSaved = {
              dialog: true,
              message: 'Saved successfully!'
            }
            this.reset()
          })
          .catch(err => {
            this.messageDialog = {
              dialog: true,
              message: err.message
            }
          })
      } else {
        this.$database(`/${this.$firebase.auth().currentUser.uid}/${key}`)
          .update({
            site: link,
            logo,
            name
          })
          .then(() => {
            this.editSaved = {
              dialog: true,
              message: 'Saved successfully!'
            }
            this.reset()
          })
          .catch(err => {
            this.messageDialog = {
              dialog: true,
              message: err.message
            }
          })
      }

      this.reset()
    },
    reset () {
      this.addSite = {
        mode: this.addSite.mode,
        dialog: false,
        link: null,
        logo: null,
        name: null
      }
    },
    handleChange ({ items }) {
      this.newOrder = items.map(({ item }) => ({ logo: item.logo, name: item.name, site: item.site }))
    },
    saveChangesTofirebase () {
      this.editMode = false
      this.$database(this.$firebase.auth().currentUser.uid).set(this.newOrder)
        .then(() => {
          this.editSaved = true
        })
        .catch(err => {
          this.messageDialog = {
            dialog: true,
            message: err.message
          }
        })
    },
    handleContainerContextmenu (evt) {
      this.cardContextMenu.isVisible = false

      this.contextMenu.isVisible = true
      this.contextMenu.position.x = evt.clientX
      this.contextMenu.position.y = evt.clientY
    },
    handleCardContextmenu (evt, data) {
      this.contextMenu.isVisible = false

      this.addSite = {
        mode: 'edit',
        key: data['.key'],
        link: data.site,
        logo: data.logo,
        name: data.name
      }

      this.cardContextMenu.isVisible = true
      this.cardContextMenu.position.x = evt.clientX
      this.cardContextMenu.position.y = evt.clientY
    }
  }
}
</script>

<style scoped>
.align-items-start {
  align-items: start;
}
</style>
