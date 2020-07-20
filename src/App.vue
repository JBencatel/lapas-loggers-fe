<template>
  <v-app id="app" style="max-height: 100vh; overflow:auto">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 7.5px;
}
/* Track */
::-webkit-scrollbar-track {
  border: 1px solid lightgray;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: lightgray;
  border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: darkgray;
}
</style>
