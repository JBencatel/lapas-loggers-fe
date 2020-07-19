<template>
  <v-container fluid fill-height class="home-hero">
    <v-container>
      <v-row
        justify="center"
        align="center"
        column
        pa-5
        wrap
        class="text-center"
      >
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
      <v-row>
        <v-col
          v-for="item in menuItems"
          :key="item.title"
          cols='12'
          lg="4"
          md="6"
          sm="12"
        >
          <home-menu-item
            :title="item.title"
            :link="item.link"
            :icon="item.icon"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import HomeMenuItem from "../components/molecules/HomeMenuItem.vue";
export default {
  name: "Home",

  components: { HomeMenuItem },

  data() {
    return {
      menuItems: [
        { title: "Explore", link: "/explore", icon: "mdi-compass" },
        {
          title: "Manage",
          link: "/management",
          icon: "mdi-card-bulleted-settings"
        },
        { title: "About", link: "/about", icon: "mdi-information" }
      ]
    };
  }
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
