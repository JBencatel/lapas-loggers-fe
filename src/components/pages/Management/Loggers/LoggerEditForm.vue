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
              :value="editedItem.name"
              type="text"
              :rules="requiredRules"
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
              :rules="requiredRules"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              label="Logger Type"
              v-model="editedItem.logger_type_id"
              :items="loggerTypes"
              item-text="name"
              item-value="id"
              :rules="requiredRules"
              required
            />
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
              :value="editedItem.original_name"
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
    requiredRules: [v => !!v || "Field is required"]
  })
};
</script>

<style></style>
