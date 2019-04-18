<template>
  <div class="home">
    <h1 v-if="userEmail">Welcome back, {{ userEmail }}</h1>
    <h1 v-else>Welcome to Git Money</h1>
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
