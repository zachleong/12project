<template>
  <div>
    <div class="project-info" v-if="project">
      <div class="project-header">
        <h1 class="project-title">{{ project.title }}</h1>
        <div class="project-author">
          Project owned by
          <a
            @click="goToPage(`/profile/${project.userID}`)"
            class="profile-link"
          >
            {{ project.userName }}
          </a>
          <!-- TODO - Add else here for when profile pic hasn't loaded yet -->
          <span class="profile-overflow">
            <img
              :src="profilePicURL"
              alt="profile picture"
              class="profile-picture"
              v-if="profilePicURL"
            />
          </span>
          <p class="edit-link" @click="goToProjectEdit">Edit Project</p>
        </div>
      </div>
      <div class="card">{{ project.desc }}</div>
      <div class="project-details card">
        <h3 class="underline">Technologies:</h3>
        <p v-for="technology in project.technologies" :key="technology">
          {{ technology }}
        </p>
        <h3 class="underline overline">Tags:</h3>
        <p v-for="tag in project.tags" :key="tag">
          {{ tag }}
        </p>
      </div>
      <div>
        <h2>Offers</h2>
        <div class="comments" v-if="projectComments != null">
          <div
            class="comment"
            v-for="comment in projectComments"
            :key="comment.userID"
          >
            <div :key="comment.userID" class="comment-name">
              <a>
                {{ comment.username }}
              </a>
              <div class="comment-buttons">
                <a class="accept-offer offer-buttons button">Accept Offer</a>
                <a class="deny-offer offer-buttons button">Deny Offer</a>
              </div>
            </div>
            <p>{{ comment.comment }}</p>
          </div>
        </div>
        <div v-else>No offers yet...</div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import store from "@/Vuex/store";
import { getProjectFromDB } from "@/firebase/firebase";
import { getProfilePictureURL } from "@/firebase/firebase";
import { getProjectComments } from "@/firebase/firebase";
export default {
  data() {
    return {
      project: null,
      profilePicURL: "",
      newcomment: "",
      projectComments: null
    };
  },
  computed: {
    userIsAuth() {
      return store.state.userIsAuth;
    }
  },
  mounted() {
    this.setProject();
  },
  methods: {
    goToPage(url) {
      this.$router.push(url);
    },
    goToProjectEdit() {
      store.commit("setPassThrough", this.project);
      this.$router.push(`/editproject/${this.project.id}`);
    },
    getPicURL() {
      getProfilePictureURL(this.project.userID).then(url => {
        this.profilePicURL = url;
      });
    },
    sendOffer() {
      console.log("sending offer");
      expressInterest(this.project.id, this.newcomment)
        .then(() => {
          this.expressSuccess = true;
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
        this.getPicURL();
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
.accept-offer {
  background-color: rgb(19, 206, 102);
}
.deny-offer {
  background-color: #f56c6c;
}
.offer-buttons {
  padding: 10px;
  border: none;
  margin: 0 5px 0 5px;
}
.comment-buttons {
  float: right;
}
.comment {
  margin-top: 20px;
  text-align: left;
  border: 1px solid #ebeef5;
  padding: 0 20px 20px 20px;
  border-radius: 4px;
}
.comment-name {
  padding: 15px 0 15px 0;
  border-bottom: 1px solid #ebeef5;
  font-size: 20px;
}
.edit-link {
  float: right;
  color: #409eff;
}
.edit-link:hover {
  cursor: pointer;
}
.project-details {
  text-align: center !important;
}
.about-project {
  display: inline-grid;
}
.profile-link {
  color: #409eff;
}
.profile-link:hover {
  cursor: pointer;
}
.comments {
  //   display: inline-block;
  grid-row: 4 / 5;
}
.newcomment {
  width: 100%;
  display: block;
}
.send-offer {
  margin-top: 15px;
}
.card-header {
  padding: 18px 20px;
}
.project-info {
  display: inline-grid;
  //   grid-template-columns: 50% 50%;
  grid-template-columns: 5fr 2fr;
  grid-row-gap: 30px;
  grid-column-gap: 15px;
  width: 75%;
}
.card {
  //   margin-top: 30px;
  //   width: 96%;
  display: inline-block;
  background-color: white;
  text-align: left;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 2%;
}
.project-author {
  text-align: left;
  //   position: relative;
  //   left: 20px;
}
.project-title {
  text-align: left;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
  //   width: 100%;
}
.project-header {
  grid-column: 1/3;
}
.profile-overflow {
  border-radius: 50%;
  border: 1px solid #ebeef5;
  height: 27px;
  width: 27px;
  overflow: hidden;
  display: inline-block;
  text-align: center;
  vertical-align: bottom;
}
.profile-picture {
  max-width: 25px;
  height: 25px;
  display: inline-block;
}
.profile-footer {
  float: right;
}
</style>
