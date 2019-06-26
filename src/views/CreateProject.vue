<template>
  <div>
    <h1>Create a new project</h1>
    <input
      type="text"
      v-model="project.projectTitle"
      placeholder="Title"
      class="input project-in"
    />
    <el-select
      v-model="project.categories"
      multiple
      placeholder="Categories"
      class="lang-select"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        class="lang-options"
      >
      </el-option>
    </el-select>
    <textarea
      type="text"
      v-model="project.projectDesc"
      placeholder="Project description"
      class="input project-desc"
    />
    <input
      type="text"
      v-model="project.tags"
      placeholder="Tags"
      class="input project-tags"
    />
    <br />
    <button @click="onSubmit" type="primary" class="button">
      Create Project
    </button>
    <h1 v-if="projectIsSet">Project added</h1>
  </div>
</template>

<script>
import { setProject } from "@/firebase/firebase";
export default {
  data() {
    return {
      project: {
        projectTitle: "",
        projectDesc: "",
        // technologies: [],
        categories: "",
        tags: ""
      },
      projectIsSet: false,
      options: [
        {
          value: "Frontend",
          label: "Frontend"
        },
        {
          value: "Backend",
          label: "Backend"
        },
        {
          value: "Pen testing",
          label: "Penetration testing"
        },
        {
          value: "Other",
          label: "Other"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.project.tags = this.project.tags.split(",");
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

<style lang="scss">
.project-tags {
  width: 65%;
  display: inline-block;
  margin-bottom: 10px;
}
.project-in {
  margin: 10px 0;
  width: 49%;
}
.project-desc {
  transition: border 0.4s;
  width: 65%;
  height: 200px;
  resize: vertical;
}
.lang-select {
  margin-left: 1%;
  font-family: "Nunito", sans-serif;
}
.lang-options {
  font-family: "Nunito", sans-serif;
}
.el-input__inner {
  font-size: 16px !important;
  font-family: "Nunito", sans-serif;
  min-height: 44px !important;
  border: 1px solid #ebeef5 !important;
}
</style>
