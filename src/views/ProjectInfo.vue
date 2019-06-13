<template>
  <div>
    <div class="project-info" v-if="project">
      <div v-if="project">
        <div class="project-title">
          <h1>{{ project.title }}</h1>
          <div class="project-author">
            Created by {{ project.userName }}
            <span class="profile-overflow" v-if="profilePicURL">
              <img
                :src="profilePicURL"
                alt="profile picture"
                class="profile-picture"
              />
            </span>
          </div>
        </div>
      </div>
      <div class="card">{{ project.desc }}</div>
      <br />
    </div>
  </div>
</template>

<script>
import store from "@/Vuex/store";
import { getProjectFromDB } from "@/firebase/firebase";
import { getProfilePictureURL } from "@/firebase/firebase";
export default {
  data() {
    return {
      project: null,
      profilePicURL: ""
    };
  },
  mounted() {
    this.setProject();
  },
  methods: {
    getPicURL() {
      getProfilePictureURL(this.project.userName).then(url => {
        this.profilePicURL = url;
      });
    },
    setProject() {
      const passThrough = store.state.passThrough;
      // TODO add profile picture to passthrough
      if (passThrough) {
        this.project = passThrough;
        this.getPicURL();
      } else {
        getProjectFromDB(this.$route.params.projectID)
          .then(project => {
            this.project = project;
            this.getPicURL();
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
.card-header {
  padding: 18px 20px;
}
.project-info {
  display: inline-block;
  width: 75%;
}
.card {
  margin-top: 30px;
  width: 100%;
  display: inline-block;
  background-color: white;
  text-align: left;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  padding: 20px;
}
.project-author {
  text-align: left;
  position: relative;
  left: 15px;
}
.project-title {
  float: left;
}
.profile-overflow {
  height: 27px;
  width: 27px;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
}
.profile-picture {
  border-radius: 50%;
  border: 1px solid #ebeef5;
  max-width: 25px;
  height: 25px;
}
.profile-footer {
  float: right;
}
</style>
