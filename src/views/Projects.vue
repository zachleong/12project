<template>
  <div class="projects">
    <h1 class="header">Projects</h1>
    <SideNav />
    <ProjectCards />
  </div>
</template>

<script>
// @ is an alias to /src
import ProjectCards from "@/components/ProjectCards.vue";
import SideNav from "@/components/SideNav.vue";
import store from "@/Vuex/store";

export default {
  name: "projectPage",
  components: {
    ProjectCards,
    SideNav
  },
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
<style lang="scss" scoped></style>
