<template>
  <div class="navbar">
    <a class="brand navlink">
      <h2>Git Money</h2>
    </a>
    <router-link to="/" class="navlink">Home</router-link>
    <router-link to="/projects" class="navlink">Projects</router-link>
    <router-link to="/createproject" class="navlink"
      >Create Project</router-link
    >
    <div class="rightContent">
      <router-link
        to="/profile"
        class="navlink profile-nav"
        v-if="userIsAuth == true"
        ><span class="profile-link"
          ><img
            v-bind:src="imgurl"
            alt="Profile Picture"
            class="profile-picture"
          />
        </span>
        <ul class="dropdown">
          Hey there
        </ul>
      </router-link>
      <!-- <el-button
        v-if="userIsAuth === true"
        v-on:click="signOut"
        type="primary"
        plain
        >Sign out</el-button
      > -->
      <button
        v-else-if="userIsAuth === false"
        v-on:click="goToLogin"
        type="primary"
        class="button login-button"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script>
import store from "@/Vuex/store";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      showDropdown: true
    };
  },
  computed: {
    userIsAuth: () => {
      return store.state.userIsAuth;
    },
    imgurl() {
      return store.state.userPictureURL;
    }
  },
  methods: {
    toggleDrop() {
      this.showDropdown = !this.showDropdown;
    },
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
.dropdown {
  padding: 0;
  margin: 0;
  display: inline-block;
  position: absolute;
  text-align: center;
  top: -100%;
  width: 150px;
  height: 100px;
  right: 0;
  z-index: -1;
  background-color: white;
  -webkit-box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  transition-duration: 0.4s;
}
.profile-nav:focus .dropdown {
  top: 70px;
}
.profile-link {
  height: 45px;
  width: 45px;
  overflow: hidden;
  display: inline-block;
}
.profile-picture {
  border-radius: 50%;
  max-width: 45px;
  height: 45px;
}
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
.rightContent {
  float: right;
  line-height: 70px;
  padding: 0 10px 0 10px;
}
.navbar {
  //NOTE: Had to be done to have drop down because position sticky creates new stacking context?
  position: relative;
  top: 0;
  width: 100%;
  //   height: 70px;
  display: inline-block;
  -webkit-box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  //   z-index: 2;
  background-color: white;
}
.center {
  text-align: center;
}
</style>
