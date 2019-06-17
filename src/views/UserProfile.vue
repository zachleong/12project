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
    <h2>Upload profile picture:</h2>
    <input class="file-upload" type="file" @change="handleFile($event)" />
  </div>
</template>
<script>
import store from "@/Vuex/store";
import { uploadProfilePic } from "@/firebase/firebase";
export default {
  data() {
    return {
      file: "",
      show: true,
      username: store.state.userName
    };
  },
  methods: {
    handleFile(e) {
      uploadProfilePic(e.target.files[0]);
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
// .title {
//   text-align: center;
// }
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
