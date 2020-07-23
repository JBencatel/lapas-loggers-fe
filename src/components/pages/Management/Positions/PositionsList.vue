<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Positions</v-toolbar-title>

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
        <position-edit-form
          :edited-item="editedItem"
          :form-title="formTitle"
          :shores="shores"
          :shore-levels="shoreLevels"
          :shore-exposures="shoreExposures"
          @close="close"
          @save="save"
        />
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="positions"
      :loading="loading"
      no-data-text="No positions have been created yet."
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
import PositionEditForm from "./PositionEditForm";

export default {
  name: "ManagePositionsList",

  components: { PositionEditForm },

  data: () => ({
    dialog: false,
    loading: true,
    headers: [
      {
        text: "Code",
        align: "start",
        value: "code"
      },
      { text: "Slope", value: "slope" },
      { text: "Orientation", value: "orientation" },
      { text: "Deployment Date", value: "deployment_date" },
      { text: "Termination Date", value: "termination_date" },
      { text: "Inactive", value: "inactive" },
      { text: "Actions", value: "actions", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      code: undefined,
      slope: undefined,
      orientation: undefined,
      shore_id: undefined,
      shore_level_id: undefined,
      shore_exposure_id: undefined,
      shore_replicate: undefined,
      shore_subreplicate: undefined,
      microhabitat: undefined,
      deployment_date: undefined,
      termination_date: undefined,
      inactive: false,
      old_number: undefined
    },

    shores: [],
    shoreLevels: [],
    shoreExposures: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    positions() {
      return this.$store.getters.getPositions;
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
      "fetchPositions",
      "addPosition",
      "editPosition",
      "removePosition",
      "fetchShores",
      "fetchOptionsList"
    ]),

    initialize() {
      this.getPositions();
      this.getOptionsLists();
    },

    getPositions() {
      this.fetchPositions().then(() => {
        this.loading = false;
      });
    },

    getOptionsLists() {
      this.fetchShores().then(data => {
        this.shores = data;
      });
      this.fetchOptionsList("shore-levels").then(data => {
        this.shoreLevels = data;
      });
      this.fetchOptionsList("shore-exposures").then(data => {
        this.shoreExposures = data;
      });
    },

    openItem(item) {
      this.$router.push({ name: "Position Details", params: { id: item.id } });
    },

    createItem() {
      this.editedItem = Object.assign({}, this.defaultItem);
    },

    editItem(item) {
      this.editedIndex = this.positions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.removePosition(item.id);
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
        this.editPosition(this.editedItem);
      } else {
        this.addPosition(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style></style>
