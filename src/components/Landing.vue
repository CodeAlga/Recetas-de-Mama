<template>
  <v-content>
    <section id="hero">
      <v-row no-gutters>
        <v-img
          min-height="100vh"
          src="https://source.unsplash.com/1000x1000/?food"
        >
          <v-theme-provider dark>
            <v-container fill-height>
              <v-row
                align="center"
                class="white--text mx-auto"
                justify="center"
              >
                <v-col class="white--text text-center" cols="12" tag="h1">
                  <span class="font-weight-light display-2">
                    Las Recetas de
                  </span>

                  <br />

                  <span class="font-weight-black display-4">
                    Mi Mama
                  </span>
                </v-col>

                <v-btn
                  class="align-self-end"
                  fab
                  outlined
                  @click="$vuetify.goTo('#about-mama')"
                >
                  <v-icon>mdi-chevron-double-down</v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-theme-provider>
        </v-img>
      </v-row>
    </section>

    <section id="about-mama">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">SOBRE MI MADRE</h2>

        <v-responsive class="mx-auto mb-8" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-responsive
          class="mx-auto title font-weight-light mb-8"
          max-width="720"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
          possimus odio est illum maxime ea eveniet, placeat corrupti? Sapiente
          minus non vitae repellendus numquam nihil alias quia, quis a libero!
        </v-responsive>

        <!--  <v-avatar class="elevation-12 mb-12" size="128">
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-avatar> -->

        <div></div>

        <v-btn color="grey" outlined large>
          <router-link to="/recipies">
            <span class="grey--text text--darken-1 font-weight-bold">
              Start
            </span>
          </router-link>
        </v-btn>
      </v-container>

      <div class="py-12"></div>
    </section>
  </v-content>
</template>

<script>
export default {
  name: "Landing"
};
</script>
