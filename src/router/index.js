import Vue from "vue";
import VueRouter from "vue-router";
import UploadLogsPage from "../components/pages/Management/UploadLogs/UploadLogsPage.vue";
import ShoresPage from "../components/pages/Management/Shores/ShoresPage.vue";
import ShoresList from "../components/pages/Management/Shores/ShoresList.vue";
import ShoreDetails from "../components/pages/Management/Shores/Details/ShoreDetails.vue";
import PositionsPage from "../components/pages/Management/Positions/PositionsPage.vue";
import LoggersPage from "../components/pages/Management/Loggers/LoggersPage.vue";
import ServicingsPage from "../components/pages/Management/Servicings/ServicingsPage.vue";
import PeoplePage from "../components/pages/Management/People/PeoplePage.vue";
import LogsPage from "../components/pages/Management/Logs/LogsPage.vue";
import OptionsLists from "../components/pages/Management/OptionsLists.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/explore",
    name: "Explore",
    component: () => import(/* webpackChunkName: "explore" */ "../views/Explore.vue")
  },
  {
    path: "/management",
    name: "Management",
    component: () => import(/* webpackChunkName: "management" */ "../views/Management.vue"),
    children: [
      {
        path: "upload-logs",
        name: "Upload Logs",
        component: UploadLogsPage
      },
      {
        path: "shores",
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
        path: "logs",
        name: "Logs",
        component: LogsPage
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
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
