<template>
  <div>
    <h1>Hey there</h1>
    <el-card class="box-card" shadow="hover">
      <div slot="header">{{ project.title }}</div>
      <div>{{ project.desc }}</div>
    </el-card>
  </div>
</template>

<script>
import store from "@/Vuex/store";
export default {
  data() {
    return {
      project: store.state.passThrough
    };
  }
};
</script>

<style lang="scss" scoped></style>
