<template>
  <v-app id="app">
    <app-navigation />

    <v-main>
      <router-view />
    </v-main>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppNavigation from "./components/AppNavigation";

export default {
  name: "App",

  components: { AppNavigation }
};
</script>

<style>
html {
  overflow: hidden;
}
</style>
