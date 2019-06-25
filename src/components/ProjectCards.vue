<template>
  <transition name="pageTrans">
    <div class="projectcards" v-if="projects">
      <template v-for="project in projects">
        <Card :key="project.id" class="box-card">
          <template v-slot:header>
            <div @click="goToProjectInfo(project)" class="card-header">
              <a class="card-title">{{ project.title }}</a>
              <a class="card-link">More info</a>
            </div>
          </template>
          <p>{{ project.desc }}</p>
        </Card>
      </template>
    </div>
  </transition>
</template>

<script>
import Card from "@/components/Card";
import { getProjectsFromDB } from "@/firebase/firebase";
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
    filterProjects(projects) {
      const category = store.state.projectCategory;
      if (category) {
        let _projects = [];
        projects.forEach(project => {
          if (project.categories && project.categories.includes(category)) {
            _projects.push(project);
          }
        });
        store.commit("setCategory", null);
        return _projects;
      } else {
        return projects;
      }
    },
    getProjects() {
      getProjectsFromDB("Projects")
        .then(projects => {
          this.projects = this.filterProjects(projects);
        })
        .catch(error => {
          console.log(error);
        });
    },
    goToProjectInfo(projectObj) {
      store.commit("setPassThrough", projectObj);
      if (projectObj.userID == store.state.userID) {
        this.$router.push(`/myprojects/${projectObj.id}`);
      } else {
        this.$router.push(`/projects/${projectObj.id}`);
      }
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
.box-card {
  width: 75%;
}
.card-header {
  padding: 18px 20px;
  cursor: pointer;
}
.card-link {
  color: #409eff;
  float: right;
}
</style>
