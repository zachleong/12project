<template>
  <div class="center">
    <div class="navbar">
      <router-link to="/" class="navlink">Home</router-link>
      <router-link to="/projects" class="navlink">Projects</router-link>
      <div id="authButton">
        <el-button
          v-if="userIsAuth === true"
          v-on:click="signOut"
          type="primary"
          plain
          >Sign out</el-button
        >
        <el-button
          v-else-if="userIsAuth === false"
          v-on:click="goToLogin"
          type="primary"
          >Login</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/Vuex/store";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  computed: {
    userIsAuth: () => {
      return store.state.userIsAuth;
    }
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logged out");
          store.commit("setAuthUser", false);
          store.commit("setUserEmail", "");
        })
        .catch(error => {
          console.log(error);
        });
    },
    goToLogin() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>
<style lang="scss" scoped>
.navlink {
  text-decoration: none;
  padding: 0 15px 0 15px;
  float: left;
  line-height: 70px;
  color: #2c3e50;
}
#authButton {
  float: right;
  line-height: 70px;
  padding: 0 15px 0 15px;
}
.navbar {
  width: 99%;
  margin-top: 5px;
  height: 70px;
  display: inline-block;
}
.center {
  text-align: center;
}
</style>
