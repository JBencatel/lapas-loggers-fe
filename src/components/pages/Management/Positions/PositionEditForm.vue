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
              label="Code"
              :value="positionCode"
              type="text"
              required
              disabled
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Microhabitat"
              :value="microhabitat"
              type="text"
              required
              disabled
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              label="Shore"
              v-model="editedItem.shore_id"
              :items="shores"
              item-text="name"
              item-value="id"
              :rules="requiredRules"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              label="Level"
              v-model="editedItem.shore_level_id"
              :items="shoreLevels"
              item-text="name"
              item-value="id"
              :rules="requiredRules"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              label="Exposure"
              v-model="editedItem.shore_exposure_id"
              :items="shoreExposures"
              item-text="name"
              item-value="id"
              :rules="requiredRules"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Replicate"
              v-model="editedItem.shore_replicate"
              type="number"
              :rules="requiredRules"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Subreplicate"
              v-model="editedItem.shore_subreplicate"
              @change="capitalizeSubreplicate"
              type="text"
              counter
              maxlength="1"
              :rules="requiredRules"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Slope"
              v-model="editedItem.slope"
              type="number"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Orientation"
              v-model="editedItem.orientation"
              type="number"
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
              label="Previous ID"
              v-model="editedItem.old_number"
              type="number"
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
    shores: {
      type: Array,
      required: true
    },
    shoreLevels: {
      type: Array,
      required: true
    },
    shoreExposures: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    deploymentDatePicker: false,
    terminationDatePicker: false,
    requiredRules: [v => !!v || "Field is required"]
  }),

  computed: {
    positionCode() {
      let code = "";
      code += this.getShoreAttributeCode(this.editedItem.shore_id, this.shores);
      code += this.microhabitat;
      code += this.getReplicateValue(this.editedItem.shore_replicate);
      code += this.editedItem.shore_subreplicate
        ? this.editedItem.shore_subreplicate
        : "";
      return code;
    },

    microhabitat() {
      let code = "";
      code += this.getShoreAttributeCode(
        this.editedItem.shore_level_id,
        this.shoreLevels
      );
      code += this.getShoreAttributeCode(
        this.editedItem.shore_exposure_id,
        this.shoreExposures
      );
      return code;
    }
  },

  watch: {
    positionCode(newValue) {
      this.editedItem.code = newValue;
    },
    microhabitat(newValue) {
      this.editedItem.microhabitat = newValue;
    }
  },

  methods: {
    getShoreAttributeCode(attributeID, optionsList) {
      let attributeCode = "";
      if (attributeID !== undefined && optionsList.length > 0) {
        let attribute = optionsList.find(item => item.id === attributeID);
        if (attribute !== undefined) {
          attributeCode = attribute.code;
        }
      }
      return attributeCode;
    },

    getReplicateValue(replicate) {
      if (replicate) {
        if (replicate > 9) {
          return replicate.toString();
        } else {
          return "0" + replicate;
        }
      } else return "";
    },

    capitalizeSubreplicate(e) {
      this.editedItem.shore_subreplicate = e.toUpperCase();
    }
  }
};
</script>

<style></style>
