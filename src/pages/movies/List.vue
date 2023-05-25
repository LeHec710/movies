<script setup>
import { reactive, watch, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Film from "../../components/Film.vue";
import FilmPreview from "../../components/FilmPreview.vue";
import axios from "axios";

import moment from "moment";
import "moment/dist/locale/fr";
moment.locale("fr");
const router = useRouter();

const API_MOVIES_URL = "https://www.omdbapi.com/?apikey=a1920a0&t=";
const API_URL = "http://127.0.0.1:3000";
const API_KEY = "a1920a0";
const films = ref([]);
const filter = ref("genre");
const filters = [
  { slug: "genre", name: "Genre" },
  { slug: "year", name: "Année" },
  { slug: "director", name: "Réalisateur" },
];
const filtered_films = ref([]);

// INIT
const emit = defineEmits(["changeTitle"]);
onMounted(function () {
  get();
  emit("changeTitle", "Liste des films");
});

watch(
  () => [filter.value],
  () => {
    filterMovies();
  }
);
// GET FILMS
const get = () => {
  axios.get(API_URL + "/movies/getAll").then((res) => {
    console.log(res.data)
    films.value = res.data;

    films.value.map((film) => {
      // get director
      if (film.director) {
        axios.get(API_URL + "/directors/get/" + film.director).then(res => {
          film.director = res.data
        })
      }

      // set poster
      if (!film.poster) {
        axios.get(API_MOVIES_URL + film.title).then((res) => {
          film.api_poster = res.data.Poster;
        });
      }  
    });
    
    filterMovies();
  });
};

// FILTER FILMS
const filterMovies = () => {
  // filter by genre
  const filtered = {};
  if (filter.value === "genre") {
    films.value.map((film) => {
      if (film.genre in filtered) {
        filtered[film.genre].push(film);
      } else {
        filtered[film.genre] = [film];
      }
    });
  }

  // filter by year
  if (filter.value === "year") {
    films.value.map((film) => {
      if (moment(film.year).format("Y") in filtered) {
        filtered[moment(film.year).format("Y")].push(film);
      } else {
        filtered[moment(film.year).format("Y")] = [film];
      }
    });
  }

  // filter by artist
  if (filter.value === "director") {
    films.value.map((film) => {
      if(film.director && film.director._id) {
        if (film.director.name in filtered) {
          filtered[film.director.name].push(film);
        } else {
          filtered[film.director.name] = [film];
        }
      }
    });
  }

  filtered_films.value = filtered;
};

</script>

<template>
  <v-row>
    <v-col cols="12">
      <h1>Liste des films ({{ films.length }})</h1>
    </v-col>

    <v-col cols="12" md="6">
      <p>Filtrer</p>
      <v-select
        label="Filtrer par"
        v-model="filter"
        :items="filters"
        item-title="name"
        item-value="slug"
      >
      </v-select>
    </v-col>

    <template v-for="(filter_childrens, filter) in filtered_films" :key="filter">
      <v-col class="pb-0" cols="12">
        <h2>
          {{ filter !== "year" ? filter : moment(film.year, "Y") }} ({{
            filter_childrens.length
          }})
        </h2>
      </v-col>

      <v-col v-for="film in filter_childrens" :key="`${filter}${film}`" cols="4" md="3">
        <FilmPreview :film="film"  @updateFilms="get"/>
      </v-col>
    </template>
  </v-row>
</template>
