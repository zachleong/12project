<template>
  <div>
    <h1>Register</h1>
    <el-form>
      <el-form-item label="Username">
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
      <el-alert
        v-if="usernameError != ''"
        :title="usernameError"
        type="error"
        show-icon
      />
      <el-alert
        v-if="emailError != ''"
        :title="emailError"
        type="error"
        show-icon
      />
      <el-alert
        v-if="passwordError != ''"
        :title="passwordError"
        type="error"
        show-icon
      />
      <el-alert
        v-if="otherError != ''"
        :title="otherError"
        type="error"
        show-icon
      />
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
      username: "",
      emailError: "",
      usernameError: "",
      passwordError: "",
      otherError: ""
    };
  },
  methods: {
    emailValid(email) {
      console.log(email);
      // Regex to test the email format
      let regex = /\S+@\S+\.\S+/;
      if (regex.test(email)) {
        return true;
      } else {
        this.emailError = "Please enter a valid email";
        return false;
      }
    },
    nameValid(username) {
      console.log(username);
      if (username.length < 5) {
        this.usernameError = "Your username must have at least 5 characters";
        return false;
      }
      for (let char of username) {
        if (!allowedChars.includes(char)) {
          this.usernameError =
            "Your username can only have numbers and letters";
          return false;
        }
      }
      return true;
    },
    pwdValid(password) {
      let numbercount = 0;
      if (password.length < 8) {
        this.passwordError = "Your password must be at least 8 characters";
        return false;
      }
      for (let char of password) {
        //If character is not in allowed characters
        if (!allowedChars.includes(char)) {
          this.passwordError =
            "Your password can only contain numbers and letters";
          return false;
        }
        if (!isNaN(char)) {
          numbercount++;
        }
      }
      if (numbercount < 2) {
        this.passwordError = "Your password must have at least 2 numbers in it";
        return false;
      }
      return true;
    },
    formIsValid() {
      this.otherError = "";
      this.emailError = "";
      this.passwordError = "";
      this.usernameError = "";
      const validpass = this.pwdValid(this.password);
      const validemail = this.emailValid(this.email);
      const validusername = this.nameValid(this.username);
      if (validpass && validemail && validusername) {
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
            this.otherError = error.message;
            console.log(error);
          });
      }
    }
  }
};
</script>
