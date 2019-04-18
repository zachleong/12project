<template>
  <div>
    <h1>Register</h1>
    <el-form>
      <el-form-item label="Email">
        <el-input placeholder="Please enter email" v-model="email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          @keyup.enter.native="onSubmit"
          placeholder="Please enter password"
          v-model="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true
    };
  },
  methods: {
    onSubmit() {
      if (!this.formIsValid) {
        console.log("form not valid");
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
