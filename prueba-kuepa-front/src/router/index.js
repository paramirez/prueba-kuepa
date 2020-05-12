import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter(to, from, next) {
      if (store.state.login) return next("/chat");
      next();
    },
  },
  {
    path: "/chat",
    name: "Chat",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    beforeEnter(to, from, next) {
      if (store.state.login) next();
      else next({ name: "Login" });
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Chat.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("tokenkuepa");
  if (token && !store.state.login) {
    store.dispatch("reloadSession");
  }
  next();
});

export default router;
