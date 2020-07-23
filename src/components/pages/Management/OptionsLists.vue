<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Options Lists</v-toolbar-title>
    </v-toolbar>
    <v-expansion-panels focusable>
      <options-list-table
        v-for="list in optionsLists"
        :key="list.title"
        :title="list.title"
        :list-name="list.listName"
        :fields="list.fields"
        :editable="list.editable"
      />
    </v-expansion-panels>
  </v-container>
</template>

<script>
import OptionsListTable from "../../organisms/OptionsListTable";

export default {
  name: "OptionsLists",

  components: { OptionsListTable },

  computed: {
    optionsLists() {
      let optionsLists = [
        {
          title: "Field Work Units",
          listName: "field-work-units",
          fields: [{ text: "Name", value: "name" }],
          editable: true
        },
        {
          title: "Logger Types",
          listName: "logger-types",
          fields: [{ text: "Name", value: "name"}],
          editable: true
        },
        {
          title: "Levels",
          listName: "shore-levels",
          fields: [
            { text: "Code", value: "code" },
            { text: "Name", value: "name" }
          ],
          editable: false
        },
        {
          title: "Exposures",
          listName: "shore-exposures",
          fields: [
            { text: "Code", value: "code" },
            { text: "Name", value: "name" }
          ],
          editable: false
        },
        {
          title: "Countries",
          listName: "countries",
          fields: [
            { text: "Code", value: "code" },
            { text: "Name", value: "name" }
          ],
          editable: false
        }
      ];
      return optionsLists;
    }
  }
};
</script>

<style></style>
