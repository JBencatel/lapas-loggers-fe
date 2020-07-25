<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
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
                  v-model="editedItem.date"
                  label="Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="editedItem.date"
                no-title
                scrollable
                @input="datePicker = false"
              />
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              label="Shore"
              v-model="editedItem.shore_id"
              :items="shores"
              item-text="name"
              item-value="id"
              required
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              label="Participants"
              v-model="editedItem.participants"
              :items="people"
              item-text="name"
              item-value="id"
              :return-object="false"
              multiple
              required
            />
          </v-col>
          <v-col cols="12">
            <v-textarea label="Notes" v-model="editedItem.notes" />
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
    people: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    datePicker: false,
    requiredRules: [v => !!v || "Field is required"]
  })
};
</script>

<style></style>
