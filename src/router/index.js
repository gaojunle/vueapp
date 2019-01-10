import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/common/Layout'
import Login from '@/components/login/Login'
import NoAuth from '@/components/common/NoAuth'
import NoFound from '@/components/common/noFound'

const AntiIndex = () => import(/* webpackChunkName: "antiGambling" */ '@/components/antiGambling/AntiIndex')
const List = () => import(/* webpackChunkName: "antiGambling" */ '@/components/antiGambling/List')
const NoAuthTest = () => import(/* webpackChunkName: "antiGambling" */ '@/components/noAuth/NoAuthTest')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: '/',
      name: 'index',
      redirect: '/anti/index',
      meta: {name: '首页'}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/noAuth',
      name: 'noAuth',
      component: NoAuth
    },
    {
      path: '/noFound',
      name: '404',
      component: NoFound
    },
    {
      path: '/anti',
      redirect: '/anti/index',
      component: Layout,
      meta: {
        requiresAuth: true,
        menu: {
          name: '反赌博',
          icon: "el-icon-document",
        },
        authRoles: ['admin', 'user1']
      },
      children: [
        {
          path: 'index',
          component: AntiIndex,
          meta: {
            requiresAuth: true,
            menu: {name: '反赌博主页'},
            authRoles: ['admin', 'user1']
          }
        },
        {
          path: 'list',
          component: List,
          meta: {
            requiresAuth: true,
            menu: {name: '列表页'},
            authRoles: ['admin', 'user1']
          }
        }
      ]
    },
    {
      path: '/noAuthTest',
      redirect: '/noAuthTest/index',
      component: Layout,
      meta: {
        requiresAuth: true,
        menu: {
          name: 'noAuthTest',
          icon: "el-icon-document",
        },
        authRoles: ['admin', 'user1']
      },
      children: [{
        path: 'index',
        component: NoAuthTest,
        meta: {
          requiresAuth: true,
          menu: {name: 'noAuth'},
          authRoles: ['admin', 'user1']
        }
      }]
    },
  ]
})
