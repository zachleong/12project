<template>
  <div>
    <h1>Register</h1>
    <el-form>
      <el-form-item label="Display Name">
        <el-input
          placeholder="Who do you want to be known as?"
          v-model="username"
        />
      </el-form-item>
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
        <button class="button" @click="onSubmit">Register</button>
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
      username: "",
      formIsValid: true
    };
  },
  methods: {
    onSubmit() {
      if (!this.formIsValid) {
        console.log("form not valid");
      } else {
        store.commit("loading", true);
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          //NOTE: is this the best way to do this?
          .then(usercred => {
            usercred.user.updateProfile({
              displayName: this.username
            });
            store.commit("loading", false);
            this.$router.push({ name: "home" });
          })
          .catch(error => {
            store.commit("loading", false);
            console.log(error);
          });
      }
    }
  }
};
</script>
