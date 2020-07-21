<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <shore-card :shore-id="shoreID" />
      </v-col>
      <v-col cols="12" sm="6" md="8"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import ShoreCard from "./ShoreCard";
export default {
  name: "ManagementShoreDtails",

  components: { ShoreCard },

  computed: {
    shoreID() {
      return this.$route.params.id;
    }
  }
};
</script>

<style></style>
