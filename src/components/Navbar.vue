<template>
  <v-app-bar
    fixed
    color="teal lighten-3"
    dark
    height="65px"
    width="100vw"
    class="d-flex flex-column justify-space-around"
  >
    <v-toolbar-title>Title</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-text-field
      dense
      clearable
      label="Search"
      append-outer-icon="mdi-magnify"
      class="align-self-end searchBox"
    ></v-text-field>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
.searchBox {
  max-width: 40vw;
}
</style>
