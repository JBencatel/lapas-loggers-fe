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
      { icon: "mdi-beach", text: "Shores", page: "Shores List" },
      { icon: "mdi-map-marker", text: "Positions", page: "Positions" },
      { icon: "mdi-leak", text: "Loggers", page: "Loggers" },
      { icon: "mdi-calendar-refresh", text: "Servicings", page: "Servicings" },
      { icon: "mdi-account-group", text: "People", page: "People" },
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
