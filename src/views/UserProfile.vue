<template>
  <div>
    <h1>Here is the profile page</h1>
    <div class="profile-div">
      <img v-bind:src="imgurl" alt="profile picture" class="profile-picture" />
    </div>
    <input type="file" @change="handleFile($event)" />
    <div class="divil" @click="show = !show"></div>
    <transition name="fade">
      <!-- <div v-if="show" class="divi"></div> -->
      <p v-if="show" class="divi">Hello</p>
    </transition>
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
.divil {
  width: 50px;
  height: 50px;
  background-color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.divi {
  width: 50px;
  height: 50px;
  background-color: blue;
}
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
