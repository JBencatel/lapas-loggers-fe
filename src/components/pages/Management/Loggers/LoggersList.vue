<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Loggers</v-toolbar-title>

      <v-spacer />

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
            @click="createItem"
          >
            New Item
          </v-btn>
        </template>
        <logger-edit-form
          :edited-item="editedItem"
          :form-title="formTitle"
          :positions="positions"
          :logger-types="loggerTypes"
          @close="close"
          @save="save"
        />
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="loggers"
      :loading="loading"
      no-data-text="No loggers have been created yet."
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click.stop="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click.stop="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import LoggerEditForm from "./LoggerEditForm";

export default {
  name: "ManageLoggersList",

  components: { LoggerEditForm },

  data: () => ({
    dialog: false,
    loading: true,
    headers: [
      {
        text: "Code",
        align: "start",
        value: "code"
      },
      { text: "Name", value: "name" },
      { text: "Position", value: "position_id" },
      { text: "Logger Type", value: "logger_type" },
      { text: "Deployment Date", value: "deployment_date" },
      { text: "Termination Date", value: "termination_date" },
      { text: "Inactive", value: "inactive" },
      { text: "Original Name", value: "original_name" },
      { text: "Actions", value: "actions", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      name: undefined,
      position_id: undefined,
      logger_type: undefined,
      deployment_date: undefined,
      termination_date: undefined,
      inactive: false,
      original_name: undefined
    },

    positions: [],
    loggerTypes: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    loggers() {
      return this.$store.getters.getLoggers;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions([
      "fetchLoggers",
      "addLogger",
      "editLogger",
      "removeLogger",
      "fetchPositions",
      "fetchOptionsList"
    ]),

    initialize() {
      this.getLoggers();
      this.getOptionsLists();
    },

    getLoggers() {
      this.fetchLoggers().then(() => {
        this.loading = false;
      });
    },

    getOptionsLists() {
      this.fetchPositions().then(data => {
        this.positions = data;
      });
      this.fetchOptionsList("logger-types").then(data => {
        this.loggerTypes = data;
      });
    },

    createItem() {
      this.editedItem = Object.assign({}, this.defaultItem);
    },

    editItem(item) {
      this.editedIndex = this.loggers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.removeLogger(item.id);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.editLogger(this.editedItem);
      } else {
        this.addLogger(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style></style>
