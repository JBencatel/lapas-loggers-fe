<template>
  <v-container fluid class="about">
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
        class="text-h1 font-weight-black white--text text-xs-center text-uppercase"
      >
        About
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
.about {
  background: url("https://images.unsplash.com/photo-1535209821329-b6318a68a547?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=923&q=80");
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
