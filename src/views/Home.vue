<template>
  <div class="home">
    <h1 v-if="userEmail">Welcome back, {{ userEmail }}</h1>
    <template v-else>
      <h1>Welcome to Git Money</h1>
      <h2>Enterprise cloud solutions through blockchain technology</h2>
      <div class="button-container">
        <button class="big-btn">Get started</button>
        <button class="big-btn">Pricing</button>
      </div>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "@/Vuex/store";

export default {
  name: "home",
  data() {
    return {
      user: store.state.userEmail
    };
  },
  computed: {
    userEmail() {
      return store.state.userEmail;
    }
  }
};
</script>
<style lang="scss" scoped>
.big-btn {
  padding: 20px;
  margin: 10px;
  border-radius: 20px;
  width: 200px;
  border: none;
  font-size: 15px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
