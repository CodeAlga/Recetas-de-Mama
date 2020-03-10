<template>
  <v-content>
    <Navbar />
    <h1>List of Recipies</h1>
    <v-btn color="grey" outlined large>
      <router-link to="/recipes/recipeview">
        <span class="grey--text text--darken-1 font-weight-bold">
          Start
        </span>
      </router-link>
    </v-btn>
  </v-content>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Recipes",
  components: { Navbar }
};
</script>
