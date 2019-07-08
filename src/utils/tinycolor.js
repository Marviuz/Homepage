import Vue from 'vue';
import tinycolor from 'tinycolor2';

Vue.use({
  install() {
    Object.defineProperty(Vue.prototype, '$tinycolor', {
      value: tinycolor,
    });
  },
});
