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
        <br />
        <button @click="e => googleSignin(e)" class="button google-but">
          Login with Google
        </button>
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
      password: ""
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
          console.log(error);
        })
        .finally(() => {
          store.commit("loading", false);
        });
    },
    googleSignin(e) {
      e.preventDefault();
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then(() => {
          this.$router.push({ name: "home" });
        })
        .catch(error => {
          console.log(error.message);
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
</style>
