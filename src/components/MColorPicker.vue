<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="colorFormatted"
        v-on="on"
      />
    </template>
    <chrome-picker
      v-model="color"
      class="chrome-color-picker"
    />
  </v-menu>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  components: { 'chrome-picker': Chrome },
  data () {
    return {
      color: {
        rgba: { r: 0, g: 0, b: 0 }
      }
    }
  },
  computed: {
    colorFormatted () {
      const values = []
      for (const [, value] of Object.entries(this.color.rgba)) {
        values.push(value)
      }
      return `rgba(${values.join(', ')})`
    }
  },
  created () {
    console.log(this.$vuetify)
  }
}
</script>

<style lang="scss" scoped>
.chrome-color-picker {
  width: 100%;
  * {
    font-family: Roboto, sans-serif !important;
  }
}
</style>
