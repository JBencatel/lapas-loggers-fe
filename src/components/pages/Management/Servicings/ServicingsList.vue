<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Servicings</v-toolbar-title>

      <v-spacer />

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
            @click="createItem"
          >
            New Item
          </v-btn>
        </template>
        <servicing-edit-form
          :edited-item="editedItem"
          :form-title="formTitle"
          :shores="shores"
          @close="close"
          @save="save"
        />
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="servicings"
      :loading="loading"
      no-data-text="No servicings have been created yet."
      class="elevation-1"
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
import ServicingEditForm from "./ServicingEditForm";

export default {
  name: "ManageServicingsList",

  components: { ServicingEditForm },

  data: () => ({
    dialog: false,
    loading: true,
    headers: [
      { text: "Date", align: "start", value: "date" },
      { text: "Shore", value: "shore_id" },
      { text: "Actions", value: "actions", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      date: undefined,
      shore_id: undefined,
      notes: undefined
    },

    shores: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    servicings() {
      return this.$store.getters.getServicings;
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
      "fetchServicings",
      "addServicing",
      "editServicing",
      "removeServicing",
      "fetchShores"
    ]),

    initialize() {
      this.getServicings();
      this.getOptionsLists();
    },

    getServicings() {
      this.fetchServicings().then(() => {
        this.loading = false;
      });
    },

    getOptionsLists() {
      this.fetchShores().then(data => {
        this.shores = data;
      });
    },

    createItem() {
      this.editedItem = Object.assign({}, this.defaultItem);
    },

    editItem(item) {
      this.editedIndex = this.servicings.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.removeServicing(item.id);
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
        this.editServicing(this.editedItem);
      } else {
        this.addServicing(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style></style>
