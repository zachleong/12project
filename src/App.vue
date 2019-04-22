<template>
  <div id="app">
    <Navbar />
    <SideNav />
    <transition name="pageTrans" mode="out-in">
      <keep-alive include="projectPage">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";

export default {
  components: {
    Navbar,
    SideNav
  }
};
</script>

<style lang="scss">
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  font-weight: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html {
  height: 100%;
}
body {
  margin: 0;
  background-color: white;
}
h1 {
  font-weight: normal;
}

h2 {
  font-weight: normal;
}
.pageTrans-leave-active,
.pageTrans-enter-active {
  transition: opacity 0.2s;
}
.pageTrans-enter,
.pageTrans-leave-to {
  opacity: 0;
}
</style>
