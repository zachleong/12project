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
          @keyup.enter.native="e => onSubmit(e)"
          placeholder="Please enter password"
          v-model="password"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <button class="button" @click="e => onSubmit(e)">Register</button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createAccount } from "@/firebase/firebase";
import store from "@/Vuex/store";
import { allowedChars } from "@/AllowedChars";
export default {
  data() {
    return {
      email: "",
      password: "",
      username: ""
    };
  },
  methods: {
    emailValid(email) {
      console.log(email);
      let regex = /\S+@\S+\.\S+/;
      if (regex.test(email)) {
        return true;
      } else {
        return false;
      }
    },
    nameValid(username) {
      console.log(username);
      for (let char of username) {
        if (!allowedChars.includes(char)) {
          return false;
        }
      }
      return true;
    },
    pwdValid(password) {
      let numbercount = 0;
      if (password.length < 8) {
        return false;
      }
      for (let char of password) {
        //If character is not in allowed characters
        if (!allowedChars.includes(char)) {
          return false;
        }
        if (!isNaN(char)) {
          numbercount++;
        }
      }
      if (numbercount < 2) {
        return false;
      }
      return true;
    },
    formIsValid() {
      if (
        this.pwdValid(this.password) &&
        this.emailValid(this.email) &&
        this.nameValid(this.username)
      ) {
        return true;
      } else {
        return false;
      }
    },
    onSubmit(e) {
      e.preventDefault();
      if (!this.formIsValid()) {
        console.log("form not valid");
      } else {
        store.commit("loading", true);
        createAccount(this.username, this.email, this.password)
          .then(() => {
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
