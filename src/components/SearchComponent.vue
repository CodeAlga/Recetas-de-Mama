<template>
  <div class="searchBox d-flex flex-column mt-2">
    <v-text-field
      dense
      clearable
      @click:clear="reset"
      label="Buscar"
      append-outer-icon="mdi-magnify"
      class="align-self-end searchBox"
      v-model="query"
      @blur="searchResultsVisible = false"
      @focus="searchResultsVisible = true"
      @keyup="performSearch"
      @keydown.enter="deepSearch"
    />
    <div v-if="query">
      <v-card class="mx-auto searchResults" light max-width="400">
        <v-card-title>
          <span class="title font-weight-light"
            >Resultados con <strong>{{ query }}</strong></span
          >
        </v-card-title>
        <v-card-list v-for="(result, i) in searchResults" :key="i">
          <router-link
            :to="{
              name: 'RecipeView',
              params: {
                recipe_slug: result.item.slug,
                recipe_id: result.item.id
              }
            }"
          >
            <v-list-item-content class="d-flex ">
              <v-list-item-title
                class="title black--text pl-8"
                @mousedown.prevent="searchResultsVisible = true"
              >
                {{ result.item.name }}</v-list-item-title
              >
              <v-list-item-subtitle
                tow-line
                style="max-width: 300px;"
                class="text-truncate font-weight-light black--text pl-5"
                >{{ result.item.description }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </router-link>

          <v-divider />
        </v-card-list>
        <v-card-actions class="justify-center">
          <v-btn color="warning">
            Busca mas resultados con "<strong>{{ query }}</strong
            >"
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchComponent",

  data() {
    return {
      recipes: [],
      query: "",
      searchResultsVisible: false,
      searchResults: [],

      // ----- VUE FUSE OPTIONS FOR THE SEARCH
      options: {
        shouldSort: true,
        includeMatches: true,
        threshold: 0.5,
        location: 0,
        distance: 500,
        maxPatternLength: 2,
        minMatchCharLength: 1,
        keys: ["name", "description"]
      }
    };
  },
  created() {
    this.recipes = this.$store.getters.allRecipes;
  },
  methods: {
    reset() {
      this.query = "";
      this.highlightedIndex = 0;
    },
    performSearch() {
      this.$search(this.query, this.recipes, this.options).then((results) => {
        this.searchResults = results;
      });
      console.log(this.searchResults);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.searchBox {
  min-width: 50vw;
  position: relative;
}
.searchResults {
  min-width: 50vw;
  position: absolute;
  max-height: 75vh;
  overflow: scroll;
}
</style>
