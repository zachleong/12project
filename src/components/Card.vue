<template>
  <div class="card">
    <div class="card-header">
      <slot name="header" class="card-header" />
    </div>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  margin-top: 30px;
  width: 100%;
  display: inline-block;
  background-color: white;
  text-align: left;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
}
.card-header {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.card-content {
  border-top: 1px solid #ebeef5;
  padding: 20px;
}
</style>
