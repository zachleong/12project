<template>
  <div class="home">
    <template v-if="userIsAuth == false">
      <div class="center">
        <div class="landing-content">
          <h1 class="welcome-title">Welcome to Git Money</h1>
          <h2>A software collaboration platform</h2>
          <div class="button-container">
            <button class="big-btn" @click="goToPage(`/register`)">
              Sign up
            </button>
            <button class="big-btn" @click="goToPage(`/about`)">About</button>
          </div>
        </div>
      </div>
    </template>
    <div v-else-if="userIsAuth">
      <div class="landing-content">
        <h1 class="welcome-title">Welcome back, {{ userName }}</h1>
        <button class="big-btn" @click="goToPage(`/guide`)">Guide</button>
        <br />
        <p class="twenty" style="margin-top: 40px;">Find Projects:</p>
        <div class="grid-container">
          <div
            class="grid-item frontend"
            @click="goToCat('/projects', 'Frontend')"
          >
            <img src="../assets/frontend.svg" alt="Frontend" class="img-art" />
          </div>
          <div
            class="grid-item backend"
            @click="goToCat('/projects', 'Backend')"
          >
            <img src="../assets/backend.svg" alt="Backend" class="img-art" />
          </div>
          <div
            class="grid-item pentest"
            @click="goToCat('/projects', 'Pen testing')"
          >
            <img
              src="../assets/pentest.svg"
              alt="Pen testing"
              class="img-art"
            />
          </div>
          <div class="grid-item other" @click="goToCat('/projects', 'Other')">
            <img src="../assets/other.svg" alt="Other" class="img-art" />
          </div>

          <div>
            <p class="title">Frontend development</p>
          </div>
          <div>
            <p class="title">Backend development</p>
          </div>
          <div>
            <p class="title">Penetration testing</p>
          </div>
          <div>
            <p class="title">Other</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "@/Vuex/store";

export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    goToPage(url) {
      this.$router.push(url);
    },
    goToCat(url, cat) {
      store.commit("setCategories", [cat]);
      this.$router.push(url);
    }
  },
  computed: {
    userName() {
      return store.state.userName;
    },
    userIsAuth() {
      return store.state.userIsAuth;
    }
  }
};
</script>
<style lang="scss" scoped>
.other {
  background-color: #f89e36;
}
.frontend {
  background-color: #13ce66;
}
.backend {
  background-color: #409eff;
}
.pentest {
  background-color: #f56c6c;
}
.title {
  font-size: 20px;
}
.img-art {
  max-height: 100px;
  vertical-align: middle;
}
.grid-container {
  margin-top: 30px;
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 150px;
  grid-column-gap: 50px;
  width: 100%;
}
.grid-item {
  //   padding: 75px;
  line-height: 150px;
  color: white;
  border-radius: 20px;
  transition-duration: 0.4s;
}
.grid-item:hover {
  box-shadow: 0 1px 12px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.welcome-title {
  border-bottom: 1px solid #e2e4eb;
  padding-bottom: 15px;
  margin-bottom: 15px;
}
.landing-content {
  margin-top: 30px;
  //   background-color: #409eff;
  //   color: white;
  padding: 20px;
  width: 50%;
  //   border: 1px solid #ebeef5;
  border-radius: 30px;
  display: inline-block;
}
.center {
  text-align: center;
}
.big-btn {
  padding: 20px;
  margin: 10px;
  border-radius: 20px;
  width: 200px;
  border: 1px solid #e2e4eb;
  font-size: 16px;
  font-family: inherit;
  //   -webkit-box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
  //   box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  transition-duration: 0.2s;
}
.big-btn:hover {
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.big-btn:focus {
  outline: none;
}
</style>
