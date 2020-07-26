<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Upload Logs</v-toolbar-title>
    </v-toolbar>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Select a servicing
        </v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="e1 > 2" step="2">
          Select files
        </v-stepper-step>
        <v-divider />
        <v-stepper-step step="3">
          Confirm loggers and upload data
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <servicing-selection
            :servicings="servicings"
            :shores="shores"
            :people="people"
            @selectServicing="selectedServicing = $event"
          />

          <v-btn
            color="primary"
            :disabled="servicingContinueDisabled"
            :loading="loadingNewServicing"
            @click="servicingContinue"
          >
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <file-selection @updateSelectedFiles="selectedFiles = $event" />

          <v-btn
            color="primary"
            :disabled="fileSelectionContinueDisabled"
            :loading="loadingFiles"
            @click="fileSelectionContinue"
          >
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <check-logs
            :pre-check-logs="newLogs"
            :loggers="loggers"
            @updateLoggersList="getLoggers"
          />

          <v-btn
            color="primary"
            :disabled="uploadDisabled"
            @click="uploadAndRestart"
          >
            Upload
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import ServicingSelection from "./ServicingSelection";
import FileSelection from "./FileSelection";
import CheckLogs from "./CheckLogs";

export default {
  name: "ManagementUploadLogs",

  components: { ServicingSelection, FileSelection, CheckLogs },

  data: () => ({
    e1: 1,
    loadingNewServicing: false,
    selectedServicing: undefined,
    selectedShore: undefined,

    loadingFiles: false,
    selectedFiles: [],

    newLogs: [],

    servicings: [],
    shores: [],
    people: [],
    loggers: [],

    uploadStarted: false
  }),

  computed: {
    servicingContinueDisabled() {
      return !(
        this.selectedServicing &&
        (this.selectedServicing.id ||
          (this.selectedServicing.date && this.selectedServicing.shore_id))
      );
    },

    fileSelectionContinueDisabled() {
      return this.selectedFiles.length === 0;
    },

    uploadDisabled() {
      if (this.uploadStarted) {
        return true;
      }
      for (let log of this.newLogs) {
        if (log.serial_id === undefined) {
          return true;
        }
      }
      return false;
    }
  },

  mounted() {
    this.initialize();
  },

  methods: {
    ...mapActions([
      "fetchServicings",
      "fetchShores",
      "fetchPeople",
      "addServicing",
      "fetchLoggers",
      "editLog"
    ]),

    initialize() {
      this.getOptionsLists();
    },

    getLoggers() {
      this.fetchLoggers().then(data => {
        this.loggers = data;
      });
    },

    getOptionsLists() {
      this.fetchServicings().then(data => {
        this.servicings = data;
      });
      this.fetchShores().then(data => {
        this.shores = data;
      });
      this.fetchPeople().then(data => {
        this.people = data;
      });
      this.getLoggers();
    },

    servicingContinue() {
      if (this.selectedServicing.id) {
        this.e1 = 2;
      } else {
        this.loadingNewServicing = true;
        this.addServicing(this.selectedServicing).then(newServicing => {
          this.selectedServicing = newServicing;
          this.selectedShore = this.shores.find(
            shore => shore.id === this.selectedServicing.shore_id
          );
          this.loadingNewServicing = false;
          this.e1 = 2;
        });
      }
    },

    fileSelectionContinue() {
      this.loadingFiles = true;
      this.selectedFiles.forEach(file => {
        let log = {
          servicing_id: this.selectedServicing.id,
          log_file: file,
          off_sync: undefined,
          serial_id: undefined,

          fileName: file.name,
          shortSerial: undefined
        };

        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          let result = reader.result;
          this.getFileData(log, result);
          log.serial_id = this.getLoggerID(log.shortSerial);
          this.newLogs.push(log);
        };
      });
      this.loadingFiles = false;
      this.e1 = 3;
    },

    getFileData(log, result) {
      let fileContent = result.split("\n");
      log.off_sync = fileContent[1];
      let longSerial = fileContent[0];
      log.shortSerial = longSerial.substr(longSerial.length - 8);
    },

    getLoggerID(shortSerial) {
      let selectedLogger = this.loggers.find(
        logger => logger.name === shortSerial
      );
      if (selectedLogger) {
        return selectedLogger.id;
      } else return undefined;
    },

    uploadAndRestart() {
      this.uploadStarted = true;
      this.newLogs.forEach(log => {
        const data = new FormData();
        Object.keys(log).forEach(key => {
          data.append(key, log[key]);
        });
        this.editLog(data)
          .then(() => {
            log.state = "success";
          })
          .catch(() => {
            log.state = "fail";
          });
      });
    }
  }
};
</script>

<style></style>
