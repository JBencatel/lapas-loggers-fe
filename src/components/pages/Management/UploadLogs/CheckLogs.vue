<template>
  <div class="mb-5">
    <v-card flat>
      <v-card-title>
        Check logs to upload...
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="preCheckLogs"
          class="elevation-1"
        >
          <template v-slot:item.serial_id="{ item }">
            <span v-if="!item.serial_id">No match found</span>
            <span v-else>
              {{ item.serial_id }}: {{ getLoggerName(item.serial_id) }}
            </span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon

              small
              class="mr-2"
              @click="changeLogger(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon  small @click="excludeLog(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="500px">
      <logger-form
        :original-logger-id="selectedLoggerId"
        :loggers="loggers"
        :positions="positions"
        :logger-types="loggerTypes"
        @updateOptionsList="getLoggerTypes"
        @close="close"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LoggerForm from "./LoggerSelectForm";

export default {
  name: "ManagementUploadLogsFinalCheck",

  components: { LoggerForm },

  props: {
    preCheckLogs: {
      type: Array,
      required: true
    },
    loggers: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    dialog: false,
    loading: true,
    headers: [
      { text: "Time Off-Sync", value: "off_sync" },
      { text: "File Name", value: "fileName" },
      { text: "Short Serial", value: "shortSerial" },
      { text: "Logger", value: "serial_id" },
      { text: "Actions", value: "actions", sortable: false }
    ],

    selectedLog: undefined,

    positions: [],
    loggerTypes: []
  }),

  computed: {
    selectedLoggerId() {
      if (this.selectedLog !== undefined) {
        return this.selectedLog.serial_id;
      } else return undefined;
    }
  },

  mounted() {
    this.initialize();
  },

  methods: {
    ...mapActions(["fetchPositions", "fetchOptionsList"]),

    initialize() {
      this.getOptionsLists();
    },

    getLoggerTypes() {
      this.fetchOptionsList("logger-types").then(data => {
        this.loggerTypes = data;
      });
    },

    getOptionsLists() {
      this.fetchPositions().then(data => {
        this.positions = data;
      });
      this.getLoggerTypes();
    },

    changeLogger(item) {
      this.selectedLog = item;
      this.dialog = true;
    },

    close(selectedLoggerId) {
      if (selectedLoggerId !== undefined) {
        this.selectedLog.serial_id = selectedLoggerId;
        if (
          this.loggers.findIndex(logger => logger.id === selectedLoggerId) ===
          -1
        ) {
          this.$emit("updateLoggersList");
        }
      }
      this.dialog = false;
    },

    excludeLog(log) {
      const index = this.preCheckLogs.indexOf(log);
      confirm(
        "Are you sure you want to exclude this log from the selection?"
      ) && this.preCheckLogs.splice(index, 1);
    },

    getLoggerName(loggerID) {
      let selectedLogger = this.loggers.find(logger => logger.id === loggerID);
      if (selectedLogger) {
        return selectedLogger.name;
      } else return "";
    }
  }
};
</script>

<style></style>
