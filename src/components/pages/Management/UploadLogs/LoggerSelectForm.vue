<template>
  <v-card>
    <v-expansion-panels v-model="panel" flat>
      <v-expansion-panel>
        <v-expansion-panel-header>
          Select an existing logger
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-autocomplete
            label="Logger"
            v-model="selectedLoggerID"
            :items="loggers"
            item-text="name"
            item-value="id"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          Create a new logger
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Name"
                    v-model="newLogger.name"
                    type="text"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-autocomplete
                    label="Position"
                    v-model="newLogger.position_id"
                    :items="positions"
                    item-text="code"
                    item-value="id"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-row no-gutters justify="space-between">
                    <v-col cols="10">
                      <v-autocomplete
                        label="Logger Type"
                        v-model="newLogger.logger_type_id"
                        :items="loggerTypes"
                        item-text="name"
                        item-value="id"
                        required
                      />
                    </v-col>
                    <v-col cols="1" align-self="center">
                      <v-menu
                        v-model="addOptionPopUp"
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-x
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn x-small icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-plus-circle</v-icon>
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-text class="pb-0">
                            <v-text-field
                              label="New Logger Type"
                              v-model="newOption"
                            />
                          </v-card-text>
                          <v-card-actions class="pt-0">
                            <v-btn
                              color="blue darken-1"
                              text
                              :loading="loading"
                              :disabled="loading"
                              @click="addOption"
                              >Add
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    ref="deploymentDatePicker"
                    v-model="deploymentDatePicker"
                    :close-on-content-click="false"
                    :nudge-right="150"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="newLogger.deployment_date"
                        label="Deployment Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="newLogger.deployment_date"
                      no-title
                      scrollable
                      @input="deploymentDatePicker = false"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    ref="terminationDatePicker"
                    v-model="terminationDatePicker"
                    :close-on-content-click="false"
                    :nudge-right="150"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="newLogger.termination_date"
                        label="Termination Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="newLogger.termination_date"
                      no-title
                      scrollable
                      @input="terminationDatePicker = false"
                    />
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-switch
                    v-model="newLogger.inactive"
                    :label="newLogger.inactive ? 'Inactive' : 'Active'"
                    color="red darken-"
                    :value="false"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Original Name"
                    v-model="newLogger.original_name"
                    type="text"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('close', undefined)">
        Cancel
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        :loading="saveLoading"
        :disabled="saveDisabled"
        @click="save"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ManagementUploadLogsLoggerForm",

  props: {
    originalLoggerId: {
      required: true
    },
    loggers: {
      type: Array,
      required: true
    },
    positions: {
      type: Array,
      required: true
    },
    loggerTypes: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    panel: 0,
    selectedLoggerID: undefined,

    newLogger: {
      name: undefined,
      position_id: undefined,
      logger_type_id: undefined,
      deployment_date: undefined,
      termination_date: undefined,
      inactive: false,
      original_name: undefined
    },

    deploymentDatePicker: false,
    terminationDatePicker: false,
    requiredRules: [v => !!v || "Field is required"],

    addOptionPopUp: false,
    newOption: undefined,
    loading: false,

    saveLoading: false
  }),

  computed: {
    saveDisabled() {
      return (
        (this.panel === 0 && this.selectedLoggerID === undefined) ||
        (this.panel === 1 &&
          (this.newLogger.name === undefined ||
            this.newLogger.position_id === undefined ||
            this.newLogger.logger_type_id === undefined))
      );
    }
  },

  watch: {
    originalLoggerId(newValue) {
      this.selectedLoggerID = newValue;
    }
  },

  mounted() {
    this.selectedLoggerID = this.originalLoggerId;
  },

  methods: {
    ...mapActions(["addLogger", "addOptionsListItem", "fetchOptionsList"]),

    addOption() {
      this.loading = true;
      let listName = "logger-types";
      this.addOptionsListItem({
        listName: listName,
        itemData: { name: this.newOption }
      }).then(() => {
        this.$emit("updateOptionsList");
        this.addOptionPopUp = false;
        this.newOption = undefined;
        this.loading = false;
      });
    },

    save() {
      if (this.panel === 0) {
        this.$emit("close", this.selectedLoggerID);
      } else if (this.panel === 1) {
        this.saveLoading = true;
        this.addLogger(this.newLogger).then(newLogger => {
          this.selectedLoggerID = newLogger.id;
          this.$emit("close", this.selectedLoggerID);
          this.saveLoading = false;
        });
      }
    },

    close(value) {
      this.$emit("close", value);
      this.newLogger = {
        name: undefined,
        position_id: undefined,
        logger_type_id: undefined,
        deployment_date: undefined,
        termination_date: undefined,
        inactive: false,
        original_name: undefined
      };
      this.selectedLoggerID = undefined;
    }
  }
};
</script>

<style></style>
