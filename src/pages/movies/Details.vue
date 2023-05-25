<script setup>
import Film from "../../components/Film.vue";
import FilmPreview from "../../components/FilmPreview.vue";

import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const API_MOVIES_URL = "https://www.omdbapi.com/?apikey=a1920a0&t=";
const API_URL = "http://127.0.0.1:3000";
const route = useRoute();

const film = ref(null);
const films_director = ref(null);
const films_genre = ref(null);
const emit = defineEmits(["changeTitle"]);

onMounted(() => {
  get();
});

const get = function () {
  axios.get(API_URL + "/movies/get/" + route.params.id).then((res) => {
    film.value = res.data;
    // get director
    if (film.value.director) {
      axios.get(API_URL + "/directors/get/" + film.value.director).then((res) => {
        film.value.director = res.data;

        // get director's films
        axios
          .post(API_URL + "/movies/get", { director: film.value.director._id })
          .then((res) => {
            films_director.value = res.data.filter(_film => {return _film.title !== film.value.title});
            films_director.value.map((_film) => {
              if (!_film.poster) {
                axios.get(API_MOVIES_URL + _film.title).then((res) => {
                  _film.api_poster = res.data.Poster;
                });
              }
            });
          });

        // get same genre films
        axios
          .post(API_URL + "/movies/get", { genre: film.value.genre })
          .then((res) => {
            films_genre.value = res.data.filter(_film => {return _film.title !== film.value.title});
            films_genre.value.map((_film) => {
              if (!_film.poster) {
                axios.get(API_MOVIES_URL + _film.title).then((res) => {
                  _film.api_poster = res.data.Poster;
                });
              }
            });
          })
      });
    }

    // get poster
    if (!film.value.poster) {
      axios.get(API_MOVIES_URL + film.value.title).then((res) => {
        film.value.api_poster = res.data.Poster;
      });
    }
    emit("changeTitle", "Détails de " + res.data.title);
  });
};
</script>

<template>
  <v-row v-if="film">
    <v-col cols="12">
      <h1 class="mb-2">Détails de {{ film.title }}</h1>
      <Film :film="film" />
    </v-col>

    <v-col v-if="films_director && films_director.length" cols="12">
      <h1>Du même réalisateur</h1>
    </v-col>
    <v-col v-if="films_director" v-for="film in films_director" :key="film" cols="4" md="3">
      <FilmPreview :film="film" />
    </v-col>

    <v-col v-if="films_genre &&films_genre.length" cols="12">
      <h1>Du même genre</h1>
    </v-col>
    <v-col v-if="films_genre" v-for="film in films_genre" :key="film" cols="4" md="3">
      <FilmPreview :film="film" />
    </v-col>
  </v-row>
</template>
