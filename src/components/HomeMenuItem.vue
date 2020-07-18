<template>
  <v-card max-width="100%" :to="link">
    <v-card-title v-text="title" class="text-center" />
  </v-card>
</template>

<script>
export default {
  name: "HomeMenuItem",

  props: {
    title: String,
    icon: String,
    link: String
  }
};
</script>

<style></style>
