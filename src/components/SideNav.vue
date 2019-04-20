<template>
  <transition name="slide">
    <div class="sidenav" :class="navActive" v-if="getNavActive">
      <p class="sidenav-item">Filters</p>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      navActive: false
    };
  },
  methods: {
    toggleNav() {
      this.navActive = !this.navActive;
    }
  },
  computed: {
    getNavActive() {
      return this.$route.name == "projects";
    }
  }
};
</script>

<style lang="scss" scoped>
.sidenav {
  z-index: 1;
  position: absolute;
  height: 100%;
  width: 150px;
  top: 70px;
  left: 0;
  -webkit-box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
}
@keyframes sidenav-slide {
  from {
    left: -150px;
  }
  to {
    left: 0;
  }
}
.slide-leave-active,
.slide-enter-active {
  transition: left 0.4s;
}
.slide-enter,
.slide-leave-to {
  left: -150px;
}
</style>
