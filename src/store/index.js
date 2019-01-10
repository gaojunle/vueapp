import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {getUserInfo} from "@/api/api";

export default new Vuex.Store({
  state: {
    menu: {
      isCollapse: false
    },
    user: null
  },
  getters: {
    //相当计算属性，只有当user变化时，会更新；因外部会有判断用户是否登录需求，因此添加一个isLogined的getters；
    isLogined(state, getters) {
      return state.user && state.user.uid;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setMenuCollapse(state, collapse) {
      state.menu.isCollapse = collapse
    }
  },
  actions: {
    getUser({state, commit, getters}) {
      return new Promise((resolve, reject) => {
        commit('setUser', {
          uid: '12222',
          name: '高军',
          role: 'user1'
        });

        let user = state.user;
        if (getters.isLogined) {
          resolve(user)
        } else {
          getUserInfo().then(ret => {
            if (ret.errorno == '-2') {
              commit('setUser', null);
              resolve(user)
            } else {
              commit('setUser', ret.data)
              resolve(user)
            }
          }).catch(err => {
            commit('setUser', null)
            resolve(err)
          })
        }
      })
    }
  }
})
