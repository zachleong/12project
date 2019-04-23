<template>
  <div>
    <h1>Create a new project</h1>
    <input type="text" v-model="project.projectTitle" placeholder="title" />
    <br />
    <input type="text" v-model="project.projectDesc" placeholder="desc" />
    <br />
    <input type="text" v-model="projectID" placeholder="id" />

    <br />
    <el-button @click="onSubmit" type="primary">Submit</el-button>
  </div>
</template>

<script>
import { setProject } from "@/firebase/firebase";
export default {
  data() {
    return {
      project: {
        projectTitle: "",
        projectDesc: ""
      },
      projectID: ""
    };
  },
  methods: {
    onSubmit() {
      setProject(this.project)
        .then(() => {
          console.log("set");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
