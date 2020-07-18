<template>
  <v-container>
    <app-navigation />

    <v-main><router-view /></v-main>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-container>
</template>

<script>
import AppNavigation from "../components/AppNavigation";
export default {
  name: "ManagementPage",

  components: { AppNavigation }
};
</script>

<style></style>
