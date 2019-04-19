<template>
  <div class="center">
    <div class="navbar">
      <div class="navlink-center">
        <router-link to="/" class="navlink">Home</router-link>
      </div>
      <div class="navlink-center">
        <router-link to="/projects" class="navlink">Projects</router-link>
      </div>
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
  padding: 10px;
  color: #2c3e50;
  display: flex;
  align-items: center;
  height: 49px;
}
.router-link-exact-active {
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid;
  border-bottom-color: #409eff;
}
.navlink-center {
  padding: 0 5px 0 5px;
  float: left;
}
#authButton {
  float: right;
  line-height: 70px;
  padding: 0 15px 0 15px;
}
.navbar {
  width: 100%;
  height: 70px;
  display: inline-block;
  -webkit-box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
}
.center {
  text-align: center;
}
.el-button {
  font-size: 16px;
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
}
</style>
