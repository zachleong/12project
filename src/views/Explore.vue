<template>
  <div class="grid-container">
    <div class="grid-item frontend" @click="goToPage('/projects')">
      <img src="../assets/frontend.svg" alt="Frontend" class="img-art" />
    </div>
    <div class="grid-item backend" @click="goToPage('/projects')">
      <img src="../assets/backend.svg" alt="Backend" class="img-art" />
    </div>
    <div class="grid-item pentest" @click="goToPage('/projects')">
      <img src="../assets/pentest.svg" alt="Pentest" class="img-art" />
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
  </div>
</template>

<script>
export default {
  methods: {
    goToPage(url) {
      this.$router.push(`${url}`);
    }
  }
};
</script>
<style lang="scss" scoped>
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 250px;
  grid-column-gap: 50px;
  width: 65%;
}
.grid-item {
  //   padding: 75px;
  line-height: 250px;
  color: white;
  border-radius: 20px;
  transition-duration: 0.4s;
}
.grid-item:hover {
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
