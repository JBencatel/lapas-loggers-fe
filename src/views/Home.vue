<template>
  <v-container fluid fill-height class="home-hero">
    <v-row justify="center" align="center" column pa-5 wrap class="text-center">
      <v-col
        cols="12"
        class="display-3 font-weight-black white--text text-xs-center"
      >
        Welcome to
      </v-col>
      <v-col
        cols="12"
        class="display-3 font-weight-black white--text text-xs-center mb-3"
      >
        LAPAS LOGGERS PROJECT
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  components: {}
};
</script>

<style scoped>
.home-hero {
  background: url("https://upload.wikimedia.org/wikipedia/commons/f/f4/Rocky_beach.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
