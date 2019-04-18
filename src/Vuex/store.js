import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: "",
    userEmail: "",
    userIsAuth: false,
    loading: false
  },
  mutations: {
    setAuthUser(state, payload) {
      this.state.userIsAuth = payload;
    },
    setUserEmail(state, payload) {
      this.state.userEmail = payload;
    },
    loading(state, payload) {
      this.state.loading = payload;
    }
  }
});
