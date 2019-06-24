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
@import url("https://fonts.googleapis.com/css?family=Nunito:300");

#app {
  font-family: "Nunito", sans-serif;
  font-weight: 300;
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
a {
  outline: 0;
}
h1 {
  font-weight: 300;
}

h2 {
  font-weight: 300;
}
h3 {
  font-weight: 300;
  margin: 15px 0 15px 0;
}
.button {
  font-size: 16px;
  font-family: inherit;
  font-weight: 500;
  padding: 12px 20px;
  border: 1px solid #409eff;
  border-radius: 4px;
  line-height: 1;
  box-sizing: border-box;
  background-color: #409eff;
  color: white;
  cursor: pointer;
}
.button:hover {
  background-color: rgb(102, 177, 255);
}
.button:focus {
  outline: none;
}
.input {
  font-size: 16px;
  font-family: inherit;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px 15px;
  transition: 0.4s;
}
.input:focus {
  outline: none;
  border: 1px solid #409eff;
}
::placeholder {
  color: #c0c4cc;
}
.pageTrans-leave-active,
.pageTrans-enter-active {
  transition: opacity 0.2s;
}
.pageTrans-enter,
.pageTrans-leave-to {
  opacity: 0;
}
.underline {
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 15px;
}
.overline {
  border-top: 1px solid #ebeef5;
  padding-top: 15px;
}
</style>
