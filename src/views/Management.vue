<template>
  <v-container>
    <app-navigation :items="menuItems" />

    <v-main><router-view /></v-main>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-container>
</template>

<script>
import AppNavigation from "../components/organisms/AppNavigation";
export default {
  name: "ManagementPage",

  components: { AppNavigation },

  data: () => ({
    menuItems: [
      { icon: "mdi-apple-safari", text: "Projects", link: "/projects" },
      { icon: "mdi-beach", text: "Shores", link: "/shores" },
      { icon: "mdi-leak", text: "Loggers", link: "/loggers" },
      { icon: "mdi-calendar-refresh", text: "Servicings", link: "/servicings" },
      { icon: "mdi-account-group", text: "People", link: "/people" },
      {
        icon: "mdi-format-list-bulleted-type",
        text: "Options Lists",
        link: "/lists"
      },
      { divider: true }
    ]
  })
};
</script>

<style></style>
