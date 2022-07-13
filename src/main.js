import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VDG from 'volumetric-datagrid';
import VueMask from 'v-mask'


Vue.config.productionTip = false;

Vue.use(VDG);
Vue.use(VueMask);

new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
