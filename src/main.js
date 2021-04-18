// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/base.css'
import './assets/css/home.css'
import './assets/css/noteDetail.css'
import './assets/css/addingNote.css'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import axios from 'axios'
import common from './assets/js/common'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.common = common
Vue.component('mavonEditor', mavonEditor)
Vue.component('Treeselect', Treeselect)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
