<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-no-wrap">
      {{ title }}
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-data-table
        :headers="headers"
        :items="list"
        :items-per-page="5"
        calculate-widths
        dense
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>

      <v-toolbar v-if="editable" flat height="fit-content">
        <v-spacer />
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" small icon v-bind="attrs" v-on="on">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    v-for="field in fields"
                    :key="field.text"
                  >
                    <v-text-field
                      v-model="editedItem[field.value]"
                      :label="field.text"
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
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    listName: {
      type: String,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    list: [],
    dialog: false,
    editedIndex: -1,
    editedItem: {}
  }),

  computed: {
    headers() {
      let headers = [];
      this.fields.forEach(field => {
        headers.push(field);
      });
      if (this.editable) {
        headers.push({
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "1%"
        });
      }
      return headers;
    },
    defaultItem() {
      let defaultItem = {};
      this.fields.forEach(field => {
        defaultItem[field.value] = undefined;
      });
      return defaultItem;
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
      "fetchOptionsList",
      "addOptionsListItem",
      "editOptionsListItem",
      "removeOptionsListItem"
    ]),

    initialize() {
      this.getOptionsList();
      this.editedItem = Object.assign({}, this.defaultItem);
    },

    getOptionsList() {
      this.fetchOptionsList(this.listName).then(data => {
        this.list = data;
      });
    },

    editItem(item) {
      this.editedIndex = this.list.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.removeOptionsListItem({
          listName: this.listName,
          itemID: item.id
        }).then(() => {
          this.getOptionsList();
        });
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
        this.editOptionsListItem({
          listName: this.listName,
          itemData: this.editedItem
        }).then(() => {
          this.getOptionsList();
          this.close();
        });
      } else {
        this.addOptionsListItem({
          listName: this.listName,
          itemData: this.editedItem
        }).then(() => {
          this.getOptionsList();
          this.close();
        });
      }
    }
  }
};
</script>

<style></style>
