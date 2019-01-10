// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import '@/assets/element-variables.scss'
import App from './App'

Vue.config.productionTip = false

Vue.use(ElementUI, {size: 'small'})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  beforeCreate() {
    // 打开页面时检查是否登录
    router.onReady(() => {
      //console.log('onReady')
      store.dispatch('getUser').then((user) => {
        authCheck(router.currentRoute, user, function (opt) {
          if (opt) {
            router.replace({path: opt.path});
          }
        })
      })
    })
    //路由跳转时执行
    router.beforeEach((to, from, next) => {
      //console.log('beforeEach', to.meta.requiresAuth)
      // 检查是否登录，根据router中配置的meta:requiresAuth项决定是否需要判断
      if (!to.meta.requiresAuth) {
        next();
      } else {
        store.dispatch('getUser').then(user => {
          authCheck(to, user, next)
        })
      }
    })
  }
})

function authCheck(router, user, next) {
  //用户是否登录检验
  if (user && user.uid) {
    //路由跳转权限检验，配置requiresAuth需要验证用户角色是否有能访问；
    if (router.meta.requiresAuth) {
      if (router.meta.authRoles && router.meta.authRoles.indexOf(user.role) > -1) {
        next()
      } else {
        next({path: '/noAuth', query: {redirect: router.fullPath}})
      }
    } else {
      next()
    }
  } else {
    next({path: '/login', query: {redirect: router.fullPath}})
  }
}

//request请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
  config => {
    //针对GET请求，统一增加时间戳,解决ie11 304问题。
    if (config.method === 'GET') {
      config.params._t = new Date().getTime();
    }
    //请求前判断是否存在用户后token，如果存在，则统一在http请求的header加上token；本例未使用，但可以考虑
    if (store.state.token) {
      config.headers.Authorization = store.state.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// response响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
    //响应所有statuso为200的情况，默认为成功；
    //也可以针对不同业务，返回都是200，根据data.errno来区分处理
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        //未登录处理
        case 400:
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
          })
          break;
        //无权限处理
        case 401:
          router.replace({
            path: 'noAuth'
          })
          break
        //无路由处理
        case 404:
          router.replace({
            path: '/noFound'
          })
          break
        //其它处理
        default:
          router.replace({
            path: '/'
          })
          break
      }
    }
    return Promise.reject(error.response.data)
  });
