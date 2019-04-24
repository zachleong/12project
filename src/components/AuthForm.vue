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
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import store from "@/Vuex/store";
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (!this.formIsValid) {
        console.log("form not valid");
      } else {
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
      }
    }
  }
};
</script>
