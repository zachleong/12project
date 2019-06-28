<template>
  <transition name="pageTrans">
    <div class="projectcards" v-if="projects">
      <template v-for="project in projectsFiltered">
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
      projects: null,
      projectsFiltered: null
    };
  },
  computed: {
    updateFilter() {
      return store.state.filterUpdate;
    }
  },
  watch: {
    updateFilter(newval) {
      if (newval == true) {
        const newProjects = this.filterProjects(this.projects);
        this.projectsFiltered = newProjects;
        store.commit("updateFilter", false);
      }
    }
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    filterProjects(projects) {
      const categories = store.state.projectCategories;
      if (categories) {
        let _projects = [];
        projects.forEach(project => {
          let catInProj = false;
          project.categories.forEach(cat => {
            if (categories.includes(cat)) {
              catInProj = true;
            }
          });
          if (catInProj) {
            _projects.push(project);
          }
        });
        store.commit("setCategories", null);
        return _projects;
      } else {
        return projects;
      }
    },
    getProjects() {
      getProjectsFromDB("Projects")
        .then(projects => {
          this.projects = projects;
          this.projectsFiltered = this.filterProjects(projects);
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
.projectcards {
  width: 75%;
  display: inline-block;
}
.box-card {
  width: 100%;
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
