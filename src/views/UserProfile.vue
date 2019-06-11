<template>
  <div>
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
      show: true
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
input[type="file"] {
  border: 1px solid;
  border: none;
}
</style>
