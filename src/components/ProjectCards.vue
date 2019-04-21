<template>
  <div class="projectcards" v-if="projects">
    <template v-for="project in projects">
      <Card :key="project.id" class="box-card">
        <template v-slot:header>
          <div @click="goToProjectInfo(project)" class="card-header">
            {{ project.title }}
          </div>
        </template>
        <p>{{ project.desc }}</p>
      </Card>
    </template>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { getCollection } from "@/firebase/firebase";
import store from "@/Vuex/store";

export default {
  name: "HelloWorld",
  components: {
    Card
  },
  data() {
    return {
      //Should this changing data be in here?
      projects: null
    };
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    getProjects() {
      getCollection("Projects")
        .then(projects => {
          this.projects = projects;
        })
        .catch(error => {
          console.log(error);
        });
    },
    goToProjectInfo(projectObj) {
      store.commit("setPassThrough", projectObj);
      this.$router.push(`/projects/${projectObj.id}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.box-card {
  width: 75%;
}
.card-header {
  padding: 18px 20px;
}
</style>
