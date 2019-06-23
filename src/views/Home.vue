<template>
  <div class="home">
    <template v-if="userIsAuth == false">
      <div class="center">
        <div class="landing-content">
          <h1 class="welcome-title">Welcome to Git Money</h1>
          <h2>A software collaboration platform</h2>
          <div class="button-container">
            <button class="big-btn" @click="goToPage(`/register`)">
              Get started
            </button>
            <button class="big-btn" @click="goToPage(`/about`)">About</button>
          </div>
        </div>
      </div>
    </template>
    <div v-else-if="userIsAuth">
      <h1>Welcome back, {{ userName }}</h1>
      <button class="big-btn" @click="goToPage(`/guide`)">Guide</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "@/Vuex/store";

export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    goToPage(url) {
      this.$router.push(url);
    }
  },
  computed: {
    userName() {
      return store.state.userName;
    },
    userIsAuth() {
      return store.state.userIsAuth;
    }
  }
};
</script>
<style lang="scss" scoped>
.welcome-title {
  border-bottom: 1px solid #e2e4eb;
  padding-bottom: 15px;
  margin-bottom: 15px;
}
.landing-content {
  margin-top: 30px;
  //   background-color: #409eff;
  //   color: white;
  padding: 20px;
  width: 50%;
  //   border: 1px solid #ebeef5;
  border-radius: 30px;
  display: inline-block;
}
.center {
  text-align: center;
}
.big-btn {
  padding: 20px;
  margin: 10px;
  border-radius: 20px;
  width: 200px;
  border: 1px solid #e2e4eb;
  font-size: 16px;
  font-family: inherit;
  //   -webkit-box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
  //   box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  transition-duration: 0.2s;
}
.big-btn:hover {
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.big-btn:focus {
  outline: none;
}
</style>
