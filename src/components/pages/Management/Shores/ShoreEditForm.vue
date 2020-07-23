<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.code" label="Code" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="editedItem.name" label="Shore name" />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              v-model="editedItem.country_id"
              :items="countries"
              item-text="name"
              item-value="id"
              label="Country"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              v-model="editedItem.fwunit_id"
              label="Field Work Unit"
              :items="fieldWorkUnits"
              item-text="name"
              item-value="id"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="editedItem.latitude"
              label="Latitude"
              type="number"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="editedItem.longitude"
              label="Longitude"
              type="number"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('close')">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="$emit('save')">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ShoreEditForm",

  props: {
    formTitle: {
      type: String,
      required: true
    },
    editedItem: {
      type: Object,
      required: true
    },
    countries: {
      type: Array,
      required: true
    },
    fieldWorkUnits: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>
