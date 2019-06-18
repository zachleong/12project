<template>
  <div>
    <h1>My Projects</h1>
    <a class="create-project-tag" @click="goToCreateProject">Create project</a>
    <div v-if="projects != null">
      <template class="projects" v-for="project in projects">
        <Card :key="project.id" class="box-card">
          <template v-slot:header>
            <div @click="goToProjectEdit(project)" class="card-header">
              <a class="card-title">{{ project.title }}</a>
              <a class="card-link">Edit</a>
            </div>
          </template>
          <p>{{ project.desc }}</p>
        </Card>
      </template>
    </div>
  </div>
</template>

<script>
import { getUserProjects } from "@/firebase/firebase";
import { waitForAuth } from "@/firebase/firebase";
import Card from "@/components/Card";
import store from "@/Vuex/store";
export default {
  components: {
    Card
  },
  data() {
    return {
      projects: null
    };
  },
  mounted() {
    const uid = store.state.userID;
    const isAuth = store.state.userIsAuth;
    if (isAuth == true) {
      getUserProjects(uid).then(projects => {
        this.projects = projects;
      });
    } else if (isAuth == null) {
      waitForAuth(() => {
        getUserProjects(uid).then(projects => {
          this.projects = projects;
        });
      });
    } else if (isAuth == false) {
      console.log("you are not signed in ");
    }
  },
  methods: {
    goToCreateProject() {
      this.$router.push("/createproject");
    },
    goToProjectEdit(projectObj) {
      store.commit("setPassThrough", projectObj);
      this.$router.push(`/myprojects/${projectObj.id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.create-project-tag {
  text-align: left;
  display: inline-block;
  //   position: relative;
  //   left: 13%;
  color: #409eff;
}
.create-project-tag:hover {
  cursor: pointer;
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
