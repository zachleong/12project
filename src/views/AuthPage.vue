<template>
    <div class="container">
        <el-tabs type="border-card">
            <el-tab-pane label="Sign in">
                <AuthForm />
            </el-tab-pane>
            <el-tab-pane label="Register">
                <SignUp />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue";
import SignUp from "@/components/SignUp.vue";

export default {
    components: {
        AuthForm,
        SignUp
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin-top: 50px;
    width:400px;
    text-align: center;
    display: inline-block;
}
</style>
