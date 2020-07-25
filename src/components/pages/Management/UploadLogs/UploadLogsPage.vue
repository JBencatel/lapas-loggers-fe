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
          Upload files
        </v-stepper-step>
        <v-divider />
        <v-stepper-step step="3">
          Confirm loggers
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <servicing-selection />

          <v-btn color="primary" @click="e1 = 2">
            Continue
          </v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 3">
            Continue
          </v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 1">
            Continue
          </v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import ServicingSelection from './ServicingSelection'
export default {
  name: "ManagementUploadLogs",

  components: {ServicingSelection},

  data: () => ({
    e1: 1
  })
};
</script>

<style></style>
