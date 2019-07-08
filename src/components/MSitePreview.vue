<template>
  <div
    :key="JSON.stringify({ theme, value })"
    :style="{ backgroundColor: value.primary, height: '100%' }"
  >
    <div
      :style="{
        backgroundColor: $tinycolor(value.primary).darken().toString(),
        height: '20px',
        padding: '0 8px',
        lineHeight: 'unset',
        fontSize: '.9rem',
        display: 'flex',
        alignItems: 'center',
        color: value.text
      }"
    >
      I'm home
    </div>

    <div :style="{ padding: '6px', display: 'flex', justifyContent: 'center' }">
      <div
        v-for="i in 3"
        :key="i"
        :style="{
          backgroundColor: $tinycolor(value.primary).darken().toString(),
          height: '40px',
          width: '40px',
          margin: '0 6px'
        }"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Object,
      default() {
        return {
          primary: '#000000',
          text: '#000000',
        };
      },
    },
  },
  computed: mapState({
    theme(state) {
      return state.database.obj.theme;
    },
  }),
};
</script>
