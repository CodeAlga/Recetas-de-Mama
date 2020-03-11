<template>
  <v-flex>
    <v-form ref="form" v-model="valid" lazy-validation class="ma-9">
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
        <v-col>
          <p>{{ ingridient.ingridient }}</p>
        </v-col>
        <v-col>
          <p>{{ ingridient.quantity }}</p>
        </v-col>
        <v-col
          ><v-btn color="error" fab x-small dark @click="removeIngridient">
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
            :rules="ingridientRules"
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
      </v-row>
      <h3 class="headline">Preparación</h3>
      <v-row v-for="(step, i) in steps" :key="i">
        <v-row>
          <v-col>
            <p>{{ step.title }}</p>
          </v-col>
        </v-row>
        <v-col sm="9">
          <p>{{ step.step }}</p>
        </v-col>
        <v-col
          ><v-btn color="error" fab x-small dark @click="removeStep">
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
            :rules="prepRules"
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
                  No hay resultados parecidos "<strong>{{ search }}</strong
                  >". Presiona <kbd>enter</kbd> para crear uno nuevo
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
      </v-row>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        Reset Form
      </v-btn>

      <v-btn color="warning" @click="resetValidation">
        Reset Validation
      </v-btn>
    </v-form>
  </v-flex>
</template>

<script>
export default {
  name: "NewRecipe",
  data: () => ({
    valid: true,

    name: "",

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
    tags: [],
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

    ingridientRules: [
      (ingridients) => ingridients.length !== 0 || "Necesita algun ingrediente"
    ],

    prepRules: [(steps) => steps.length !== 0 || "Necesita algun paso"],

    tagRules: [(tags) => tags.length >= 5 || "Necesita algunas etiqueta"]

    // email: "",
    // emailRules: [
    //   (v) => !!v || "E-mail is required",
    //   (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"
    // ],

    //checkbox: false
  }),

  methods: {
    addIngridient() {
      this.ingridients.push({
        ingridient: this.ingridient,
        quantity: this.quantity
      });
      this.$refs.ingridient.reset();
      this.$refs.quantity.reset();
    },
    removeIngridient() {},

    addStep() {
      this.steps.push({
        title: this.title,
        step: this.step
      });
      this.$refs.title.reset();
      this.$refs.step.reset();
    },
    removeStep() {},

    validate() {
      this.$refs.form.validate();
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
