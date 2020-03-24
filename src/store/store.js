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

    orderStore: (context) => {
      context.commit("orderRecipes");
    }
  },
  modules: {}
});

//   _id: "1",
//   name: "Patatas Brabas",
//   servings: "4",
//   time: "2 horas",
//   dificulty: "facil",
//   description:
//     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia placeat accusantium dicta id maiores reiciendis tempora, nulla mollitia omnis facere veritatis velit odit officiis iure amet consectetur adipisicing elit. Quia placeat accusantium dicta id maiores reiciendis tempora, nulla mollitia omnis facere veritatisAt. Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
//   ingridients: [
//     {
//       ingridient: "patatas",
//       quantity: "4"
//     },
//     {
//       ingridient: "tomates triturados",
//       quantity: "1kg"
//     },
//     {
//       ingridient: "sal",
//       quantity: null
//     },
//     {
//       ingridient: "azucar",
//       quantity: "una cucharadita"
//     },
//     {
//       ingridient: "pimenton dulce",
//       quantity: "una cucharadita"
//     },
//     {
//       ingridient: "mucho mucho pimenton picante",
//       quantity: "una cucharadita"
//     }
//   ],
//   prep: [
//     {
//       title: "Step A",
//       step:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam beatae nihil quae, vero voluptatem officia voluptas quasi perspiciatis, nostrum corporis ea molestias at ipsum accusantium tempore. Nihil ratione commodi accusamus!"
//     },
//     {
//       title: "Step B",
//       step:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam beatae nihil quae, vero voluptatem officia voluptas quasi perspiciatis, nostrum corporis ea molestias at ipsum accusantium tempore. Nihil ratione commodi accusamus!"
//     },
//     {
//       title: "Step C",
//       step:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam beatae nihil quae, vero voluptatem officia voluptas quasi perspiciatis, nostrum corporis ea molestias at ipsum accusantium tempore. Nihil ratione commodi accusamus!"
//     },
//     {
//       title: "Step D",
//       step:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam beatae nihil quae, vero voluptatem officia voluptas quasi perspiciatis, nostrum corporis ea molestias at ipsum accusantium tempore. Nihil ratione commodi accusamus!"
//     },
//     {
//       title: "Step F",
//       step:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam beatae nihil quae, vero voluptatem officia voluptas quasi perspiciatis, nostrum corporis ea molestias at ipsum accusantium tempore. Nihil ratione commodi accusamus!"
//     }
//   ],
//   tags: [
//     "#tag",
//     "#tag",
//     "#tag",
//     "#tag",
//     "#tag",
//     "#tag",
//     "#tag",
//     "#tag",
//     "#tag",
//     "#tag"
//   ]
