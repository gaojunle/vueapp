# 基于vue框架的tpl

> 基于vue搭建前端框架，包含用户登录验证、权限检验管理、目录展示三个基础功能模块

## 安装
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 结构说明
> * main.js中添加axios的全局请求与响应拦截器，在路由构建及跳转进行权限和登录验证，引入emement-ui做为全局UI框架，添加
> * api/存放所有接口请求，可按业务分目录，按需求引入接口名（E6对象扩展方式）
> * store/目录采用vuex管理全局状态，框架提供获取用户及目录状态切换状态的变更，提供判断是否登录getters
> * components/目录，common/存放所有公共组件，其它为业务组件，可按目录分类管理；
> * router/路由目录，配置路由状态及是否要检验、显示目录、用户角色权限等；
### 登录验证
> * 在main.js中的路由onReady及beforeEach钩子函数中，判断要进入的路由，调用authCheck去判断路由是否需要登录，
> * 如果需要，则去判断用户状态，如未登录则跳转到登录页；
> * 主要研究authCheck函数；
### 权限检验
> * 首先在router的meta配置authRoles，然后在路由钩子函数中去校验，逻辑在authCheck函数中，验证已登录用户的角色是否与配置项中有匹配，
> * 如果匹配，则访问；否则跳转/noAuth页；
### 目录展示（根据路由）
> * 目录展示也是权限管理中一部分，无权限用户，则不展示对应目录；因此将目录与权限配置在router的meta中，
属性menu中配置name及icon（可扩展），再结合authRoles即可根据角色展示目录；
> * 主要逻辑在Menu.vue中

### 测试验证
可直接在store中改变getUser如下代码，注释切换用户是否登录；
``` bash
commit('setUser', {
  uid: '12222',
  name: 'gj',
  role: 'user1'
});
``` 

可直接在router中改变NoAuthTest路由配置，测试
``` bash
requiresAuth //是否检验（包含登录及权限）
menu      //目录
authRoles //角色
``` 
