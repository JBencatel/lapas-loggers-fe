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
          :loggers="loggers"
          :servicings="servicings"
          :shores="shores"
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
        <v-icon
          v-if="item.log_file"
          small
          class="mr-2"
          @click.stop="downloadFile(item)"
        >
          mdi-file-download
        </v-icon>
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
import FileSaver from "file-saver";
import LogEditForm from "./LogEditForm";
import LogService from "@/services/LogService.js";

export default {
  name: "ManageLogsList",

  components: { LogEditForm },

  data: () => ({
    dialog: false,
    loading: true,
    headers: [
      { text: "Logger", align: "start", value: "serial_id" },
      { text: "Servicing", value: "servicing_id" },
      { text: "Time Off-Sync", value: "off_sync" },
      { text: "File", value: "log_file" },
      { text: "Actions", value: "actions", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      serial_id: undefined,
      servicing_id: undefined,
      log_file: undefined,
      off_sync: undefined
    },

    loggers: [],
    servicings: [],
    shores: []
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
      "editLog",
      "removeLog",
      "fetchLoggers",
      "fetchServicings",
      "fetchShores"
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
      this.fetchLoggers().then(data => {
        this.loggers = data;
      });
      this.fetchServicings().then(data => {
        this.servicings = data;
      });
      this.fetchShores().then(data => {
        this.shores = data;
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
      const data = new FormData();
      Object.keys(this.editedItem).forEach(key => {
        data.append(key, this.editedItem[key]);
      });
      this.editLog(data);
      this.close();
    },

    downloadFile(log) {
      LogService.downloadLogFile(log.id, fileContent => {
        let file = new Blob([fileContent], {
          type: "text/plain;charset=utf-8"
        });
        FileSaver.saveAs(file, log.log_file);
      });
    }
  }
};
</script>

<style></style>
