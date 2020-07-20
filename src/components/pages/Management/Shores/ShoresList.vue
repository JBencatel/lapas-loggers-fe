<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Shores</v-toolbar-title>

      <v-spacer />

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            New Item
          </v-btn>
        </template>
        <shore-edit-form
          :edited-item="editedItem"
          :form-title="formTitle"
          :countries="countries"
          :field-work-unitss="fieldWorkUnits"
          @close="close"
          @save="save"
        />
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="shores"
      :loading="loading"
      no-data-text="No shores have been created yet."
      class="elevation-1"
      @click:row="openItem"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click.stop="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click.stop="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import ShoreEditForm from "./ShoreEditForm";

export default {
  name: "ManageShoresList",

  components: { ShoreEditForm },

  data: () => ({
    dialog: false,
    loading: true,
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
        this.loading = false;
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

    openItem(item) {
      this.$router.push({ name: "Shore Details", params: { id: item.id } });
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
