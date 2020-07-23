import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Explore from "../views/Explore.vue";
import Management from "../views/Management.vue";
import About from "../views/About.vue";
import ShoresPage from "../components/pages/Management/Shores/ShoresPage.vue";
import ShoresList from "../components/pages/Management/Shores/ShoresList.vue";
import ShoreDetails from "../components/pages/Management/Shores/Details/ShoreDetails.vue";
import PositionsPage from "../components/pages/Management/Positions/PositionsPage.vue";
import LoggersPage from "../components/pages/Management/Loggers/LoggersPage.vue";
import OptionsLists from "../components/pages/Management/OptionsLists.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/explore",
    name: "Explore",
    component: Explore
  },
  {
    path: "/management",
    name: "Management",
    component: Management,
    children: [
      {
        path: "shores",
        name: "Shores",
        component: ShoresPage,
        children: [
          {
            path: "",
            name: "Shores List",
            component: ShoresList
          },
          {
            path: ":id",
            name: "Shore Details",
            component: ShoreDetails
          }
        ]
      },
      {
        path: "positions",
        name: "Positions",
        component: PositionsPage
      },
      {
        path: "loggers",
        name: "Loggers",
        component: LoggersPage
      },
      {
        path: "servicings",
        name: "Servicings",
        component: About
      },
      {
        path: "people",
        name: "People",
        component: About
      },
      {
        path: "lists",
        name: "Options Lists",
        component: OptionsLists
      }
    ]
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
