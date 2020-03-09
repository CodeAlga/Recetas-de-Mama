<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-flex class="recipeTitle">
        <h2
          class="display-3 font-weight-black ma-5 pa-12 blue-grey--text text--lighten-5"
        >
          {{ recipe.name }}
        </h2>
      </v-flex>
    </v-row>
    <v-row wrap>
      <v-flex xs12 sm4>
        <v-sheet
          class="pa-8 yellow lighten-4 shaped sideBar d-flex flex-column"
        >
          <div class="my-2">
            <v-btn color="warning" block dark>Go Back</v-btn>
          </div>
          <p class="pt-8">
            {{ recipe.description }}
          </p>
          <v-divider class="my-5 ingridientDivider"></v-divider>
          <h5 class="display-1  text-center">Detalles</h5>
          <v-divider class="my-5 ingridientDivider"></v-divider>
          <div>
            <v-list-item>
              <v-list-item-content class="d-flex flex-column">
                <v-list-item-title class="font-weight-medium align-start"
                  >Servings</v-list-item-title
                >
                <v-list-item-subtitle class="font-weight-light pl-1 ">
                  {{ recipe.servings }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="d-flex flex-column">
                <v-list-item-title class="font-weight-medium"
                  >Dificultad</v-list-item-title
                >
                <v-list-item-subtitle class="font-weight-light pl-1">
                  {{ recipe.dificulty }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="d-flex flex-column">
                <v-list-item-title class="font-weight-medium ingridientTitle"
                  >Tiempo de preparación</v-list-item-title
                >
                <v-list-item-subtitle class="font-weight-light pl-1">
                  {{ recipe.time }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="d-flex flex-column">
                <v-list-item-title class="font-weight-medium ingridientTitle"
                  >Hashtags</v-list-item-title
                >
                <v-list-item-subtitle
                  class="font-weight-light pl-1 d-flex flex-row flex-wrap"
                  v-for="(tag, i) in recipe.tags"
                  v-bind:key="i"
                >
                  {{ tag }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-sheet>
      </v-flex>
      <v-divider class="mx-4 ingridientDivider" inset vertical></v-divider>
      <v-flex xs12 sm7>
        <div>
          <h3 class="display-2 mt-3 pa-3">Ingredientes</h3>
        </div>
        <v-card class="v-card--raised mt-2 ingridientsCard">
          <v-flex class="d-flex flex-row flex-wrap">
            <v-list-item
              v-for="(ingridient, i) in recipe.ingridients"
              :key="i"
              class="ingridient"
            >
              <v-list-item-avatar class="ma-1">
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-list-item-avatar>
              <v-list-item-content class="d-flex flex-colum">
                <v-list-item-title class="font-weight-medium ingridientTitle">{{
                  ingridient.ingridient
                }}</v-list-item-title>
                <v-list-item-subtitle
                  class="font-weight-light pl-3 ingridientSubtitle"
                >
                  {{ ingridient.quantity }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-flex>
        </v-card>
        <v-divider class="mt-10 mb-5 ml-10 ingridientDivider" inset></v-divider>
        <div>
          <h3 class="display-2 pa-3">Preparación</h3>
        </div>
        <v-flex class="mb-5">
          <v-card
            class="v-card--outlined mt-2"
            v-for="(step, i) in recipe.prep"
            :key="i"
          >
            <v-card-text>
              <p class="overline font-weight-bold">
                {{ i + 1 }}. {{ step.title }}
              </p>
              <p class="pl-1">
                {{ step.step }}
              </p>
            </v-card-text>
          </v-card>
          <v-btn
            class="float-right ma-4"
            dark
            fav
            bottom
            right
            color="warning"
            @click="backToTop"
          >
            <v-icon aria-hidden="true">mdi-chevron-up-circle-outline</v-icon>
          </v-btn>
        </v-flex>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Recipe",
  data() {
    return {
      recipe: {
        name: "Patatas Brabas",
        servings: "4",
        time: "2 horas",
        dificulty: "facil",
        description:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia placeat accusantium dicta id maiores reiciendis tempora, nulla mollitia omnis facere veritatis velit odit officiis iure amet consectetur adipisicing elit. Quia placeat accusantium dicta id maiores reiciendis tempora, nulla mollitia omnis facere veritatisAt. Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        ingridients: [
          {
            ingridient: "patatas",
            quantity: "4"
          },
          {
            ingridient: "tomates triturados",
            quantity: "1kg"
          },
          {
            ingridient: "sal",
            quantity: null
          },
          {
            ingridient: "azucar",
            quantity: "una cucharadita"
          },
          {
            ingridient: "pimenton dulce",
            quantity: "una cucharadita"
          },
          {
            ingridient: "mucho mucho pimenton picante",
            quantity: "una cucharadita"
          }
        ],
        prep: [
          {
            title: "Step A",
            step:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam beatae nihil quae, vero voluptatem officia voluptas quasi perspiciatis, nostrum corporis ea molestias at ipsum accusantium tempore. Nihil ratione commodi accusamus!"
          },
          {
            title: "Step B",
            step:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam beatae nihil quae, vero voluptatem officia voluptas quasi perspiciatis, nostrum corporis ea molestias at ipsum accusantium tempore. Nihil ratione commodi accusamus!"
          },
          {
            title: "Step C",
            step:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam beatae nihil quae, vero voluptatem officia voluptas quasi perspiciatis, nostrum corporis ea molestias at ipsum accusantium tempore. Nihil ratione commodi accusamus!"
          },
          {
            title: "Step D",
            step:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam beatae nihil quae, vero voluptatem officia voluptas quasi perspiciatis, nostrum corporis ea molestias at ipsum accusantium tempore. Nihil ratione commodi accusamus!"
          },
          {
            title: "Step F",
            step:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam beatae nihil quae, vero voluptatem officia voluptas quasi perspiciatis, nostrum corporis ea molestias at ipsum accusantium tempore. Nihil ratione commodi accusamus!"
          }
        ],
        tags: [
          "#tag",
          "#tag",
          "#tag",
          "#tag",
          "#tag",
          "#tag",
          "#tag",
          "#tag",
          "#tag",
          "#tag"
        ]
      }
    };
  },
  methods: {
    backToTop: function() {
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style scoped>
.recipeTitle {
  background-image: url(https://source.unsplash.com/900x300/?food-kitchen-cooking);
  background-position: center;
}
.recipeTitle > h2 {
  text-shadow: 0.2rem 0.2rem 0.25rem rgba(44, 44, 44, 0.5);
}
.ingridientDivider {
  border-color: #fcab28;
}
.ingridientsCard {
  background-color: #fdfcf2 !important;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f44336' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: repeat;
}
.ingridient {
  max-width: 50%;
}
.sideBar {
  height: 100%;
}
.ingridientTitle {
  white-space: normal;
}
.ingridientSubtitle {
  white-space: normal;
}
</style>
