<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="loginForm"
    >
      <el-form-item>
        <h2>欢迎进入气死了么</h2>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import { getUserLogin } from "../utils/axios";
export default {
  data() {
    return {
      /* 表单输入 */
      loginForm: {
        username: "",
        password: "",
      },
      /* 规则验证 */
      rules: {
        username: [
          //必填验证
          { required: true, message: "请输入用户名", trigger: "blur" },
          //字符验证
          {
            min: 2,
            max: 10,
            message: "长度在2到10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在6到15字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getUserLogin(this.loginForm)
          .then(res=>{
            if(res.data.code==200){
              this.$message.success(res.data.msg);
              // sessionStorage.setItem('userInfo',JSON.stringify(res.data.list))
              this.changeUserInfoAction(res.data.list)
              this.$router.push('/home')
            }else{
              this.$message.error(res.data.msg)
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style  scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: #ccc;
}
.loginForm {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 250px;
  width: 400px;
  margin: -125px 0 0 -200px;
  padding: 50px 60px 0 0;
  border: 1px solid #fff;
}
h2 {
  text-indent: 1rem;
  font-size: 2rem;
  color: #fff;
}
.el-button {
  text-align: center;
  margin-left: 80px;
}
</style>
