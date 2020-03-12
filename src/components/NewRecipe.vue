<template>
  <v-flex>
    <v-form
      ref="form"
      @submit.prevent="submit"
      v-model="valid"
      lazy-validation
      class="ma-9"
    >
      <v-text-field
        v-model="name"
        :rules="emptyRules"
        label="Nombre de la receta"
        required
      ></v-text-field>
      <v-row>
        <v-col
          ><v-select
            v-model="servings"
            :items="servingItems"
            :rules="[(v) => !!v || 'Faltan las racions']"
            label="Raciones"
            required
          ></v-select
        ></v-col>
        <v-col
          ><v-text-field
            v-model="time"
            :rules="emptyRules"
            label="Tiempo"
            required
          ></v-text-field
        ></v-col>
        <v-col
          ><v-select
            v-model="dificulty"
            :items="dificultyItems"
            :rules="[(v) => !!v || 'Falta la dificultad']"
            label="Dificultad"
            required
          ></v-select
        ></v-col>
      </v-row>
      <v-textarea
        v-model="description"
        :counter="100"
        :rules="descriptionRules"
        label="Descripción"
        auto-grow
        rows="1"
      ></v-textarea>
      <h3 class="headline">Ingredientes</h3>
      <v-row v-for="(ingridient, i) in ingridients" :key="i">
        <v-col class="ml-4 pa-0">
          <p>{{ ingridient.ingridient }}</p>
        </v-col>
        <v-col class="pa-0">
          <p>{{ ingridient.quantity }}</p>
        </v-col>
        <v-col class="pa-0"
          ><v-btn color="error" fab x-small dark @click="removeIngridient(i)">
            <v-icon>mdi-delete</v-icon>
          </v-btn></v-col
        >
      </v-row>
      <v-row>
        <v-col>
          <h4 class="subtitle">Ingrediente</h4>
          <v-text-field
            single-line
            ref="ingridient"
            :rules="[!ingridientError || 'Necesita algunos ingredientes']"
            v-model="ingridient"
            label="Ingrediente"
          ></v-text-field>
        </v-col>
        <v-col
          ><h4 class="subtitle">Cantidad</h4>
          <v-text-field
            single-line
            ref="quantity"
            v-model="quantity"
            label="Cantidad"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-btn color="success" class="mt-8" @click="addIngridient">
            Añadir ingrediente
          </v-btn>
        </v-col>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius maxime
        corporis libero velit odio eligendi illo vero hic amet culpa.
      </v-row>
      <h3 class="headline">Preparación</h3>
      <v-row v-for="(step, i) in steps" :key="10 + i">
        <v-col sm="3" class="ml-4 pa-0">
          <p>{{ step.title }}</p>
        </v-col>
        <v-col sm="8" class="pa-0">
          <p>{{ step.step }}</p>
        </v-col>
        <v-col class=" pa-0"
          ><v-btn color="error" fab x-small dark @click="removeStep(10 + 'i')">
            <v-icon>mdi-delete</v-icon>
          </v-btn></v-col
        >
      </v-row>
      <v-row>
        <v-col sm="12">
          <h4 class="subtitle">Título</h4>
          <v-text-field
            single-line
            ref="title"
            v-model="title"
            label="Título"
          ></v-text-field>
        </v-col>

        <v-col sm="12"
          ><h4 class="subtitle">Descripción</h4>
          <v-textarea
            single-line
            ref="step"
            :rules="[!stepError || 'Necesita algunos pasos']"
            v-model="step"
            label="Paso"
            auto-grow
            rows="1"
          ></v-textarea
        ></v-col>
        <v-col>
          <v-btn color="success" @click="addStep">
            Añadir paso
          </v-btn></v-col
        >
      </v-row>
      <v-row class="pa-3">
        <v-combobox
          v-model="tags"
          :items="common"
          :search-input.sync="search"
          :rules="tagRules"
          hide-selected
          label="Añade algunas etiquetas"
          multiple
          small-chips
          hint="Mínimo 5 etiquetas"
          persistent-hint
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  No hay resultados parecidos a "<strong>{{ search }}</strong
                  >".
                </v-list-item-title>
                <v-list-item-subtitle
                  >Presiona <kbd>enter</kbd> o <kbd>tab</kbd> para crear uno
                  nuevo</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
      </v-row>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validar Formulario
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        Limpiar Formulario
      </v-btn>

      <v-btn color="warning" @click="resetValidation">
        Eliminar Errores
      </v-btn>
    </v-form>
  </v-flex>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "NewRecipe",
  data: () => ({
    valid: true,
    ingridientError: true,
    stepError: true,

    name: "",
    slug: "",

    time: "",

    servings: null,

    dificulty: null,

    description: "",

    ingridient: "",
    quantity: "",
    ingridients: [],

    title: "",
    step: "",
    steps: [],

    tags: [],
    common: [
      "pollo",
      "ternera",
      "caldo",
      "salsa de tomate",
      "asado",
      "paella",
      "crema",
      "aperitivo",
      "postre"
    ],
    search: null,

    servingItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    dificultyItems: ["Novato", "Facil", "Normal", "Dificil", "Experto"],

    emptyRules: [(v) => !!v || "Falta por rellenar"],
    descriptionRules: [
      (description) => !!description || "Falta la descripción",
      (description) =>
        (description && description.length >= 100) ||
        "La descripción tiene que ser un poquito más larga"
    ],

    tagRules: [(tags) => tags.length >= 5 || "Necesita algunas etiqueta"]

    // email: "",
    // emailRules: [
    //   (v) => !!v || "E-mail is required",
    //   (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"
    // ],
  }),

  methods: {
    addIngridient() {
      this.ingridients.push({
        ingridient:
          this.ingridient.slice(0, 1).toUpperCase() + this.ingridient.slice(1),
        quantity:
          this.quantity.slice(0, 1).toUpperCase() + this.quantity.slice(1)
      });

      this.$refs.ingridient.reset();
      this.$refs.quantity.reset();

      if (this.ingridientError) this.ingridientError = false;
    },
    removeIngridient(i) {
      this.ingridients.splice(i, 1);
    },

    addStep() {
      this.steps.push({
        title: this.title.slice(0, 1).toUpperCase() + this.title.slice(1),
        step: this.step.slice(0, 1).toUpperCase() + this.step.slice(1)
      });

      this.$refs.title.reset();
      this.$refs.step.reset();

      if (this.stepError) this.stepError = false;
    },
    removeStep(i) {
      this.steps.splice(i, 1);
    },

    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.slug = slugify(this.name, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        this.tags = this.tags.map((tag) => {
          return "#" + tag;
        });

        db.collection("recipes")
          .add({
            name: this.name.slice(0, 1).toUpperCase() + this.name.slice(1),
            slug: this.slug,
            time: this.time,
            servings: this.servings,
            dificulty: this.dificulty,
            description:
              this.description.slice(0, 1).toUpperCase() +
              this.description.slice(1),
            ingridients: this.ingridients,
            steps: this.steps,
            tags: this.tags
          })
          .then.$router.push({ name: "Home" });
      }
    },
    reset() {
      this.$refs.form.reset();
      this.ingridients = [];
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
