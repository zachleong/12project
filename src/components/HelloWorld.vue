<template>
  <div class="hello">
      <h1>Projects</h1>
      <div class="projectcards" v-if="projectsPopulated">
      <template v-for="project in projectsContent">
        <el-card class="box-card" :key="project.id">
            <div slot="header">{{project.title}}</div>
            <p>{{project.desc}}</p>
        </el-card>
      </template>
      </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "HelloWorld",
  data() {
      return {
          //Should this changing data be in here?
          projectsPopulated: false,
          projectsContent: [],
      }
  },
  created: function () {
      this.getProjects();
  },
  methods: {
      getProjects() {
          console.log("Getting projects");
          
          const db = firebase.firestore();
          db.collection("Projects").get()
            .then(projectDocs => {
                projectDocs.forEach( doc => {
                    //create project object from document and push to array
                    const newproject = {
                        id: doc.id,
                        title: doc.data().projectTitle,
                        desc: doc.data().projectDesc

                    };
                    this.projectsContent.push(newproject);
                })
                //after projects are all fetched
                this.projectsPopulated = true;
            })
            .catch( error => {
                console.log(error);
            });
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
    text-align: left;
    width: 75%;
    display: inline-block;
    margin-top: 30px;
}
.projectcards {
    text-align: center;
}
</style>
