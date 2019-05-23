<template>
  <div>
    <h1>Here is the profile page</h1>
    <img v-bind:src="imgurl" alt="profile picture" />
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
      uploadProfilePic(e.target.files[0], e.target.files[0].name);
    }
  },
  computed: {
    imgurl() {
      return store.state.userPictureURL;
    }
  }
};
</script>

<style lang="scss" scoped></style>
