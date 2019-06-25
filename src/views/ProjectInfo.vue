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
        </div>
      </div>
      <div>
        <div class="card">
          <h3 class="underline">About:</h3>
          {{ project.desc }}
        </div>
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
          <button
            class="button send-offer"
            v-if="expressInterest"
            @click="sendOffer"
          >
            Send to Project manager
          </button>
          <h2 v-if="expressSuccess">Successfully sent offer</h2>
        </div>
      </div>
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
    goToPage(url) {
      this.$router.push(url);
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
  //   grid-row: 4 / 5;
}
.expressInterest {
  margin: 15px 0 15px 0;
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
  width: 96%;
  display: inline-block;
  background-color: white;
  text-align: left;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 0 2% 2% 2%;
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
