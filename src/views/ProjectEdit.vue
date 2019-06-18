<template>
  <div>
    <h1>Edit Project</h1>
    <div v-if="project">
      <input
        type="text"
        v-model="project.title"
        placeholder="Title"
        class="input project-in"
      />
      <textarea
        type="text"
        v-model="project.desc"
        placeholder="Project description"
        class="input project-desc"
      />
      <br />
      <button @click="onSubmit" type="primary" class="button save-button">
        Save
      </button>
    </div>
  </div>
</template>
<script>
import store from "@/Vuex/store";
import { getProjectFromDB } from "@/firebase/firebase";
export default {
  data() {
    return {
      project: null
    };
  },
  mounted() {
    this.setProject();
  },
  methods: {
    onSubmit() {},
    setProject() {
      const passThrough = store.state.passThrough;
      // TODO add profile picture to passthrough
      if (passThrough) {
        this.project = passThrough;
      } else {
        getProjectFromDB(this.$route.params.projectID)
          .then(project => {
            this.project = project;
          })
          .catch(error => {
            console.log("There was an error" + error);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.save-button {
  background-color: #42b983;
  border: none;
}
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
