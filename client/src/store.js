import Vuex from "vuex";
import Vue from "vue";
import "vue-router/dist/vue-router";
import call from "./fetch";
Vue.use(Vuex);
const axios = require("axios").default;

const store = new Vuex.Store({
  state: {
    navbarActive: null,
    login: null,
    items: null,
  },
  getters: {
    undoneItems: (state) => {
      return state.items === null
        ? null
        : state.items.filter((item) => item.status === false);
    },
    doneItems: (state) => {
      return state.items === null
        ? null
        : state.items.filter((item) => item.status === true);
    },
  },
  mutations: {
    setLists: (state, payload) => {
      state.items = payload;
    },
  },
});

export default store;
