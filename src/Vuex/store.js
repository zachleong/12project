import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: "",
    userEmail: "",
    userIsAuth: null,
    loading: false,
    //pass through data from one route to another
    passThrough: null
  },
  mutations: {
    setAuthUser(state, payload) {
      this.state.userIsAuth = payload;
    },
    setUserEmail(state, payload) {
      this.state.userEmail = payload;
    },
    setPassThrough(state, payload) {
      this.state.passThrough = payload;
    },
    loading(state, payload) {
      this.state.loading = payload;
    }
  }
});
