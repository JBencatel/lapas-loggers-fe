<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              label="Logger"
              v-model="editedItem.serial_id"
              :items="loggers"
              item-text="name"
              item-value="id"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              label="Servicing"
              v-model="editedItem.servicing_id"
              :items="servicings"
              :item-text="servicingName"
              item-value="id"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Time off-sync"
              v-model="editedItem.off_sync"
              type="number"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="12">
            <v-file-input
              label="Log file"
              accept=".txt"
              @change="handleFileUpload"
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
    },
    loggers: {
      type: Array,
      required: true
    },
    servicings: {
      type: Array,
      required: true
    },
    shores: {
      type: Array,
      required: true
    }
  },

  data: () => ({ file: undefined }),

  methods: {
    servicingName(servicingItem) {
      let shoreName = this.getShoreName(servicingItem.shore_id);
      return shoreName + " - " + servicingItem.date;
    },
    getShoreName(id) {
      let shore = this.shores.find(item => item.id === id);
      return shore.name;
    },

    handleFileUpload(file) {
      this.editedItem.log_file = file;
    }
  }
};
</script>

<style></style>
