<template>
  <div class="home">
    <template v-if="userIsAuth == false">
      <div class="center">
        <div class="landing-content">
          <h1>Welcome to Git Money</h1>
          <h2>Here will be the mission statement or mantra</h2>
          <div class="button-container">
            <button class="big-btn">Get started</button>
            <button class="big-btn">About</button>
          </div>
        </div>
      </div>
    </template>
    <h1 v-else-if="userIsAuth">Welcome back, {{ userName }}</h1>
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
.landing-content {
  margin-top: 30px;
  //   background-color: #409eff;
  //   color: white;
  padding: 20px;
  width: 50%;
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
  border: 1px solid #ebeef5;
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
