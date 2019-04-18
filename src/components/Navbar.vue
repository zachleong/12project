<template>
  <el-menu mode="horizontal">
    <el-menu-item>
      <router-link to="/" class="navlink">Home</router-link>
    </el-menu-item>
    <el-menu-item>
      <router-link to="/projects" class="navlink">Projects</router-link>
    </el-menu-item>
    <el-menu-item id="authButton">
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
    </el-menu-item>
  </el-menu>
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
  color: white;
}
#authButton {
  float: right;
}
.navbar {
  display: inline-block;
  background-color: blue;
}
</style>
