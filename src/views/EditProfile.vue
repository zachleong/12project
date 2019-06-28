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
    <div class="edit-content">
      <button @click="saveProfile" type="primary" class="button save-button">
        Save Profile
      </button>
      <el-alert type="success" v-if="saved" title="Saved" show-icon />
      <div class="about">
        <div class="about-header">
          <h2 class="about-me-tag">About me:</h2>
        </div>
        <textarea
          type="text"
          v-model="user.about"
          placeholder="Write something about yourself"
          class="input user-desc"
        ></textarea>
      </div>
    </div>
    <h2>Upload profile picture:</h2>
    <input class="file-upload" type="file" @change="handleFile($event)" />
  </div>
</template>

<script>
import { uploadProfilePic } from "@/firebase/firebase";
import { getMyInfo } from "@/firebase/firebase";
import { updateUser } from "@/firebase/firebase";
import store from "@/Vuex/store";
export default {
  data() {
    return {
      file: "",
      username: store.state.userName,
      user: {},
      saved: false
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    saveProfile() {
      updateUser(this.user).then(() => {
        this.saved = true;
      });
    },
    getInfo() {
      getMyInfo().then(user => {
        if (user) {
          this.user = user;
        }
      });
    },
    handleFile(e) {
      uploadProfilePic(e.target.files[0])
        .then(() => {
          this.saved = true;
        })
        .catch(error => {
          console.log(error);
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
.el-alert {
  margin-bottom: 10px;
  color: rgb(19, 206, 102);
}
.save-button {
  background-color: rgb(19, 206, 102);
  margin-bottom: 10px;
  border: none;
}
.about-me-tag {
  display: inline-block;
}
.about-header {
  padding-bottom: 10px;
}
.about {
  width: 100%;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 0px 20px 20px 20px;
}
.edit-content {
  display: inline-block;
  text-align: left;
  width: 65%;
}
.profile-picture {
  max-width: 150px;
  height: 150px;
}
.profile-overflow {
  height: 152px;
  width: 152px;
  border-radius: 50%;
  border: 1px solid #ebeef5;
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
}
.user-desc {
  transition: border 0.4s;
  width: 100%;
  height: 200px;
  resize: vertical;
}
</style>
