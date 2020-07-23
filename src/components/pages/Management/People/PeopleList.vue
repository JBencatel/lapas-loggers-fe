<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>People</v-toolbar-title>

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
        <person-edit-form
          :edited-item="editedItem"
          :form-title="formTitle"
          @close="close"
          @save="save"
        />
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="people"
      :loading="loading"
      no-data-text="No people have been created yet."
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
import PersonEditForm from "./PersonEditForm";

export default {
  name: "ManagePeopleList",

  components: { PersonEditForm },

  data: () => ({
    dialog: false,
    loading: true,
    headers: [
      { text: "Name", align: "start", value: "name" },
      { text: "Nickname", value: "nickname" },
      { text: "Actions", value: "actions", sortable: false }
    ],

    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      name: undefined,
      nickname: undefined
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    people() {
      return this.$store.getters.getPeople;
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
    ...mapActions(["fetchPeople", "addPerson", "editPerson", "removePerson"]),

    initialize() {
      this.getPeople();
    },

    getPeople() {
      this.fetchPeople().then(() => {
        this.loading = false;
      });
    },

    createItem() {
      this.editedItem = Object.assign({}, this.defaultItem);
    },

    editItem(item) {
      this.editedIndex = this.people.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.removePerson(item.id);
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
        this.editPerson(this.editedItem);
      } else {
        this.addPerson(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style></style>
