<template>
  <div class="projects">
    <h1 class="header">Projects</h1>
    <el-input
      placeholder="Search for projects"
      v-model="searchInput"
      class="search-input"
    />
    <ProjectCards />
  </div>
</template>

<script>
// @ is an alias to /src
import ProjectCards from "@/components/ProjectCards.vue";
import store from "@/Vuex/store";

export default {
  name: "projectPage",
  components: {
    ProjectCards
  },
  data() {
    return {
      user: store.state.userEmail,
      searchInput: ""
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
.search-input {
  width: 75%;
}
</style>
