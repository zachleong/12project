<template>
  <div>
    <!-- dropdown needs to be outside of navbar because of z-index cooks -->
    <transition name="drop">
      <ul
        class="dropdown"
        v-if="showDropdown"
        @mouseleave="showDropdown = false"
      >
        <li class="dropdown-el" @click="signout">
          Sign Out
        </li>
      </ul>
    </transition>
    <div class="navbar">
      <!-- <a class="brand navlink">
        <h2>Git Money</h2>
      </a> -->
      <img
        width="45px"
        height="45px"
        src="../assets/logo.svg"
        alt="logo"
        class="brand navlink"
      />
      <router-link to="/" class="navlink">Home</router-link>
      <router-link to="/projects" class="navlink">Projects</router-link>
      <router-link to="/createproject" class="navlink"
        >Create Project</router-link
      >
      <div class="rightContent">
        <span
          class="profile-dropdown"
          v-if="userIsAuth == true"
          @click="showDropdown = true"
        >
          <span class="profile-overflow"
            ><img
              v-bind:src="imgurl"
              alt="Profile Picture"
              class="profile-picture"
            />
          </span>
        </span>
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
  </div>
</template>

<script>
import store from "@/Vuex/store";
import { signOut } from "@/firebase/firebase";
export default {
  data() {
    return {
      showDropdown: false
    };
  },
  computed: {
    userIsAuth: () => {
      return store.state.userIsAuth;
    },
    imgurl() {
      return store.state.userPictureURL;
    },
    isDrop: () => {
      return this.showDropdown;
    }
  },
  methods: {
    enter() {
      console.log("enter");
    },
    leave() {
      console.log("levae");
    },
    toggleDrop() {
      this.showDropdown = !this.showDropdown;
      //   console.log("toggle");
    },
    signout() {
      //   console.log("singing out");
      signOut();
    },
    goToLogin() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>
<style lang="scss" scoped>
.drop-leave-active,
.drop-enter-active {
  transition: opacity 0.4s;
}
.drop-enter,
.drop-leave-to {
  opacity: 0;
}
.dropdown-el {
  list-style: none;
  text-align: center;
  padding: 15px;
}
.dropdown {
  padding: 0;
  margin: 0;
  display: inline-block;
  position: absolute;
  text-align: center;
  top: 70px;
  width: 150px;
  height: 150px;
  right: 0;
  background-color: white;
  -webkit-box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 10px;
}
.profile-dropdown {
  text-decoration: none;
  font: inherit;
  box-sizing: inherit;
  //   border: 4px solid black;
  padding: 10px 15px 10px 15px;
  color: #2c3e50;
  display: flex;
  align-items: center;
  height: 51px;
  float: left;
}
.profile-overflow {
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
  z-index: 2;
  background-color: white;
}
.center {
  text-align: center;
}
</style>
