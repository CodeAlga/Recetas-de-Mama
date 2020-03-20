<template>
  <v-app-bar
    fixed
    color="teal lighten-3"
    dark
    height="65px"
    width="100vw"
    class="d-flex flex-column justify-space-around"
  >
    <v-toolbar-title class="d-none d-sm-flex"
      >Las Recetas de Mamá</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <!-- <v-text-field
      relative
      dense
      clearable
      label="Buscar"
      append-outer-icon="mdi-magnify"
      class="align-self-end searchBox"
    >
      <template>
        <v-list-item>
          <v-list-item-content v-for="(item, i) in items" :key="i">
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle
              >Presiona <kbd>enter</kbd> o <kbd>tab</kbd> para crear uno
              nuevo</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-text-field> -->
    <SearchComponent />
  </v-app-bar>
</template>

<script>
import SearchComponent from "./SearchComponent";
export default {
  name: "Navbar",

  components: { SearchComponent },

  data() {
    return {
      searchTerm: null
    };
  },

  computed: {
    recipes() {
      return this.$store.getters.allRecipes;
    },

    searchResult() {
      return this.recipes.filter((recipe) => {
        console.log(recipe.name.match(this.searchTerm));

        return recipe.name.match(this.searchTerm);
      });
    }
  }
};
</script>

<style scoped>
.searchBox {
  max-width: 40vw;
}
</style>
