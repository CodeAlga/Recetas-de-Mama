import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import VueFuse from "vue-fuse";
import AsyncComputed from "vue-async-computed";

Vue.config.productionTip = false;

Vue.use(VueFuse);
Vue.use(AsyncComputed);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
