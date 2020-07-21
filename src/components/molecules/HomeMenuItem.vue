<template>
  <v-card max-width="100%" @click="goTo(page)">
    <v-card-title v-text="title" class="text-center" />
  </v-card>
</template>

<script>
export default {
  name: "HomeMenuItem",

  props: {
    title: String,
    icon: String,
    page: String
  },

  methods: {
    goTo(page){
      this.$router.push({ name: page})
    }
  }
};
</script>

<style></style>
