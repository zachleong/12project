<template>
  <div class="center">
    <div class="navbar">
      <a class="brand navlink">
        <h2>Git Money</h2>
      </a>
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
  padding: 10px 15px 10px 15px;
  color: #2c3e50;
  display: flex;
  align-items: center;
  height: 49px;
  float: left;
}
.brand {
  padding-right: 20px;
  padding-left: 20px;
}
.router-link-exact-active {
  //   background: rgba(255, 255, 255, 0.8);
  border-bottom: 2px solid;
  border-bottom-color: #409eff;
  animation: border-fade-in 0.4s;
}
@keyframes border-fade-in {
  from {
    border-bottom-color: rgba(64, 158, 255, 0);
  }
  to {
    border-bottom-color: rgba(64, 158, 255, 1);
  }
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
