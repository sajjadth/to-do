import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Profile from "../views/Profile.vue";

const routes = [
  { path: "/", component: Home, name: "home" },
  { path: "/login", component: Login, name: "login" },
  { path: "/signup", component: Signup, name: "signup" },
  { path: "/profile", component: Profile, name: "profile", props: true},
];

const router = new VueRouter({
  routes,
});

export default router;
