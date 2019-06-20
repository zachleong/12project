<template>
  <div>
    <div class="project-info" v-if="project">
      <div v-if="project">
        <div class="project-header">
          <h1 class="project-title">{{ project.title }}</h1>
          <div class="project-author">
            Project owned by {{ project.userName }}
            <!-- TODO - Add else here for when profile pic hasn't loaded yet -->
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
      <button
        v-if="userIsAuth"
        @click="expressInterest = true"
        class="button expressInterest"
      >
        Contribute to Project
      </button>
      <div class="comments">
        <textarea
          v-if="expressInterest"
          type="text"
          v-model="newcomment"
          placeholder="Outline how you will contribute"
          class="input newcomment"
        ></textarea>
        <button class="button" v-if="expressInterest" @click="sendOffer">
          Send to Project manager
        </button>
        <h2 v-if="expressSuccess">Successfully sent offer</h2>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import store from "@/Vuex/store";
import { getProjectFromDB } from "@/firebase/firebase";
import { getProfilePictureURL } from "@/firebase/firebase";
import { expressInterest } from "@/firebase/firebase";
export default {
  data() {
    return {
      project: null,
      profilePicURL: "",
      expressInterest: false,
      newcomment: "",
      expressSuccess: false
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
    getPicURL() {
      getProfilePictureURL(this.project.userName).then(url => {
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
.comments {
  width: 75vw;
  display: inline-block;
}
.newcomment {
  width: 100%;
}
.expressInterest {
  float: left;
  margin: 30px 0 30px 0;
}
.card-header {
  padding: 18px 20px;
}
.project-info {
  display: inline-block;
  width: 75%;
}
.card {
  margin-top: 30px;
  width: 96%;
  display: inline-block;
  background-color: white;
  text-align: left;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 2%;
}
.project-author {
  text-align: left;
  position: relative;
  left: 20px;
}
.project-title {
  text-align: left;
  border-bottom: 2px solid #ebeef5;
  padding-bottom: 10px;
  width: 100%;
}
.project-header {
  float: left;
}
.profile-overflow {
  height: 27px;
  width: 27px;
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
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
