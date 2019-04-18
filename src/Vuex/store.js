import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: "",
    userEmail: "",
    userIsAuth: null,
    loading: false
  },
  mutations: {
    setAuthUser(state, payload) {
      this.state.userIsAuth = payload;
    },
    loading(state, payload) {
      this.state.loading = payload;
    }
  }
});
