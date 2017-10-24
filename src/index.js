
import Vue from 'vue'
import App from 'App'
import VeeValidate from 'vee-validate';
 
//import router from './router.js'

Vue.use(VeeValidate);

new Vue({
  el: '#app',
  //router,
  template: '<App/>',
  components: { App },
})

