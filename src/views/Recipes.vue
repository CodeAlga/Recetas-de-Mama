<template>
  <div>
    <Navbar />
    <RecipesList />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import RecipesList from "@/components/RecipesList.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "RecipeView",
  components: {
    Navbar,
    RecipesList,
    Footer
  },

  created() {
    this.$store.dispatch("clearStore");
    this.$store.dispatch("getRecipes");
  }
};
</script>
