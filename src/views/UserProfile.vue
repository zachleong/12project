<template>
  <div>
    <div class="title">
      <span class="profile-overflow"
        ><img
          :src="imgurl"
          alt="Profile Picture"
          class="profile-picture"
          v-if="imgurl"
        />
      </span>
      <h1 class="username">{{ user.displayName }}</h1>
    </div>
    <div class="about">
      <div class="about-header">
        <h2 class="about-me-tag">About me:</h2>
        <a class="edit-link" @click="goToEditProfile()" v-if="isOwner">Edit</a>
      </div>
      <p>{{ user.about }}</p>
    </div>
    <h2>Contact Details:</h2>
    <p>{{ user.email }}</p>
  </div>
</template>
<script>
import { getUserInfo } from "@/firebase/firebase";
import { getProfilePictureURL } from "@/firebase/firebase";
import store from "@/Vuex/store";
export default {
  data() {
    return {
      file: "",
      user: {},
      imgurl: null
    };
  },
  mounted() {
    this.getUser();
    this.getImgUrl();
  },
  methods: {
    goToEditProfile() {
      this.$router.push("/editprofile");
    },
    getUser() {
      const uid = this.$route.params.userID;
      getUserInfo(uid)
        .then(user => {
          if (user) {
            this.user = user;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getImgUrl() {
      getProfilePictureURL(this.$route.params.userID).then(url => {
        this.imgurl = url;
      });
    }
  },
  computed: {
    isOwner() {
      return store.state.userID == this.$route.params.userID;
    }
  }
};
</script>

<style lang="scss" scoped>
.about-me-tag {
  display: inline-block;
}
.edit-link {
  float: right;
  padding-top: 20px;
  color: #409eff;
}
.edit-link:hover {
  cursor: pointer;
}
.about-header {
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
}
.about {
  display: inline-block;
  text-align: left;
  width: 65%;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 0px 20px 20px 20px;
}
.profile-picture {
  max-width: 150px;
  height: 150px;
}
.profile-overflow {
  border-radius: 50%;
  border: 1px solid #ebeef5;
  height: 152px;
  width: 152px;
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
}
input[type="file"] {
  border: 1px solid;
  border: none;
}
</style>
