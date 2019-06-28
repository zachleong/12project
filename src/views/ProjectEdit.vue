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
        v-model="project.desc"
        placeholder="Project description"
        class="input project-desc"
      />
      <input
        type="text"
        v-model="projectTags"
        placeholder="Comma separated tags e.g: html, javascript, css"
        class="input project-tags"
      />
      <br />
      <button @click="onSubmit" type="primary" class="button save-button">
        Save
      </button>
      <button @click="onDelete" class="button delete-button">
        Delete
      </button>
      <h2 v-if="projectSaved">Project Saved</h2>
      <h2 v-if="projectDeleted">Project Deleted</h2>
    </div>
  </div>
</template>

<script>
import store from "@/Vuex/store";
import { getProjectFromDB } from "@/firebase/firebase";
import { updateProject } from "@/firebase/firebase";
import { deleteProject } from "@/firebase/firebase";

export default {
  data() {
    return {
      projectSaved: false,
      projectDeleted: false,
      project: null,
      projectIsSet: false,
      projectTags: null,
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
  mounted() {
    this.setProject();
  },
  methods: {
    onSubmit() {
      this.project.tags = this.projectTags.split(",");
      console.log(this.project);
      updateProject(this.project).then(() => {
        this.projectSaved = true;
      });
    },
    onDelete() {
      console.log(this.project.userID);
      deleteProject(this.project)
        .then(() => {
          this.projectDeleted = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    setProject() {
      // Load the project
      const passThrough = store.state.passThrough;
      if (passThrough) {
        this.project = passThrough;
        this.projectTags = passThrough.tags.join(", ");
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

<style lang="scss">
.delete-button:hover {
  background-color: #f56c6c;
}
.delete-button {
  background-color: #f56c6c;
  border: none;
  margin: 5px;
}
.save-button:hover {
  background-color: rgb(19, 206, 102);
}
.save-button {
  background-color: rgb(19, 206, 102);
  border: none;
  margin: 5px;
}
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
