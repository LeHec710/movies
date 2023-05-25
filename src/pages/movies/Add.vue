<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useField, useForm } from 'vee-validate';
const {handleSubmit} = useForm()

const router = useRouter();

const emit = defineEmits(["changeTitle"]);
onMounted(function () {
  getDirectors()
  emit("changeTitle", "Ajouter un film");
});

const API_URL = "http://127.0.0.1:3000";

const directors = ref()

// FORM
const isRequired = value => (value !== undefined && value !== "" ? true : 'Ce champ est requis');
const { value: title, errorMessage: titleError } = useField('title', isRequired);
const { value: description, errorMessage: descriptionError } = useField('description', isRequired);
const { value: genre, errorMessage: genreError } = useField('genre', isRequired);
const { value: langage, errorMessage: langageError } = useField('langage', isRequired);
const { value: year, errorMessage: yearError } = useField('year', isRequired);
const { value: director, errorMessage: directorError } = useField('director', true);
const { value: poster } = useField('poster', true);

const getDirectors = () => {
  axios
    .get(API_URL + "/directors/getAll").then(res => {
      directors.value = res.data 
    })
}

const add = handleSubmit(values => {
  axios
    .post(API_URL + "/movies/add", {
      title: values.title,
      description: values.description,
      genre: values.genre,
      langage: values.langage,
      year: values.year,
      director: values.director
    })
    .then((res) => {
      if (values.poster) {
        const form = new FormData();
        form.set("poster", values.poster);
        form.set("id", res.data[0]._id);
        return axios
          .post(API_URL + "/movies/poster", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            router.push({ name: "movies" });
          });
      } else {
        router.push({ name: "movies" });
      }
    });
})

const updatePoster = (event) => {
  poster.value = event.target.files[0];
};
</script>

<template>
  <v-form @submit="add" enctype="multipart/form-data">
    <v-row>
      <v-col>
        <h1>Ajouter un film</h1>
      </v-col>

      <!-- TITLE -->
      <v-col cols="12">
        <p>Titre*</p>
        <v-text-field hide-details="true" v-model="title" label="Titre" required></v-text-field>
        <span class="text-error">{{titleError}}</span>
      </v-col>

      <!-- REALISATEUR -->
      <v-col cols="12">
        <p>Réalisateur</p>
        <v-select
          label="Réalisateur"
          v-model="director"
          :items="directors"
          item-title="name"
          item-value="_id"
          hide-details="true"
        >
          <template v-slot:append-item>
            <v-list-item>
              <template v-slot:prepend>
                <router-link
                  style="color: inherit; text-decoration: none"
                  :to="{ name: 'directors_add' }"
                >
                  <v-btn color="indigo" block prepend-icon="mdi-plus">Ajouter</v-btn>
                </router-link>
                <router-link v-if="director"
                  class="ml-3"
                  style="color: inherit; text-decoration: none"
                  :to="{ name: 'directors_edit', params: {id: director} }"
                >
                  <v-btn color="indigo" block prepend-icon="mdi-pencil">Modifier</v-btn>
                </router-link>

                <a class="ml-3" style="color: inherit; text-decoration: none">
                  <v-btn v-if="director" @click="director = ''" color="indigo" block prepend-icon="mdi-delete">Supprimer</v-btn>
                </a>
              </template>
            </v-list-item>
          </template>
          <template v-slot:no-data>
            <v-list-item> Aucun réalisateurs </v-list-item>
          </template>
        </v-select>
        <p class="text-error">{{directorError}}</p>
      </v-col>

      <!-- DESCRIPTION -->
      <v-col cols="12">
        <p>Description*</p>
        <v-textarea hide-details="true" v-model="description" label="Description" required></v-textarea>
        <p class="text-error">{{descriptionError}}</p>
      </v-col>

      <!-- LANGAGE -->
      <v-col cols="12" md="6">
        <p>Langage*</p>
        <v-text-field hide-details="true" v-model="langage" label="Language"></v-text-field>
        <p class="text-error">{{langageError}}</p>
      </v-col>

      <!-- GENRE -->
      <v-col cols="12" md="6">
        <p>Genre*</p>
        <v-text-field hide-details="true" v-model="genre" label="Genre"></v-text-field>
        <p class="text-error">{{genreError}}</p>
      </v-col>

      <!-- Date -->
      <v-col cols="12" md="6">
        <p>Date de sortie*</p>
        <v-text-field hide-details="true" type="date" v-model="year" label="Date de sortie"></v-text-field>
        <p class="text-error">{{yearError}}</p>
      </v-col>

      <!-- Poster -->
      <v-col cols="12" md="6">
        <p>Poster</p>
        <v-file-input
          @change="updatePoster"
          accept="image/png, image/jpeg, image/jpg"
          label="Poster"
        ></v-file-input>
      </v-col>

      <!-- SUBMIT -->
      <v-col cols="6" md="6">
        <v-btn type="submit" block color="indigo">AJOUTER</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
