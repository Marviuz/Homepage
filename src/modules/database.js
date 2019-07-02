import { firebaseAction, vuexfireMutations } from 'vuexfire';
import firebase from '@/services/firebase';

export default {
  namespaced: true,
  state: {
    obj: {},
  },
  mutations: {
    RESET_OBJ(state) {
      state.obj = {};
    },
    ...vuexfireMutations,
  },
  actions: {
    setDatabase({ commit }) {
      commit('RESET_OBJ');
    },
    setDatabaseViaVuexfire: firebaseAction(({ bindFirebaseRef }) => bindFirebaseRef('obj', firebase.database.ref(firebase.auth.currentUser.uid))),
  },
};
