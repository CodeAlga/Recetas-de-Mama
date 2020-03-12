<template>
  <v-container class="pa-0 recipesList">
    <Navbar />

    <div class="d-flex flex-row flex-wrap mt-12 listTitle">
      <h2
        class="display-3 font-weight-black mt-5 pa-9 blue-grey--text text--lighten-5"
      >
        Lista de Recetas
      </h2>
    </div>

    <v-row class="ma-0 d-flex">
      <v-col cols="4" class="pa-0">
        <v-sheet
          class="pa-8 yellow lighten-4 shaped sideBar d-flex flex-column"
        >
          <div class="my-2">
            <v-btn color="warning" block dark @click="$router.go(-1)"
              >Go Back</v-btn
            >
          </div>

          <v-divider class="my-5 ingridientDivider"></v-divider>
          <h5 class="display-1  text-center">Filtros</h5>
          <v-divider class="my-5 ingridientDivider"></v-divider>
          <div>
            <v-list-item>
              <v-list-item-content class="d-flex flex-column">
                <v-list-item-title class="font-weight-medium align-start"
                  >Cubiertos</v-list-item-title
                >
                <v-list-item-subtitle class="font-weight-light pl-1 ">
                  Something</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="d-flex flex-column">
                <v-list-item-title class="font-weight-medium"
                  >Dificultad</v-list-item-title
                >
                <v-list-item-subtitle class="font-weight-light pl-1">
                  Something</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="d-flex flex-column">
                <v-list-item-title
                  class="font-weight-medium text-center ingridientTitle"
                  >Tiempo de preparación</v-list-item-title
                >
                <v-list-item-subtitle class="font-weight-light pl-1">
                  Something</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="d-flex flex-column">
                <v-list-item-title class="font-weight-medium ingridientTitle"
                  >Etiquetas</v-list-item-title
                >
                <v-chip-group column active-class="primary--text">
                  <v-chip
                    class="font-weight-light pl-1 d-flex flex-row flex-wrap"
                  >
                    Something
                  </v-chip>
                </v-chip-group>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-sheet>
      </v-col>
      <v-col class="pa-0">
        <div class="pa-4 d-flex flex-column justify-space-between recipeList">
          <div>
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
                  :to="{
                    name: 'RecipeView',
                    params: { recipe_slug: recipe.slug, recipe_id: recipe.id }
                  }"
                >
                  Ver
                </router-link>
              </v-btn>
            </v-card>
          </div>
          <!-- <div class="flex-grow-0">
        <v-pagination
          class="align-content-end"
          v-model="page"
          :length="15"
          :total-visible="7"
          circle
        ></v-pagination>
      </div> -->
        </div>
      </v-col>
    </v-row>
    <Footer />
  </v-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Recipes",

  components: { Navbar, Footer },

  data() {
    return {
      page: 1
    };
  },

  computed: {
    recipes() {
      return this.$store.getters.allRecipes;
    }
  },

  created() {
    this.$store.dispatch("clearStore");
    this.$store.dispatch("getRecipes");
  }
};
</script>

<style scoped>
.recipesList {
  height: 100%;
}
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
  min-height: 77vh;
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
.sideBar {
  min-height: 100%;
}
</style>
