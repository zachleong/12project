<template>
  <div>
    <h1>Here is the profile page</h1>
    <img v-bind:src="imgurl" alt="profile picture" />
  </div>
</template>
<script>
import store from "@/Vuex/store";
export default {
  data() {
    return {};
  },
  computed: {
    imgurl() {
      return store.state.userPictureURL;
    }
  }
};
</script>

<style lang="scss" scoped></style>
