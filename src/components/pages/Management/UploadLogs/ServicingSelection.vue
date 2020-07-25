<template>
  <div class="mb-5">
    <v-row v-if="!optionSelected" align="center">
      <v-col cols="12" sm="5" class="text-right">
        <v-btn block @click="optionSelected = 'select'">
          <v-icon left>mdi-cursor-pointer</v-icon>
          Select a servicing...
        </v-btn>
      </v-col>
      <v-col cols="12" sm="2" class="text-center">or</v-col>
      <v-col cols="12" sm="5" class="text-left">
        <v-btn block @click="optionSelected = 'create'">
          <v-icon left>mdi-plus-circle</v-icon>
          Create a servicing...
        </v-btn>
      </v-col>
    </v-row>

    <v-card v-if="optionSelected === 'select'" flat>
      <v-row>
        <v-col cols="1">
          <v-btn icon @click="optionSelected = undefined">
            <v-icon left>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="11">
          <v-card-title>
            Select a previously registered servicing...
          </v-card-title>
          <v-card-text>
            <v-autocomplete
              label="Servicing"
              v-model="servicingSelected"
              :items="servicings"
              :item-text="servicingName"
              item-value="id"
              required
            />
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "ManagementUploadFileServicingSelection",

  data: () => ({
    optionSelected: undefined,

    servicingSelected: undefined,

    servicings: [],
    shores: []
  }),

  mounted() {
    this.initialize();
  },

  methods: {
    ...mapActions(["fetchServicings", "fetchShores"]),

    initialize() {
      this.getOptionsLists();
    },

    getOptionsLists() {
      this.fetchServicings().then(data => {
        this.servicings = data;
      });
      this.fetchShores().then(data => {
        this.shores = data;
      });
    },
    servicingName(servicingItem) {
      let shoreName = this.getShoreName(servicingItem.shore_id);
      return shoreName + " - " + servicingItem.date;
    },
    getShoreName(id) {
      let shore = this.shores.find(item => item.id === id);
      return shore.name;
    }
  }
};
</script>

<style></style>
