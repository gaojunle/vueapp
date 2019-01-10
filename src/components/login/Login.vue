<template>
  <el-container>
    <el-container>
      <el-header>
        <common-header simple></common-header>
      </el-header>
      <el-main class="login">
        <el-tabs type="border-card" value="login">
          <el-tab-pane label="登录" name="login">
            <el-form :model="login" :rules="ruleLogin" ref="login" label-width="80px" size="large">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="login.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="login.password"></el-input>
                <!--<a href="#" style="float:right;" @click.prevent="forgetPassword">忘记密码？</a>-->
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="register">注册暂未开放</el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import Header from "@/components/common/Header.vue";
  import {login} from "@/api/api";


  export default {
    components: {
      commonHeader: Header
    },
    data() {
      return {
        login: {
          username: "abc",
          password: "111"
        },
        ruleLogin: {
          username: [
            {
              required: true,
              message: "请输入邮箱.",
              trigger: "blur"
            }
          ],
          password: [
            {
              required: true,
              message: "请输入密码.",
              trigger: "blur"
            },
            {
              type: "string",
              min: 6,
              message: "密码长度不小于6位",
              trigger: "blur"
            }
          ]
        }
      };
    },
    methods: {
      handleLogin() {
        this.$refs["login"].validate(valid => {
          if (valid) {
            login(this.login)
              .then(data => {
                this.$store.commit("setUser", data.user);
                let url = this.$route.query.redirect; //返回之前的页面
                this.$router.push(url ? url : "/user/list");
              })
              .catch(err => {
                this.$message.error(err.errmsg);
              });
          }
        });
      },
      forgetPassword() {
        this.$router.push("/forgetPassword");
      }
    },
    mounted() {
      //console.log(this.$router);
    }
  };
</script>

<style type="text/scss" lang="scss" scoped>
  .login {
    .el-tabs {
      width: 420px;
      margin: 50px auto;
      form {
        margin-top: 40px;
      }
    }
  }
</style>

