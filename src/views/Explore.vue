<template>
  <div class="grid-container">
    <div class="grid-item frontend" @click="goToCat('/projects', 'Frontend')">
      <img src="../assets/frontend.svg" alt="Frontend" class="img-art" />
    </div>
    <div class="grid-item backend" @click="goToCat('/projects', 'Backend')">
      <img src="../assets/backend.svg" alt="Backend" class="img-art" />
    </div>
    <div class="grid-item pentest" @click="goToCat('/projects', 'Pen testing')">
      <img src="../assets/pentest.svg" alt="Pentest" class="img-art" />
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
</template>

<script>
import store from "@/Vuex/store";
export default {
  methods: {
    goToPage(url) {
      this.$router.push(url);
    },
    goToCat(url, cat) {
      store.commit("setCategory", cat);
      this.$router.push(url);
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
  max-height: 150px;
  vertical-align: middle;
}
.grid-container {
  margin-top: 60px;
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 250px;
  grid-column-gap: 50px;
  width: 75%;
}
.grid-item {
  //   padding: 75px;
  line-height: 250px;
  color: white;
  border-radius: 20px;
  transition-duration: 0.4s;
}
.grid-item:hover {
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
