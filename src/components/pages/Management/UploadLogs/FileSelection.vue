<template>
  <div class="mb-5">
    <v-card flat>
      <v-card-title>
        Upload the log files of the selected servicing...
      </v-card-title>
      <v-card-text>
        <v-file-input
          label="Log file"
          accept=".txt"
          multiple
          chips
          counter
          clearable
          show-size
          @change="handleFileUpload"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ManagementUploadFileSelection",

  data: () => ({
    logFiles: []
  }),

  watch: {
    logFiles(newValue) {
      this.$emit("updateSelectedFiles", newValue);
    }
  },

  methods: {
    handleFileUpload(files) {
      this.logFiles = files;
    }
  }
};
</script>

<style></style>
