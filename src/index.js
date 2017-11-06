import 'babel-polyfill';
import Vue from 'vue';
import VueMaterial from 'vue-material'
import App from 'App'

Vue.use(VueMaterial.MdCore)
Vue.use(VueMaterial.MdSpinner)
Vue.use(VueMaterial.MdButton)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})

