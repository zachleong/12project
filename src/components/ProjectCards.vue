<template>
  <div class="projectcards" v-if="projectsPopulated">
    <template v-for="project in projectsContent">
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
import firebase from "firebase/app";
import "firebase/firestore";
import store from "@/Vuex/store";

export default {
  name: "HelloWorld",
  components: {
    Card
  },
  data() {
    return {
      //Should this changing data be in here?
      projectsPopulated: false,
      projectsContent: []
    };
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    getProjects() {
      console.log("Getting projects");

      const db = firebase.firestore();
      db.collection("Projects")
        .get()
        .then(projectDocs => {
          projectDocs.forEach(doc => {
            //create project object from document and push to array
            const newproject = {
              id: doc.id,
              title: doc.data().projectTitle,
              desc: doc.data().projectDesc
            };
            this.projectsContent.push(newproject);
          });
          //after projects are all fetched
          this.projectsPopulated = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    goToProjectInfo(projectObj) {
      store.commit("setPassThrough", projectObj);
      this.$router.push(`/projects/${projectObj.id}`);
      console.log("fired");
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
