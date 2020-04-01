import Vue from "vue";
import Vuex from "vuex";
import db from "@/firebase/init";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    //recipe: {},
    recipes: []
  },
  getters: {
    allRecipes: (state) => {
      return state.recipes;
    }
  },
  mutations: {
    setRecipes: (state, payload) => {
      state.recipes.push(payload);
      state.recipes.sort((a, b) => {
        return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
      });
    },
    clearRecipes: (state) => {
      state.recipes = [];
    }
  },
  actions: {
    getRecipes: ({ commit }) => {
      db.collection("recipes")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let recipe = doc.data();
            recipe.id = doc.id;
            commit("setRecipes", recipe);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    clearStore: (context) => {
      context.commit("clearRecipes");
    },

    deepSearch: (query) => {
      console.log("searching", query);
    }
  },
  modules: {}
});
