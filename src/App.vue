<template>
  <div id="app">
    <Navbar />
    <SideNav />
    <keep-alive include="projectPage">
      <router-view />
    </keep-alive>
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
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
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
</style>
