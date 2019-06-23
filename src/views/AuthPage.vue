<template>
  <div class="container">
    <el-tabs type="border-card" v-loading="loading" v-if="isLogin">
      <el-tab-pane label="Login">
        <AuthForm />
      </el-tab-pane>
      <el-tab-pane label="Register">
        <SignUp />
      </el-tab-pane>
    </el-tabs>
    <el-tabs type="border-card" v-loading="loading" v-else>
      <el-tab-pane label="Register">
        <SignUp />
      </el-tab-pane>
      <el-tab-pane label="Login">
        <AuthForm />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue";
import SignUp from "@/components/SignUp.vue";
import store from "@/Vuex/store";

export default {
  data() {
    return {};
  },
  computed: {
    loading() {
      return store.state.loading;
    },
    isLogin() {
      return this.$route.path == "/login";
    }
  },
  components: {
    AuthForm,
    SignUp
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 70px;
  width: 400px;
  text-align: center;
  display: inline-block;
}
</style>
