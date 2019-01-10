<template>
  <div v-if="!simple">
    <el-button type="primary" icon="el-icon-menu" size="medium" @click="toggleMenu"></el-button>
    <span class="menu-right">
      <el-dropdown v-if="user && user.uid" @command="handleCommand">
        <el-button type="primary" size="medium">
          {{user.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-else @click="login" type="primary" size="medium">登录</el-button>
    </span>
  </div>
</template>

<script>
  import {logout} from "@/api/api";

  export default {
    props: {
      simple: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      toggleMenu() {
        this.$store.commit(
          "setMenuCollapse",
          !(this.$store.state.menu && this.$store.state.menu.isCollapse)
        );
      },
      handleCommand(type) {
        switch (type) {
          case "changePwd":
            this.$router.push("/user/changePwd");
            break;
          case "logout":
            this.logout();
            break;
        }
      },
      login() {
        this.$router.replace("/login");
      },
      logout() {
        logout().then(data => {
          this.$store.commit("setUser", {}); //清理sessionStorage
          this.$router.replace("/login");
        });
      }
    }
  };
</script>
<style type="text/scss" lang="scss" scoped>
  .menu-right {
    float: right;
  }

  .el-header {
    padding: 11px 0px !important;
    overflow: hidden;
  }
</style>
