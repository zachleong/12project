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
      <h1 class="username">{{ username }}</h1>
    </div>
    <div class="about">
      <div class="about-header">
        <h2 class="about-me-tag">About me:</h2>
        <a class="edit-link" @click="goToEditProfile()">Edit</a>
      </div>
      <p>{{ user.about }}</p>
    </div>
  </div>
</template>
<script>
import store from "@/Vuex/store";
import { getMyInfo } from "@/firebase/firebase";
export default {
  data() {
    return {
      file: "",
      username: store.state.userName,
      user: {}
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    goToEditProfile() {
      this.$router.push("/editprofile");
    },
    getUser() {
      getMyInfo().then(user => {
        this.user = user;
      });
    }
  },
  computed: {
    imgurl() {
      return store.state.userPictureURL;
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
  border-radius: 50%;
  border: 1px solid #ebeef5;
  max-width: 150px;
  height: 150px;
}
.profile-overflow {
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
