<template>
  <div class="projects">
    <h1 class="header">Projects</h1>
    <ProjectCards />
  </div>
</template>

<script>
import ProjectCards from "@/components/ProjectCards.vue";
import store from "@/Vuex/store";

export default {
  name: "projectPage",
  components: {
    ProjectCards
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
