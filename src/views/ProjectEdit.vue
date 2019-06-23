<template>
  <div class="editproject">
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
      <button @click="onDelete" class="button delete-button">
        Delete
      </button>
      <h2 v-if="projectSaved">Project Saved</h2>
      <h2 v-if="projectDeleted">Project Deleted</h2>
      <h2>Offers</h2>
      <div
        class="comments"
        v-if="projectComments != null && projectComments.length != 0"
      >
        <div
          class="comment"
          v-for="comment in projectComments"
          :key="comment.userID"
        >
          <p :key="comment.userID" class="comment-name">
            {{ comment.username }}
          </p>
          <p :key="comment.userID">{{ comment.comment }}</p>
        </div>
      </div>
      <div v-else-if="projectComments.length != 0">No offers yet...</div>
    </div>
  </div>
</template>
<script>
import store from "@/Vuex/store";
import { getProjectFromDB } from "@/firebase/firebase";
import { updateProject } from "@/firebase/firebase";
import { deleteProject } from "@/firebase/firebase";
import { getProjectComments } from "@/firebase/firebase";
export default {
  data() {
    return {
      project: null,
      projectSaved: false,
      projectDeleted: false,
      projectComments: null
    };
  },
  mounted() {
    this.setProject();
  },
  methods: {
    onSubmit() {
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
      const passThrough = store.state.passThrough;
      // TODO add profile picture to passthrough
      if (passThrough) {
        this.project = passThrough;
        getProjectComments(passThrough.id)
          .then(comments => {
            this.projectComments = comments;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        getProjectFromDB(this.$route.params.projectID)
          .then(project => {
            this.project = project;
            getProjectComments(project.id)
              .then(comments => {
                this.projectComments = comments;
              })
              .catch(error => {
                console.log(error);
              });
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
.comment-name {
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
  font-size: 20px;
}
.editproject {
  width: 65%;
  display: inline-block;
}
.comment {
  margin-top: 20px;
  text-align: left;
  border: 1px solid #ebeef5;
  padding: 0 20px 20px 20px;
  border-radius: 4px;
}
.delete-button {
  //   background-color: #42b983;
  background-color: #f56c6c;
  border: none;
  margin: 5px;
}
.save-button {
  //   background-color: #42b983;
  background-color: rgb(19, 206, 102);
  border: none;
  margin: 5px;
}
.project-in {
  margin: 10px 0;
  width: 100%;
}
.project-desc {
  transition: border 0.4s;
  width: 100%;
  height: 200px;
  resize: vertical;
}
</style>
