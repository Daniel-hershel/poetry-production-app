// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './firebase';
import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
// import VueFire from 'vuefire'
import App from './App'
import router from './router'
import Velocity from 'velocity-animate'

Object.defineProperty(Vue.prototype, '$vel', { value: Velocity });
Vue.use(firestorePlugin)
// Vue.use(VueFire)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
