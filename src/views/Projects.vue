<template>
  <div class="projects">
    <ProjectCards />
  </div>
</template>

<script>
// @ is an alias to /src
import ProjectCards from "@/components/ProjectCards.vue";
import store from "@/Vuex/store";

export default {
  name: "projects",
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
