import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import RecipeView from "../views/RecipeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/recipes/recipeview",
    name: "RecipeView",
    component: RecipeView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
