<template>
  <div>
    <h1>Login</h1>
    <el-form>
      <el-form-item label="Email">
        <el-input placeholder="Please enter email" v-model="email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          @keyup.enter.native="onSubmit"
          placeholder="Please enter password"
          v-model="password"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <button type="primary" @click="e => onSubmit(e)" class="button">
          Login
        </button>
        <el-alert v-if="error != ''" :title="error" type="error" show-icon />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import store from "@/Vuex/store";
// import { googleLogin } from "@/firebase/firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      store.commit("loading", true);
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          switch (error.code) {
            case "auth/wrong-password":
              this.error = "Wrong password";
              break;
            case "auth/invalid-email":
              this.error = "Please enter a valid email";
              break;
            case "auth/user-not-found":
              this.error = "There is no user with that email address";
              break;
            default:
              this.error = error.message;
          }
        })
        .finally(() => {
          store.commit("loading", false);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.google-but {
  //   background-color: #42b983;
  background-color: rgb(19, 206, 102);
  border: none;
  display: inline-block;
  // TODO - add more padding to match login button
  margin-top: 15px;
}
.google-but:hover {
  background-color: #69c99e;
}
button {
  margin-bottom: 15px;
}
</style>
