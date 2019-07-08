<template>
  <v-menu
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="value"
        :label="label"
        readonly
        v-on="on"
      />
    </template>
    <chrome-picker
      :value="value"
      class="chrome-color-picker"
      @input="$emit('input', $event.hex)"
    />
  </v-menu>
</template>

<script>
import { Chrome } from 'vue-color';

export default {
  components: { 'chrome-picker': Chrome },
  model: {
    props: 'value',
    event: 'input',
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: '#000000',
    },
  },
};
</script>

<style lang="scss" scoped>
.chrome-color-picker {
  width: 100%;
  * {
    font-family: Roboto, sans-serif !important;
  }
}
</style>
