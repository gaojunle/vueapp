<template>
  <div class="no-auth-box">
    <h2>接口返回404</h2>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        countdown: 10,
      }
    },
    mounted() {
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
