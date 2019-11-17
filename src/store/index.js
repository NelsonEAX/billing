import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import currency from './modules/currency';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    currency,
  },

  state: {
    // drawer: true,
  },

  getters: {
    // drawer: state => state.drawer,
  },

  mutations: {
  },
  actions: {
  },
});
