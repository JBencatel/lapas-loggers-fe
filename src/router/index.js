import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/shores",
    name: "Shores",
    component: Home
  },
  {
    path: "/loggers",
    name: "Loggers",
    component: Home
  },
  {
    path: "/servicings",
    name: "Servicings",
    component: Home
  },
  {
    path: "/people",
    name: "People",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
