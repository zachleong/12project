<template>
  <div class="sidenav">
    <p class="sidenav-item">Filters</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sidenav {
  z-index: 1;
  position: absolute;
  height: 100%;
  width: 150px;
  top: 70px;
  left: 0;
  background-color: white;
  -webkit-box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  animation: sidenav-slide 0.4s;
}
@keyframes sidenav-slide {
  from {
    left: -150px;
  }
  to {
    left: 0;
  }
}
</style>
