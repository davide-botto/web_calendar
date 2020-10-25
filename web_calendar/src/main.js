import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import Axios from 'axios'
import {app_computed_props} from "./mixins/app_comp_props";
import {data_layoutProps} from "./mixins/layout";

Vue.config.productionTip = false

Vue.mixin(app_computed_props);
Vue.mixin(data_layoutProps);

export const EventBus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
