<template>
  <div class="no-auth-box">
    <h2>您没有权限访问该页面，{{countdown}}秒后跳转到首页</h2>
    <router-link to="/" replace>点击跳转</router-link>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        countdown: 5,
      }
    },
    mounted() {
      setInterval(() => {
        this.countdown--;
        if (this.countdown == 0) {
          this.$router.replace({path: '/', params: {reason: 'noauth'}})
        }
      }, 1000)
    }
  };
</script>
<style type="text/scss" lang="scss" scoped>
  .no-auth-box {
    width: 800px;
    height: 400px;
    border: 1px dotted #5d4d8b;
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    margin: 50px auto;
    flex-wrap: wrap;
    padding-top: 130px;
    box-sizing: border-box;
    h2 {
      width: 100%;
    }
  }
</style>
