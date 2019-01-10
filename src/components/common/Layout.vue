<template>
  <el-container direction="horizontal">
    <el-aside :width="sideWidth">
      <el-container direction="vertical">
        <common-menu></common-menu>
      </el-container>
    </el-aside>
    <el-container direction="vertical">
      <el-header>
        <common-header></common-header>
      </el-header>
      <el-main :style="{minHeight:minHeight}">
        <el-breadcrumb>
          <el-breadcrumb-item v-for="item in breadcrumbList" :to="item.path" :key="item.meta.menu.name">
            {{item.meta.menu.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main-body">
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import Header from "./Header.vue";
  import Menu from "./Menu.vue";

  export default {
    components: {
      commonHeader: Header,
      commonMenu: Menu
    },
    computed: {
      sideWidth() {
        return this.$store.state.menu && this.$store.state.menu.isCollapse
          ? "64px"
          : "200px";
      },
      minHeight() {
        // 计算内容高度，撑开页面
        let windowHeight =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
        return windowHeight - 60 + "px";
      },
      breadcrumbList() {
        let arr = this.$route.matched.slice(0, this.$route.matched.length - 1);
        arr.push(this.$route);
        return arr;
      }
    },
    mounted() {
      //console.log(this.$store)
    }
  };
</script>
<style type="text/scss" lang="scss" scoped>
  .el-aside {
    border-right: 1px solid #ededed;
    width: 64px;
    transition: width 0.5s;
  }

  .el-main {
    background: #f9f9f9;
  }

  .el-header {
    padding: 11px 20px;
    overflow: hidden;
  }

  .main-body {
    background: #fff;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ededed;
  }
</style>

