<template>
  <div class="mb-5">
    <v-row v-if="!optionSelected" align="center">
      <v-col cols="12" sm="5" class="text-right">
        <v-btn block @click="optionSelected = 'select'">
          <v-icon left>mdi-cursor-pointer</v-icon>
          Select a servicing...
        </v-btn>
      </v-col>
      <v-col cols="12" sm="2" class="text-center">or</v-col>
      <v-col cols="12" sm="5" class="text-left">
        <v-btn block @click="optionSelected = 'create'">
          <v-icon left>mdi-plus-circle</v-icon>
          Create a servicing...
        </v-btn>
      </v-col>
    </v-row>

    <v-card v-if="optionSelected" flat>
      <v-row>
        <v-col cols="1">
          <v-btn icon @click="returnToOptionSelection">
            <v-icon left>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="11">
          <v-card-title>
            {{ servicingSectionTtitle }}
          </v-card-title>
          <v-card-text v-if="optionSelected === 'select'">
            <v-autocomplete
              label="Servicing"
              v-model="servicingSelected"
              :items="servicings"
              :item-text="servicingName"
              return-object
              item-value="id"
              required
            />
          </v-card-text>
          <v-card-text v-if="optionSelected === 'create'">
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-menu
                  ref="datePicker"
                  v-model="datePicker"
                  :close-on-content-click="false"
                  :nudge-right="150"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="servicingSelected.date"
                      label="Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="servicingSelected.date"
                    no-title
                    scrollable
                    @input="datePicker = false"
                  />
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-autocomplete
                  label="Shore"
                  v-model="servicingSelected.shore_id"
                  :items="shores"
                  item-text="name"
                  item-value="id"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  label="Participants"
                  v-model="servicingSelected.participants"
                  :items="people"
                  item-text="name"
                  item-value="id"
                  :return-object="false"
                  clearable
                  multiple
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Notes"
                  v-model="servicingSelected.notes"
                  rows="1"
                  auto-grow
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "ManagementUploadFileServicingSelection",

  props: {
    servicings: { type: Array, required: true },
    shores: { type: Array, required: true },
    people: { type: Array, required: true }
  },

  data: () => ({
    optionSelected: undefined,

    servicingSelected: undefined,

    datePicker: false,
    requiredRules: [v => !!v || "Field is required"]
  }),

  computed: {
    servicingSectionTtitle() {
      if (this.optionSelected === "select") {
        return "Select a previously registered servicing...";
      } else if (this.optionSelected === "create") {
        return "Create a new servicing...";
      } else return "";
    }
  },

  watch: {
    servicingSelected(newValue) {
      this.$emit("selectServicing", newValue);
    },

    optionSelected(newValue) {
      if (newValue === "select") {
        this.servicingSelected = undefined;
      } else if (newValue === "create") {
        this.servicingSelected = {
          date: undefined,
          shore_id: undefined,
          participants: undefined,
          notes: undefined
        };
      }
    }
  },
  methods: {
    servicingName(servicingItem) {
      let shoreName = this.getShoreName(servicingItem.shore_id);
      return shoreName + " - " + servicingItem.date;
    },
    getShoreName(id) {
      let shore = this.shores.find(item => item.id === id);
      return shore.name;
    },

    returnToOptionSelection() {
      this.optionSelected = undefined;
      this.servicingSelected = undefined;
    }
  }
};
</script>

<style></style>
