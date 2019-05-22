<template>
  <div class="project-desc" v-if="project">
    <Card>
      <template v-slot:header>
        <div class="card-header">{{ project.title }}</div>
      </template>
      <div>{{ project.desc }}</div>
      <br />
      <div v-if="project.userName">Created by {{ project.userName }}</div>
    </Card>
  </div>
</template>

<script>
import store from "@/Vuex/store";
import Card from "@/components/Card";
import { getProjectFromDB } from "@/firebase/firebase";
export default {
  components: {
    Card
  },
  data() {
    return {
      project: null
    };
  },
  mounted() {
    this.setProject();
  },
  methods: {
    setProject() {
      const passThrough = store.state.passThrough;

      if (passThrough) {
        this.project = passThrough;
      } else {
        getProjectFromDB(this.$route.params.projectID)
          .then(project => {
            this.project = project;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card-header {
  padding: 18px 20px;
}
.project-desc {
  display: inline-block;
  width: 75%;
}
</style>
