<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card max-width="375" class="mx-auto">
          <v-img
            src="https://images.unsplash.com/photo-1585002459222-8408cdc5f4ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
            height="150px"
            dark
          >
            <v-container>
              <v-row>
                <v-card-title>
                  <v-btn dark icon small @click="returnToShoresList">
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>

                  <v-btn dark icon small class="mx-2">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <v-btn dark icon small class="mx-2">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-card-title>
              </v-row>
              <v-row>
                <v-card-title class="white--text text-h5 font-weight-bold">
                  {{ shore.name }}
                </v-card-title>
              </v-row>
            </v-container>
          </v-img>

          <v-list two-line>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">mdi-barcode</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ shore.code }}</v-list-item-title>
                <v-list-item-subtitle>Code</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">mdi-flag</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ countryName }}</v-list-item-title>
                <v-list-item-subtitle>Country</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">mdi-tag</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ fieldWorkUnitName }}</v-list-item-title>
                <v-list-item-subtitle>Field Work Unit</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">mdi-crosshairs-gps</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  >{{ shore.latitude }},
                  {{ shore.longitude }}</v-list-item-title
                >
                <v-list-item-subtitle>Coordinates</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="8"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ManagementShoreDtails",

  data: () => ({
    loading: true,
    shore: {},

    countries: [],
    fieldWorkUnits: []
  }),

  computed: {
    countryName() {
      let countryName = "";
      if (this.shore && this.shore.country_id && this.countries.length > 0) {
        let country = this.countries.find(
          item => item.id === this.shore.country_id
        );
        countryName = country.name;
      }
      return countryName;
    },

    fieldWorkUnitName() {
      let fieldWorkUnitName = "";
      if (
        this.shore &&
        this.shore.fwunit_id &&
        this.fieldWorkUnits.length > 0
      ) {
        let fieldWorkUnit = this.fieldWorkUnits.find(
          item => item.id === this.shore.fwunit_id
        );
        fieldWorkUnitName = fieldWorkUnit.name;
      }
      return fieldWorkUnitName;
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions(["fetchShore", "fetchOptionsList"]),

    initialize() {
      this.getShore();
      this.getOptionsLists();
    },

    getShore() {
      this.fetchShore(this.$route.params.id).then(shore => {
        this.shore = Object.assign({}, shore);
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

    returnToShoresList() {
      this.$router.push({ name: "Shores List" });
    }
  }
};
</script>

<style></style>
