<template>
  <div class="home">
    <Navbar />
    <Landing />
  </div>
</template>

<script>
// @ is an alias to /src
import Landing from "@/components/Landing.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Home",
  components: {
    Landing,
    Navbar
  }
};
</script>
