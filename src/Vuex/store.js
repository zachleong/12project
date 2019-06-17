import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: "",
    userEmail: "",
    userPictureURL: "",
    userID: "",
    userIsAuth: null,
    loading: false,
    //pass through data from one route to another
    passThrough: null
  },
  mutations: {
    setUserID(state, payload) {
      this.state.userID = payload;
    },
    setAuthUser(state, payload) {
      this.state.userIsAuth = payload;
    },
    setUserEmail(state, payload) {
      this.state.userEmail = payload;
    },
    setUserPictureURL(state, payload) {
      this.state.userPictureURL = payload;
    },
    setUserName(state, payload) {
      this.state.userName = payload;
    },
    setPassThrough(state, payload) {
      this.state.passThrough = payload;
    },
    loading(state, payload) {
      this.state.loading = payload;
    }
  }
});
