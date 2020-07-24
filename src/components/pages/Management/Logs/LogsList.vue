<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Logs</v-toolbar-title>

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
        <log-edit-form
          :edited-item="editedItem"
          :form-title="formTitle"
          :positions="positions"
          :log-types="logTypes"
          @close="close"
          @save="save"
        />
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="logs"
      :loading="loading"
      no-data-text="No logs have been created yet."
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
import LogEditForm from "./LogEditForm";

export default {
  name: "ManageLogsList",

  components: { LogEditForm },

  data: () => ({
    dialog: false,
    loading: true,
    headers: [
      { text: "Name", align: "start", value: "name" },
      { text: "Position", value: "position_id" },
      { text: "Log Type", value: "log_type" },
      { text: "Deployment Date", value: "deployment_date" },
      { text: "Termination Date", value: "termination_date" },
      { text: "Inactive", value: "inactive" },
      { text: "Actions", value: "actions", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      name: undefined,
      position_id: undefined,
      log_type: undefined,
      deployment_date: undefined,
      termination_date: undefined,
      inactive: false,
      original_name: undefined
    },

    positions: [],
    logTypes: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    logs() {
      return this.$store.getters.getLogs;
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
      "fetchLogs",
      "addLog",
      "editLog",
      "removeLog",
      "fetchPositions",
      "fetchOptionsList"
    ]),

    initialize() {
      this.getLogs();
      this.getOptionsLists();
    },

    getLogs() {
      this.fetchLogs().then(() => {
        this.loading = false;
      });
    },

    getOptionsLists() {
      this.fetchPositions().then(data => {
        this.positions = data;
      });
      this.fetchOptionsList("log-types").then(data => {
        this.logTypes = data;
      });
    },

    createItem() {
      this.editedItem = Object.assign({}, this.defaultItem);
    },

    editItem(item) {
      this.editedIndex = this.logs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.removeLog(item.id);
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
        this.editLog(this.editedItem);
      } else {
        this.addLog(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style></style>
