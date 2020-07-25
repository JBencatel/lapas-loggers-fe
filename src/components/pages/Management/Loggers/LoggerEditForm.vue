<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Name"
              v-model="editedItem.name"
              type="text"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              label="Position"
              v-model="editedItem.position_id"
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
                  v-model="editedItem.logger_type_id"
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
                  v-model="editedItem.deployment_date"
                  label="Deployment Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="editedItem.deployment_date"
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
                  v-model="editedItem.termination_date"
                  label="Termination Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="editedItem.termination_date"
                no-title
                scrollable
                @input="terminationDatePicker = false"
              />
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-switch
              v-model="editedItem.inactive"
              :label="editedItem.inactive ? 'Inactive' : 'Active'"
              color="red darken-"
              :value="false"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Original Name"
              v-model="editedItem.original_name"
              type="text"
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
import { mapActions } from 'vuex';
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
    deploymentDatePicker: false,
    terminationDatePicker: false,
    requiredRules: [v => !!v || "Field is required"],

    addOptionPopUp: false,
    newOption: undefined,
    loading: false
  }),

  methods: {
    ...mapActions(["addOptionsListItem", "fetchOptionsList"]),

    addOption() {
      this.loading = true;
      let listName = "logger-types";
      this.addOptionsListItem({
        listName: listName,
        itemData: { name: this.newOption }
      }).then(() => {
        this.fetchOptionsList(listName).then(data => {
          this.$emit("updateOptionsList", data);
          this.addOptionPopUp = false;
          this.newOption = undefined;
          this.loading = false;
        });
      });
    }
  }
};
</script>

<style></style>
