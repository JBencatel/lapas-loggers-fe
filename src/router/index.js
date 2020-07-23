import Vue from "vue";
import VueRouter from "vue-router";
import ShoresPage from "../components/pages/Management/Shores/ShoresPage.vue";
import ShoresList from "../components/pages/Management/Shores/ShoresList.vue";
import ShoreDetails from "../components/pages/Management/Shores/Details/ShoreDetails.vue";
import PositionsPage from "../components/pages/Management/Positions/PositionsPage.vue";
import LoggersPage from "../components/pages/Management/Loggers/LoggersPage.vue";
import ServicingsPage from "../components/pages/Management/Servicings/ServicingsPage.vue";
import PeoplePage from "../components/pages/Management/People/PeoplePage.vue";
import OptionsLists from "../components/pages/Management/OptionsLists.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/explore",
    name: "Explore",
    component: () => import("../views/Explore.vue")
  },
  {
    path: "/management",
    name: "Management",
    component: () => import("../views/Management.vue"),
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
        component: ServicingsPage
      },
      {
        path: "people",
        name: "People",
        component: PeoplePage
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
