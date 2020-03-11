<template>
  <v-flex>
    <Navbar />

    <v-flex class="d-flex flex-row flex-wrap mt-12 listTitle">
      <h2
        class="display-3 font-weight-black mt-5 pa-9 blue-grey--text text--lighten-5"
      >
        Lista de Recetas
      </h2>
    </v-flex>

    <v-flex class="pa-4 recipeList">
      <v-card
        class="v-card--raised ma-5 recipeCard"
        v-for="(recipe, i) in recipes"
        :key="i"
      >
        <v-list-item three-line>
          <v-list-item-content class="d-flex flex-colum">
            <v-list-item-title class="headline ma-2">{{
              recipe.name
            }}</v-list-item-title>
            <v-list-item-subtitle
              class="font-weight-light pl-3 ingridientSubtitle"
            >
              {{ recipe.description }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-btn color="warning" dark large class="readMore">
          <router-link
            :to="{ name: 'RecipeView', params: { recipe_id: recipe.id } }"
          >
            Ver
          </router-link>
        </v-btn>
      </v-card>
    </v-flex>
  </v-flex>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Recipes",

  components: { Navbar },

  computed: {
    recipes() {
      return this.$store.getters.allRecipes;
    }
  },

  created() {
    this.$store.dispatch("getRecipes");
  }
};
</script>

<style scoped>
.listTitle {
  background-image: url(https://source.unsplash.com/900x300/?food-kitchen-cooking);
  background-position: center;
  background-size: cover;
}
.listTitle > h2 {
  text-shadow: 0.2rem 0.2rem 0.25rem rgba(44, 44, 44, 0.5);
}
.recipeList {
  background-color: #fdfcf2 !important;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f44336' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: repeat;
  min-height: 80vh;
}
.recipeCard {
  height: fit-content;
  display: flex;
}
.readMore {
  align-self: center;
  margin-right: 1rem;
}
a,
a:visited {
  text-decoration: none;
  color: inherit;
}
</style>
