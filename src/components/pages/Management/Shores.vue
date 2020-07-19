<template>
  <div>
    <v-data-table :headers="headers" :items="shores" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Shores</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer />

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Shore name"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.code" label="Code" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-autocomplete
                        v-model="editedItem.country_id"
                        :items="countries"
                        item-text="name"
                        item-value="id"
                        label="Country"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-autocomplete
                        v-model="editedItem.fwunit_id"
                        label="Field Work Unit"
                        :items="fieldWorkUnits"
                        item-text="name"
                        item-value="id"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.latitude"
                        label="Latitude"
                        type="number"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.longitude"
                        label="Longitude"
                        type="number"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Code",
        align: "start",
        value: "code"
      },
      { text: "Name", value: "name" },
      { text: "Country", value: "country_id" },
      { text: "Field Work Unit", value: "fwunit_id" },
      { text: "Latitude", value: "latitude" },
      { text: "Longitude", value: "longitude" },
      { text: "Actions", value: "actions", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {
      code: "",
      name: "",
      country_id: undefined,
      fwunit_id: undefined,
      latitude: undefined,
      longitude: undefined
    },
    defaultItem: {
      code: "",
      name: "",
      country_id: undefined,
      fwunit_id: undefined,
      latitude: undefined,
      longitude: undefined
    },

    countries: [],
    fieldWorkUnits: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },

    shores() {
      return this.$store.getters.getShores;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions([
      "fetchShores",
      "fetchOptionsList",
      "addShore",
      "editShore",
      "removeShore"
    ]),

    initialize() {
      this.getShores();
      this.getOptionsLists();
    },

    getShores() {
      this.fetchShores().then(data => {
        this.shores = data;
      });
    },

    getOptionsLists() {
      this.fetchOptionsList("countries").then(data => {
        this.countries = data;
      });
      this.fetchOptionsList("field-work-units").then(data => {
        this.fieldWorkUnits = data;
      });
    },

    editItem(item) {
      this.editedIndex = this.shores.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.removeShore(item.id);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.editShore(this.editedItem);
      } else {
        this.addShore(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style></style>
