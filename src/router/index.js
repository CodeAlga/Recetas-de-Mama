import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Recipes from "../views/Recipes.vue";
import RecipeView from "../views/RecipeView.vue";
import AddRecipe from "../views/AddRecipe.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: Recipes
  },
  {
    path: "/recipes/:recipe_slug",
    name: "RecipeView",
    component: RecipeView
  },
  {
    path: "/add",
    name: "AddRecipe",
    component: AddRecipe
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
