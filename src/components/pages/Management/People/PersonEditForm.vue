<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Name"
              v-model="editedItem.name"
              type="text"
              :rules="requiredRules"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Nickname"
              v-model="editedItem.nickname"
              type="text"
              :rules="requiredRules"
              required
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
  name: "PositionEditForm",

  props: {
    formTitle: {
      type: String,
      required: true
    },
    editedItem: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    requiredRules: [v => !!v || "Field is required"]
  })
};
</script>

<style></style>
