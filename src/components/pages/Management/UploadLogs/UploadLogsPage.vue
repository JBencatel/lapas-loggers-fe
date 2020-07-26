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
          <servicing-selection @selectServicing="selectedServicing = $event" />

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
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 1">
            Continue
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import ServicingSelection from "./ServicingSelection";
import FileSelection from "./FileSelection";
import { mapActions } from "vuex";
export default {
  name: "ManagementUploadLogs",

  components: { ServicingSelection, FileSelection },

  data: () => ({
    e1: 1,
    loadingNewServicing: false,
    selectedServicing: undefined,

    loadingFiles: false,
    selectedFiles: [],

    logs: []
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
    }
  },

  methods: {
    ...mapActions(["addServicing"]),

    servicingContinue() {
      if (this.selectedServicing.id) {
        this.e1 = 2;
      } else {
        this.loadingNewServicing = true;
        this.addServicing(this.selectedServicing).then(newServicing => {
          this.selectedServicing = newServicing;
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
          logger_id: undefined,
          off_sync: undefined,
          loggerLongSerial: undefined,
          loggerShortSerial: undefined
        };

        let fileContent = [];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          let result = reader.result;
          fileContent = result.split("\n");
          let longSerial = fileContent[0];
          log.loggerLongSerial = longSerial;
          log.loggerShortSerial = longSerial.substr(longSerial.length - 8);
          log.off_sync = fileContent[1];
          this.logs.push(log);
        };
      });
      this.loadingFiles = false;
      this.e1 = 3;
    }
  }
};
</script>

<style></style>
