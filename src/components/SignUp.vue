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
    onSubmit(e) {
      e.preventDefault();
      if (!this.formIsValid) {
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
