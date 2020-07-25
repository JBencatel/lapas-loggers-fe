<template>
  <v-container fluid class="explore">
    <v-row justify="flex-start" class="text-center" style="height:100%">
      <v-col cols="12">
        <v-toolbar color="transparent" flat>
          <v-btn icon @click="$router.push({ name: 'Home' })">
            <v-icon color="white">mdi-arrow-left</v-icon>
          </v-btn>
          <v-spacer />
          <navbar-current-user />
        </v-toolbar>
      </v-col>
      <v-col
        cols="12"
        class="text-h1 font-weight-black text-xs-center text-uppercase"
      >
        Explore
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NavbarCurrentUser from "../components/molecules/CurrentUser";
export default {
  name: "ExplorePage",

  components: { NavbarCurrentUser }
};
</script>

<style>
.explore {
  background: url("https://images.unsplash.com/photo-1473163928189-364b2c4e1135?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
