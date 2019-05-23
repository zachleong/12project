<template>
  <div>
    <h1>Here is the profile page</h1>
    <div class="profile-div">
      <img v-bind:src="imgurl" alt="profile picture" class="profile-picture" />
    </div>
    <input type="file" @change="handleFile($event)" />
  </div>
</template>
<script>
import store from "@/Vuex/store";
import { uploadProfilePic } from "@/firebase/firebase";
export default {
  data() {
    return {
      file: ""
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
.profile-div {
  height: 45px;
  width: 45px;
  overflow: hidden;
  display: inline-block;
}
.profile-picture {
  border-radius: 50%;
  max-width: 45px;
  height: 45px;
}
</style>
