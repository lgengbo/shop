// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import Vuex from 'vuex'
import store from './store/index'
import axios from './server/axios'
import util from './libs/util'
import { Button, Row, Col, Search, Swipe, SwipeItem, Field, NavBar, Toast, Form } from 'vant'

Vue.use(Vuex)
Vue.use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Field).use(NavBar).use(Toast).use(Form)

Vue.use(VueLazyload)
Vue.prototype.$util = util
Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
