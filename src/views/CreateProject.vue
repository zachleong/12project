<template>
  <div>
    <h1>Create a new project</h1>
    <input
      type="text"
      v-model="project.projectTitle"
      placeholder="Title"
      class="input project-in"
    />
    <textarea
      type="text"
      v-model="project.projectDesc"
      placeholder="Project description"
      class="input project-desc"
    />
    <br />
    <button @click="onSubmit" type="primary" class="button">Submit</button>
    <h1 v-bind="projectIsSet" v-if="projectIsSet">Project added</h1>
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
      projectIsSet: false
    };
  },
  methods: {
    onSubmit() {
      setProject(this.project)
        .then(() => {
          this.projectIsSet = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.project-in {
  margin: 10px 0;
  width: 65%;
}
.project-desc {
  transition: border 0.4s;
  width: 65%;
  height: 200px;
  resize: vertical;
}
</style>
