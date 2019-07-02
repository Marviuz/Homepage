import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';
import database from './modules/database';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    database,
  },
  mutations: vuexfireMutations,
});
