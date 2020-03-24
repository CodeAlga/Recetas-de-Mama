<template>
  <v-flex class="no-gutters pa-0 recipesList">
    <Navbar />

    <div class="d-flex flex-row flex-wrap mt-12 listTitle">
      <h2
        class="display-3 font-weight-black mt-5 pa-9 blue-grey--text text--lighten-5"
      >
        Lista de Recetas
      </h2>
    </div>

    <v-row class="ma-0 d-flex">
      <v-col sm="4" xs="12" class="pa-0">
        <v-sheet
          class="pa-4 yellow lighten-4 shaped sideBar d-flex flex-column"
        >
          <div class="my-2">
            <v-btn color="warning" block dark @click="$router.go(-1)"
              ><router-link to="/" exact class="white--text"
                >Go Home</router-link
              ></v-btn
            >
          </div>

          <v-divider class="my-5 ingridientDivider"></v-divider>
          <h5 class="display-1  text-center">Filtros</h5>

          <div>
            <!-- <v-list-item>
              <v-list-item-content class="d-flex flex-column">
                <v-list-item-title class="font-weight-medium align-start"
                  >Cubiertos</v-list-item-title
                >
                <v-list-item-subtitle class="font-weight-light pl-1 ">
                  Something</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item> -->

            <v-list-item>
              <v-list-item-content class="d-flex flex-column">
                <v-list-item-title
                  class="font-weight-medium text-center ingridientTitle"
                  >Tipo de receta</v-list-item-title
                >
                <v-list-item-subtitle class="font-weight-light pl-1">
                </v-list-item-subtitle>
                <v-select
                  color="warning"
                  background-color="grey lighten-5"
                  item-color="warning"
                  :items="types"
                  value="Todas"
                  v-model="type"
                  @change="performSearch"
                  solo
                  hide-details
                ></v-select>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="pa-0">
              <v-list-item-content class="d-flex flex-column">
                <v-list-item-title class="font-weight-medium ingridientTitle"
                  >Etiquetas</v-list-item-title
                >
                <v-chip-group
                  active-class="cyan--text text--darken-4"
                  column
                  v-model="activeTag"
                  @change="performSearch"
                >
                  <v-chip v-for="tag in tagCloud" :key="tag" :value="tag">
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div class="my-2">
            <v-btn
              color="warning"
              block
              dark
              @click="clearFilters"
              class="white--text"
              >Restablecer</v-btn
            >
          </div>
          <v-divider class="my-5 ingridientDivider"></v-divider>
        </v-sheet>
      </v-col>
      <v-col class="pa-0">
        <div class="pa-4 d-flex flex-column justify-space-between recipeList">
          <div>
            <div>
              <v-snackbar
                class="snackBar"
                color="teal lighten-2"
                v-model="snackbar"
                :timeout="timeout"
              >
                <div>
                  <div>
                    {{ alert }}
                    <v-btn color="white" text @click="snackbar = false">
                      Close
                    </v-btn>
                  </div>
                  <v-progress-linear
                    v-model="loadingValue"
                    rounded
                    :active="snackbar"
                    color="orange accent-4"
                    class=""
                  ></v-progress-linear>
                </div>
              </v-snackbar>
            </div>
            <v-card
              transition="slide-y-reverse-transition"
              class="v-card--raised ma-5 d-flex flex-column flex-sm-row recipeCard"
              v-for="(recipe, i) in visibleRecipes"
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
              <v-btn color="warning" large dark class="mb-2 readMore">
                <router-link
                  :to="{
                    name: 'RecipeView',
                    params: { recipe_slug: recipe.slug, recipe_id: recipe.id }
                  }"
                  class="white--text"
                >
                  Ver
                </router-link>
              </v-btn>
            </v-card>
          </div>
          <div class="flex-grow-0 mb-6">
            <v-pagination
              class="align-content-end"
              v-if="totalPages > 1"
              v-model="page"
              :length="totalPages"
              :total-visible="5"
              circle
            ></v-pagination>
          </div>
        </div>
      </v-col>
    </v-row>
    <Footer />
  </v-flex>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Recipes",

  components: { Navbar, Footer },

  data() {
    return {
      recipes: null,
      tagCloud: null,
      searchResults: null,
      types: ["Todas", "Aperitivo", "Comida", "Postre"],
      type: "Todas",
      activeTag: "",

      snackbar: false,
      alert: "No hay recetas con esos criterios",
      timeout: 5000,
      loadingValue: 0,
      interval: {},

      page: 1,
      pageSize: 5,
      //totalPages: 0,
      //visibleRecipes: [],

      tagOptions: {
        shouldSort: true,
        includeMatches: true,
        threshold: 0.5,
        location: 0,
        distance: 500,
        maxPatternLength: 2,
        minMatchCharLength: 1,
        keys: ["tags"]
      },
      typeOptions: {
        shouldSort: true,
        includeMatches: true,
        threshold: 0.5,
        location: 0,
        distance: 500,
        maxPatternLength: 2,
        minMatchCharLength: 1,
        keys: ["type"]
      },
      bothOptions: {
        shouldSort: true,
        includeMatches: true,
        threshold: 0.5,
        location: 0,
        distance: 500,
        maxPatternLength: 2,
        minMatchCharLength: 1,
        keys: ["type", "tags"]
      }
    };
  },

  methods: {
    init() {
      this.recipes = this.$store.getters.allRecipes;
      this.searchResults = this.recipes;
    },

    startBuffer() {
      this.loadingValue = 0;

      this.interval = setInterval(() => {
        this.loadingValue += 2.2;
      }, 100);
    },

    clearFilters() {
      (this.activeTag = null), (this.type = "Todas");
      this.searchResults = this.recipes;
    },

    performSearch() {
      let localArray = [];

      if (this.searchResults.length >= 1) {
        if (this.activeTag && this.type === "Todas") {
          this.$search(this.activeTag, this.recipes, this.tagOptions).then(
            (results) => {
              for (let i = 0, len = results.length; i < len; i++) {
                localArray.push(results[i].item);
              }
              if (localArray.length === 0) {
                localArray = this.recipes;
                this.snackbar = true;
              }

              this.searchResults = localArray;
            }
          );
          console.log("newTag");
          console.log(localArray);
        } else if (!this.activeTag && this.type !== "Todas") {
          this.$search(this.type, this.recipes, this.typeOptions).then(
            (results) => {
              for (let i = 0, len = results.length; i < len; i++) {
                localArray.push(results[i].item);
              }

              if (localArray.length === 0) {
                localArray = this.recipes;
                this.snackbar = true;
              }

              this.searchResults = localArray;
            }
          );
          console.log("type");
          console.log(localArray);
        } else if (this.activeTag && this.type !== "Todas") {
          this.$search(
            this.type && this.activeTag,
            this.searchResults,
            this.bothOptions
          ).then((results) => {
            for (let i = 0, len = results.length; i < len; i++) {
              localArray.push(results[i].item);
            }

            if (localArray.length === 0) {
              localArray = this.recipes;
              this.snackbar = true;
            }

            this.searchResults = localArray;
          });
          console.log("todas");
          console.log(localArray);
        } else if (!this.activeTag && this.type === "Todas") {
          console.log("nada");
          console.log(localArray);
          localArray = this.recipes;
        }
      } else if (this.searchResults.length == 0) {
        console.log("hit 0");
        console.log(localArray);

        localArray = this.recipes;
        this.snackbar = true;
      } else {
        localArray = this.recipes;
      }
      this.searchResults = localArray;
    }
  },

  computed: {
    getTags() {
      let string = [];
      this.$store.getters.allRecipes.forEach((recipe) => {
        const filter = recipe.tags.forEach((tag) => {
          if (!string.includes(tag) && string.length < 20) {
            string.push(tag);
          }
        });
        return filter;
      });

      let frequentTag = {};
      for (var i = 0; i < string.length; i++) {
        let word = string[i];
        if (frequentTag[word]) {
          frequentTag[word]++;
        } else {
          frequentTag[word] = 1;
        }
      }

      let orderArray = Object.entries(frequentTag);

      let orderResult = orderArray
        .sort((a, b) => b[1] - a[1])
        .map((arr) => arr[0]);

      return orderResult;
    },

    visibleRecipes() {
      let localArray;
      if (this.page === 1) {
        localArray = this.searchResults.slice(0, this.pageSize);
      } else {
        localArray = this.searchResults.slice(
          this.pageSize * (this.page - 1),
          this.pageSize * (this.page - 1) + this.pageSize
        );
      }

      return localArray;
    },

    totalPages() {
      let len = Object.keys(this.searchResults).length;

      if (len == 0 && this.page > 0) {
        return Math.ceil(len / this.pageSize) - 1;
      } else {
        return Math.ceil(len / this.pageSize);
      }
    }
  },

  watch: {
    getTags: {
      handler: function(orderResult) {
        this.tagCloud = orderResult;
      }
    },

    snackbar() {
      if (this.snackbar) {
        this.startBuffer();
      }

      if (this.snackbar == false) {
        clearInterval(this.interval);
      }
    }
  },

  created() {
    this.$store.dispatch("clearStore");
    this.$store.dispatch("getRecipes").then(this.init());
  }

  // performSearchWithTag() {
  //     // return tag
  //     //   ? this.$search(tag, this.recipes, this.options).then((results) => {
  //     //       return results;
  //     //     })
  //     //   : this.recipes;

  //     let localArray = [];

  //     if (this.searchResults.length > 1) {
  //       if (this.activeTag) {
  //         this.$search(this.activeTag, this.recipes, this.tagOptions).then(
  //           (results) => {
  //             for (let i = 0, len = results.length; i < len; i++) {
  //               localArray.push(results[i].item);
  //             }
  //             this.searchResults = localArray;
  //           }
  //         );
  //       }
  //     } else {
  //       if (!this.activeTag && this.type === "Todas") {
  //         this.searchResults = this.recipes;
  //       } else if (!this.activeTag && this.type !== "Todas") {
  //         console.log("going here");
  //         console.log(this.searchResults);

  //         this.performSearchWithType();
  //       } else {
  //         this.snackbar = true;
  //         this.searchResults = this.recipes;
  //       }
  //     }
  //   },

  //   performSearchWithType() {
  //     console.log(this.activeTag);

  //     let localArray = [];
  //     if (this.searchResults.length > 1) {
  //       console.log(this.searchResults);

  //       console.log("here", this.activeTag);

  //       if (this.type !== "Todas") {
  //         this.searchResults.map((result) => {
  //           if (result.type === this.type) localArray.push(result);
  //         });
  //         this.searchResults = localArray;
  //       } else if (this.type === "Todas") {
  //         this.performSearchWithTag();
  //       }
  //     } else {
  //       if (this.type !== "Todas") {
  //         this.$search(this.type, this.recipes, this.typeOptions).then(
  //           (results) => {
  //             for (let i = 0, len = results.length; i < len; i++) {
  //               localArray.push(results[i].item);
  //             }
  //             this.searchResults = localArray;
  //           }
  //         );
  //       } else {
  //         if (!this.activeTag && this.type === "Todas") {
  //           this.searchResults = this.recipes;
  //         } else if (!this.activeTag && this.type !== "Todas") {
  //           this.performSearchWithTag();
  //         } else {
  //           console.log(this.searchResults.length);

  //           this.snackbar = true;
  //           this.searchResults = this.recipes;
  //         }
  //       }
  //     }
  //   },
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
.sideBar {
  min-height: 100%;
}
.snackBar {
  position: initial;
}
.v-snack__content {
  display: flex !important;
  flex-wrap: wrap !important;
}
</style>
