<template>
  <v-container>
    <app-navigation :items="menuItems" />

    <v-main>
      <router-view />
    </v-main>
  </v-container>
</template>

<script>
import AppNavigation from "../components/organisms/AppNavigation";
export default {
  name: "ManagementPage",

  components: { AppNavigation },

  data: () => ({
    menuItems: [
      {
        icon: "mdi-file-upload",
        text: "Upload Logs",
        page: "Upload Logs"
      },
      { divider: true },
      { icon: "mdi-beach", text: "Shores List", page: "Shores List" },
      { icon: "mdi-map-marker", text: "Positions", page: "Positions" },
      { icon: "mdi-leak", text: "Loggers", page: "Loggers" },
      { icon: "mdi-account-group", text: "People", page: "People" },
      { icon: "mdi-calendar-refresh", text: "Servicings", page: "Servicings" },
      { icon: "mdi-post-outline", text: "Logs", page: "Logs" },
      {
        icon: "mdi-format-list-bulleted-type",
        text: "Options Lists",
        page: "Options Lists"
      },
      { divider: true }
    ]
  })
};
</script>

<style></style>
