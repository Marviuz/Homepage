import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import Google from '@/components/icons/Google.vue';

Vue.use(Vuetify, {
  iconfont: 'md',
  icons: {
    google: {
      component: Google,
    },
  },
});
