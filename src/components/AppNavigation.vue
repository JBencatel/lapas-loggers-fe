<template>
  <div>
    <v-app-bar app color="indigo" dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">
        Lapas Loggers
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="i" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn small text>edit</v-btn>
            </v-col>
          </v-row>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-1" />
          <v-list-item v-else :key="i" link :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'AppNavigation',

  data: () => ({
    drawer: true,
    items: [
      { icon: "mdi-beach", text: "Shores", link: "/shores" },
      { icon: "mdi-leak", text: "Loggers", link: "/loggers" },
      { icon: "mdi-calendar-refresh", text: "Servicings", link: "/servicings" },
      { icon: "mdi-account-group", text: "People", link: "/people" },
      { divider: true },
      { icon: "mdi-information", text: "About", link: "/about" }
    ]
  })
};
</script>

<style></style>
