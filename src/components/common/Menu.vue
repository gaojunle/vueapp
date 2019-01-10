<template>
  <div>
    <el-header>
      <a href="/" class="layout-logo" :class="{'layout-logo-small':isCollapse}">反赌博平台</a>
    </el-header>
    <el-menu :default-active="$route.path" :router="true" :collapse="isCollapse">
      <el-submenu :index="item.url" v-for="(item,index) in menu" :key="index">
        <template slot="title">
          <i :class="item.icon ? item.icon :'el-icon-message'"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <el-menu-item v-for="(v,i) in item.children" :index="v.url" :key="i">{{v.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import router from '@/router'

  let menu = []
  export default {
    data() {
      return {
        menu: menu
      };
    },
    computed: {
      isCollapse() {
        return this.$store.state.menu && this.$store.state.menu.isCollapse;
      }
    },
    mounted() {
      var user = this.$store.state.user;
      let userRole = '';
      if (user) {
        userRole = user.role;
        this.menu = getRoute(router.options.routes)
      }

      //console.log(JSON.stringify(this.menu))

      //递归遍历routes，检验权限后生成目录
      function getRoute(routes, rootPath) {
        var menus = [];
        routes.forEach((route) => {
          if (route.meta) {
            let mMenu = route.meta.menu;
            let mAuthRoles = route.meta.authRoles;
            let hasAuth = route.meta.requiresAuth && mAuthRoles && mAuthRoles.indexOf(userRole) > -1;

            if (mMenu && hasAuth) {
              let fmenu = {
                name: mMenu.name,
                url: rootPath ? rootPath + '/' + route.path : route.path,
                icon: mMenu.icon
              }
              if (route.children) {
                fmenu.children = getRoute(route.children, fmenu.url)
              }
              menus.push(fmenu)
            }
          }
        })
        return menus;
      }
    }
  };
</script>

<style type="text/scss" lang="scss" scoped>
  .el-menu {
    border-right: none;
    .el-menu-item {
      &.is-active {
        background: #e6f8f9;
      }
    }
  }

  .el-menu--collapse {
    .is-active {
      background: #e6f8f9;
      .el-submenu__title i {
        color: #00b8c5;
      }
    }
  }

  .el-header {
    padding: 11px 0px;
    overflow: hidden;
  }

  .layout-logo {
    display: block;
    line-height: 36px;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    color: white;
  }

  .layout-logo-small {
    font-size: 12px;
  }
</style>


