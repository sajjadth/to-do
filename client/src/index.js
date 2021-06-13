import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router/router";
import VueSax from "vuesax";
import store from "./store";

Vue.use(VueSax);
Vue.use(VueRouter);
Vue.use(store);

new Vue({
  render: (h) => h(App),
  el: "#app",
  router,
  store
});
