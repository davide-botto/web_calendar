import Vue from 'vue'
import Vuex from 'vuex'
import { deadlines } from "./deadlines.module";
import {categories} from "./categories.module";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    deadlines,
    categories
  }
})
